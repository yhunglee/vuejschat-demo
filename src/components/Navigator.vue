<template>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="首頁"></b-tab>
      <b-tab title="今日話題"></b-tab>
      <b-tab title="偷偷說">
        <ChatRoom />
      </b-tab>

      <b-tab :title="accountName()">
        <b-button v-b-modal.modal-name>設定暱稱</b-button>
        <SettingName />
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<style lang="scss">
.nav-item:nth-child(4) {
  // 帳號 position
  margin-left: 75%;
  text-align: right;
  background-color: #21a;
  .nav-link.disabled {
    color: #fff;
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ChatRoom from "@/components/ChatRoom.vue";
import SettingName from "@/components/SettingName.vue";

@Component({
  components: {
    ChatRoom,
    SettingName
  }
})
export default class Navigator extends Vue {
  public accountName(): string {
    // console.log(`Navigator: ${localStorage.getItem("nickname")}`); // debug
    return localStorage.getItem("nickname") || "帳號資料";
  }
}
</script>
