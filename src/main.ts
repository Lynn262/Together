import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import router from "./router";
import { store, key } from "./store";
import Directives from "./utils/directives";

const app = createApp(App);

app.use(ElementPlus).use(router).use(store, key).use(Directives);
app.mount("#app");

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}
