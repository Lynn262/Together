import { createRouter, createWebHashHistory, RouteRecordRaw, Router } from "vue-router";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/login",
		name: "Login",
		component: () => import("@/views/login/Login.vue"),
	},
	{
		path: "/home",
		name: "Home",
		component: () => import("@/views/home/Home.vue"),
		redirect: "/dashboard",
		children: [
			{
				path: "/plan",
				name: "Plan",
				component: () => import("@/views/plan/Plan.vue"),
			},
			{
				path: "/dashboard",
				name: "Dashboard",
				component: () => import("@/views/dashboard/Dashboard.vue"),
			},
			{
				path: "/code",
				name: "Code",
				component: () => import("@/views/code/Code.vue"),
			},
			{
				path: "/chat",
				name: "Chat",
				component: () => import("@/views/chat/Chat.vue"),
			},
		],
	},
];

const router: Router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
});

export default router;
