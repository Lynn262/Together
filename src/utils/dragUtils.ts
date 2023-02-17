import { useEventListener } from "@vueuse/core";
import { ref, Ref } from "vue";
import { throttle } from "./throttle";

type cardPositionType = "fixed" | "static";

//鼠标相对于整个窗口的偏移
export interface MousePositionTransform {
	x: number;
	y: number;
	press: boolean;
}
//卡片本身的偏移
export interface CardPositionTransform {
	x: number;
	y: number;
}

interface CardInitPosition {
	x: number;
	y: number;
}

export interface DragCardStyleInterface {
	margin: number;
	left: String;
	top: String;
	height: String;
	width: String;
}

const cardInitPosition: CardInitPosition = {
	x: 0,
	y: 0,
};

export const initDragUtil = (e: MouseEvent, dragCardStyleRef: Ref<DragCardStyleInterface>, mousePositionTransform: Ref<MousePositionTransform>, cardPositionTransform: Ref<CardPositionTransform>, isDrag: Ref<boolean>) => {
	e.preventDefault();
	dragCardStyleRef.value.left = `${(e.currentTarget as Element).getBoundingClientRect().left - dragCardStyleRef.value.margin}px`;
	dragCardStyleRef.value.top = `${(e.currentTarget as Element).getBoundingClientRect().top - dragCardStyleRef.value.margin}px`;
	dragCardStyleRef.value.height = `${(e.currentTarget as Element).getBoundingClientRect().height}px`;
	dragCardStyleRef.value.width = `${(e.currentTarget as Element).getBoundingClientRect().width}px`;
	cardInitPosition.x = (e.currentTarget as Element).getBoundingClientRect().left - dragCardStyleRef.value.margin;
	cardInitPosition.y = (e.currentTarget as Element).getBoundingClientRect().top - dragCardStyleRef.value.margin;
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
					dragMoveUtil(ev, dragCardStyleRef, mousePositionTransform, cardPositionTransform);
				},
				true
			);
		},
		30,
		false
	);

	useEventListener(
		window,
		"mouseup",
		(ev) => {
			destroyDragUtil(ev, dragCardStyleRef, isDrag, mousePositionTransform, cardPositionTransform);
		},
		true
	);
	//要实现拖动，首先要求子节点变为position：fixed
};

const destroyDragUtil = (e: MouseEvent, dragCardStyleRef: Ref<DragCardStyleInterface>, isDrag: Ref<boolean>, mousePositionTransform: Ref<MousePositionTransform>, cardPositionTransform: Ref<CardPositionTransform>) => {
	mousePositionTransform.value = {
		x: 0,
		y: 0,
		press: false,
	};
	cardPositionTransform.value = {
		x: 0,
		y: 0,
	};
	dragCardStyleRef.value.left = "0px";
	dragCardStyleRef.value.top = "0px";
	isDrag.value = false;
};

const dragMoveUtil = (e: MouseEvent, dragCardStyleRef: Ref<DragCardStyleInterface>, mousePositionTransform: Ref<MousePositionTransform>, cardPositionTransform: Ref<CardPositionTransform>) => {
	if (mousePositionTransform.value.press) {
		cardPositionTransform.value.x = e.clientX - mousePositionTransform.value.x;
		cardPositionTransform.value.y = e.clientY - mousePositionTransform.value.y;
		dragCardStyleRef.value.left = `${cardInitPosition.x + cardPositionTransform.value.x}px`;
		dragCardStyleRef.value.top = `${cardInitPosition.y + cardPositionTransform.value.y}px`;
	}
};
