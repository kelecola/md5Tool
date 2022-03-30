import HelloWorld from "../components/HelloWorld.vue";
import LogConfig from "../components/LogConfig.vue";

const routes = [
  { path: "/", name: "Home", component: HelloWorld },
  { path: "/config", name: "Config", component: LogConfig },
];

export default routes;
