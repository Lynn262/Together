<template>
	<el-container>
		<el-aside :width="store.state.asideWidth + 'px'">
			<el-menu active-text-color="#fff" :collapse="isCollapse" :collapse-transition="false" default-active="homepage" text-color="#fff" router>
				<div class="logo"><img src="../../assets/vue.svg" /></div>
				<el-menu-item v-for="item in menu" :index="item.index" v-bind:key="item.index">
					<img :src="item.src" alt="" />
					<span>{{ item.text }}</span>
				</el-menu-item>

				<div class="showdown" @click="collapse">
					<img src="../../assets/iconfont/shouqicaidan_menu-fold.svg" alt="" height="100%" width="100%" />
					<span v-show="!isCollapse">收起菜单</span>
				</div>
			</el-menu>
		</el-aside>
		<el-container>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, onMounted } from "vue";
import { useStore } from "@/store/index";

const store = useStore();
const state = reactive({
	active: 0,
	menu: [
		{
			index: "dashboard",
			src: "/src/assets/iconfont/home.svg",
			text: "首页",
		},
		{
			index: "plan",
			src: "/src/assets/iconfont/jihua_plan.svg",
			text: "任务清单",
		},
		{
			index: "code",
			src: "/src/assets/iconfont/daima_code.svg",
			text: "代码运行",
		},
		{
			index: "chat",
			src: "/src/assets/iconfont/chat.svg",
			text: "小组聊天",
		},
	],
});

let isCollapse = ref(true);
let { active, menu } = toRefs(state);
const collapse = () => {
	isCollapse.value = !isCollapse.value;
	store.commit("COLLAPSE", isCollapse.value);
};

//想办法优化！！！！
onMounted(() => {
	if (document.body.clientWidth) {
		isCollapse.value = true;
	}
	window.onresize = () => {
		if (document.body.clientWidth) {
			isCollapse.value = true;
		}
	};
});
</script>
<style lang="less" scoped>
@aside-width: 60px;
@el-menu-padding: 20px;
@img-size: @aside-width - @el-menu-padding * 2;

@media (min-width: 767px) {
	.is-active {
		background-color: #36393c;
	}

	.el-container {
		height: 100%;

		//自己设置侧边栏的动画
		.el-aside {
			transition: width 0.15s;
			-webkit-transition: width 0.15s;
			-moz-transition: width 0.15s;
			-webkit-transition: width 0.15s;
			-o-transition: width 0.15s;

			.el-menu {
				width: 100%;
				background-color: #545c64;
				height: 100%;
				overflow: hidden;

				.logo {
					display: flex;
					justify-content: center;
					height: 40px;
					margin-bottom: 20px;
					margin-top: 10px;
				}

				.el-menu-item {
					height: @aside-width;

					img {
						height: @img-size;
						width: @img-size;
						margin-right: 0px;
					}

					span {
						font-size: 16px;
					}
				}

				//改一下颜色 之前连字都看不见
				.el-menu-item:hover,
				.el-menu-item:active {
					background-color: rgba(255, 255, 255, 0.3);
				}

				.showdown {
					padding: 20px;
					color: white;
					display: flex;
					align-items: center;
					position: absolute;
					bottom: 30px;
					white-space: nowrap;

					img {
						height: @img-size;
						width: @img-size;
						// margin-right: 0px;
					}

					span {
						flex: 1;
					}
				}
			}
		}
	}
}

@media (max-width: 766px) {
	.el-container {
		height: 100%;

		//自己设置侧边栏的动画
		.el-aside {
			widows: @aside-width !important;

			.el-menu {
				width: 100%;
				background-color: #545c64;
				height: 100%;
				overflow: hidden;

				.logo {
					display: flex;
					justify-content: center;
					height: 40px;
					margin-bottom: 20px;
					margin-top: 10px;
				}

				.el-menu-item {
					height: @aside-width;

					img {
						height: @img-size;
						width: @img-size;
					}

					span {
						display: none;
					}
				}

				.el-menu-item:hover,
				.el-menu-item:focus {
					background-color: transparent;
				}

				.showdown {
					display: none;
				}
			}
		}
	}
}

.el-main {
	padding: 0;
}
</style>
