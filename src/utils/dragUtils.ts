import { useEventListener } from "@vueuse/core";
import { ref, Ref } from "vue";
import { throttle } from "./throttle";

type cardPositionType = "absolute" | "relative";

interface MousePositionTransform {
	x: number;
	y: number;
	press: boolean;
}

interface CardPositionTransform {
	x: number;
	y: number;
}

export interface DragCardStyleInterface {
	position: cardPositionType;
	left: String;
	top: String;
}

//鼠标相对于整个窗口的偏移
const mousePositionTransform: Ref<MousePositionTransform> = ref({
	x: 0,
	y: 0,
	press: false,
});
//卡片本身的偏移
const cardPositionTransform: Ref<CardPositionTransform> = ref({
	x: 0,
	y: 0,
});

export const initDragUtil = (e: MouseEvent, dragCardStyleRef: Ref<DragCardStyleInterface>) => {
	e.preventDefault();
	dragCardStyleRef.value.position = "absolute";
	mousePositionTransform.value.x = e.clientX;
	mousePositionTransform.value.y = e.clientY;
	//鼠标已经被按下
	mousePositionTransform.value.press = true;
	throttle(
		() => {
			useEventListener(
				window,
				"mousemove",
				(ev) => {
					dragMoveUtil(ev, dragCardStyleRef);
				},
				true
			);
		},
		50,
		false
	);

	useEventListener(
		window,
		"mouseup",
		(ev) => {
			destroyDragUtil(ev, dragCardStyleRef);
		},
		true
	);
	//要实现拖动，首先要求子节点变为position：absolute
};

const destroyDragUtil = (e: MouseEvent, dragCardStyleRef: Ref<DragCardStyleInterface>) => {
	mousePositionTransform.value = {
		x: 0,
		y: 0,
		press: false,
	};
	dragCardStyleRef.value.position = "relative";
	dragCardStyleRef.value.left = "0px";
	dragCardStyleRef.value.top = "0px";
};

const dragMoveUtil = (e: MouseEvent, dragCardStyleRef: Ref<DragCardStyleInterface>) => {
	if (mousePositionTransform.value.press) {
		cardPositionTransform.value.x = e.clientX - mousePositionTransform.value.x;
		cardPositionTransform.value.y = e.clientY - mousePositionTransform.value.y;
		dragCardStyleRef.value.left = `${cardPositionTransform.value.x}px`;
		dragCardStyleRef.value.top = `${cardPositionTransform.value.y}px`;
		console.log(cardPositionTransform.value.y);
	}
};
