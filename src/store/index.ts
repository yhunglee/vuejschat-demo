import Vue from "vue";
import Vuex from "vuex";
import { v4 as uuidv4 } from "uuid";

export type AccountSetting = {
  name: string;
  uuid: string;
};

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accountName: "",
    accountId: ""
  },
  mutations: {
    modifyAccountName(state, accountName: string) {
      state.accountName = accountName;
    },
    modifyAccountId(state, accountId: string) {
      state.accountId = accountId;
    }
  },
  actions: {
    modifyAccountName(context, accountName: string) {
      localStorage.setItem("nickname", accountName);

      context.commit("modifyAccountName", accountName);
    },
    modifyAccountId(context, accountId = "") {
      const tmpUUID = uuidv4();
      if (accountId === "" || localStorage.getItem("nickname_uuid") === null) {
        localStorage.setItem("nickname_uuid", tmpUUID);
        accountId = tmpUUID;
      } else {
        localStorage.setItem("nickname_uuid", accountId);
      }
      context.commit("modifyAccountId", accountId);
    },
    readAccountSetting(context) {
      const name = localStorage.getItem("nickname") || "";

      const uuid = localStorage.getItem("nickname_uuid") || "";

      context.commit("modifyAccountId", uuid);
      context.commit("modifyAccountName", name);
    }
  },
  modules: {}
});
