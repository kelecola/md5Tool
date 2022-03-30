import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import routes from "./router";
import { createRouter, createWebHashHistory } from "vue-router";

const app = createApp(App);
app.use(ElementPlus);

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

app.use(router);

app.mount("#app");
