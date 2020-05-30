import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import { firestorePlugin } from "vuefire";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.use(firestorePlugin);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

Vue.component("chatRoom", import("@/components/ChatRoom.vue"));
Vue.component("msgList", import("@/components/MsgList.vue"));
Vue.component("msg", import("@/components/Msg.vue"));
Vue.component("settingName", import("@/components/SettingName.vue"));
