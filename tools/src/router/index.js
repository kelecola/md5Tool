import HelloWorld from "../components/HelloWorld.vue";
import LogConfig from "../components/LogConfig.vue";
import WebGl2D from "../components/WebGl2D.vue";

const routes = [
  { path: "/", name: "Home", component: HelloWorld },
  { path: "/config", name: "Config", component: LogConfig },
  { path: "/webgl1", name: "webgl1", component: WebGl2D },
];

export default routes;
