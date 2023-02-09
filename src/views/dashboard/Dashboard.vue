<!--  -->
<template>
	<div class="common-layout">
		<el-container>
			<el-header>
				<Header :nav-img="imgsrc" :nav-name="title"></Header>
			</el-header>
			<el-container>
				<el-header height="40px">
					<DashboardController>
						<el-button type="primary" size="default">
							<el-icon>
								<EditPen></EditPen>
							</el-icon>
							{{ editableHeaderButtonText }}
						</el-button>
						<el-button type="info" size="default">
							<el-icon>
								<Refresh></Refresh>
							</el-icon>
							刷新界面
						</el-button>
					</DashboardController>
				</el-header>
				<el-container :style="{ height: `${dashboardSize.heightComputed}px` }" :direction="dashboardLayout === 'desktop' ? `horizontal` : `vertical`">
					<!-- 仪表盘的主体：用min-width 大于1100时可以计算，小于768可以计算，在中间的情况不计算 -->
					<el-scrollbar :max-height="`1100px`">
						<el-container
							class="dashboard-wrap"
							:style="{
								height: `${dashboardSize.heightComputed}px`,
							}"
							:direction="dashboardLayout === 'desktop' ? `horizontal` : `vertical`">
							<div
								:style="{
									width: dashboardSize.widthComputed * (dashboardLayout === 'desktop' ? 0.6 : 1) + 'px',
								}">
								<DashboardCard :plus-text="`新建任务`">
									<template #title>{{ `我的任务` }}</template>
									<template #body>
										<!-- 还未完成的任务 -->
										<div>
											<task-card :is-controller="true" :task-list-id="`notFinish`" :is-collapse="collapseInTaskCard.notFinishCollapse">
												<p>未完成</p>
											</task-card>
										</div>
										<div>
											<!-- 已经过期的任务 -->
											<task-card :is-controller="true" :task-list-id="`over`" :is-collapse="collapseInTaskCard.overCollapse">
												<p>已过期</p>
											</task-card>
										</div>
									</template>
								</DashboardCard>
							</div>
							<el-scrollbar
								:style="{
									width: dashboardSize.widthComputed * (dashboardLayout === 'desktop' ? 0.4 : 1) + 'px',
								}"
								:view-class="`left-scrollbar`">
								<DashboardCard :plus-text="`新建任务`">
									<template #title>{{ `我的日程` }}</template>
									<template #body><el-scrollbar></el-scrollbar></template>
								</DashboardCard>
								<DashboardCard :plus-text="`新建任务`">
									<template #title>{{ `我的目标` }}</template>
								</DashboardCard>
								<DashboardCard :plus-text="`新建任务`">
									<template #title>{{ `我的任务` }}</template>
								</DashboardCard>
							</el-scrollbar>
						</el-container>
					</el-scrollbar>
				</el-container>
			</el-container>
		</el-container>
	</div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, computed, defineProps, ComputedRef, Ref } from "vue";
import Header from "@/components/Header.vue";
import DashboardController from "@/views/dashboard/components/DashboardController.vue";
import "@/assets/less/main.less";
import { useWindowSize } from "@vueuse/core";
import { Refresh, EditPen } from "@element-plus/icons-vue";
import DashboardCard from "@/views/dashboard/components/DashboardCard.vue";
import { useStore } from "@/store/index";
import TaskCard from "./components/task/TaskCardTitle.vue";

interface windowSizeInterface {
	heightComputed: number;
	widthComputed: number;
}
//获取vuex仓库对象
const store = useStore();

const state = reactive({
	imgsrc: "/src/assets/iconfont/home-black.svg",
	title: "工作台",
});
const { imgsrc, title } = toRefs(state);
//动态获取高度和宽度
const windowHeight: Ref<number> = useWindowSize().height;
const windowWidth: Ref<number> = useWindowSize().width;
// 仪表盘的主体：用min-width 大于1100时可以计算，小于768可以计算，在中间的情况不计算
const dashboardSize: ComputedRef<windowSizeInterface> = computed<windowSizeInterface>(() => {
	let heightComputed = windowHeight.value - 100;
	let widthComputed = 0;
	if (windowWidth.value - store.state.asideWidth < 1100 && windowWidth.value - store.state.asideWidth > 768) {
		widthComputed = 1100;
	} else {
		widthComputed = windowWidth.value - store.state.asideWidth;
	}
	return { heightComputed: heightComputed, widthComputed: widthComputed };
});

const dashboardLayout: ComputedRef<string> = computed<string>(() => {
	return store.getters.deviceType;
});

// 该对象标记两个折叠栏是否折叠，默认为打开（false）
const collapseInTaskCard = reactive({
	notFinishCollapse: false,
	overCollapse: false,
});

const editableHeaderButtonText = ref("设置面板");
</script>
<style lang="less" scoped>
.el-header {
	display: flex;
	align-items: center;
	box-shadow: 0px 2px 10px #ddd;
}

.el-button {
	padding: 0px 20px;
}

.left-scrollbar {
	// &表示当前层级的父级选择器
	& > .dashboard-card {
		height: 330px;
	}
}

.dashboard-wrap {
	min-width: 1100px;
	display: flex;
	width: 100%;
}
</style>
