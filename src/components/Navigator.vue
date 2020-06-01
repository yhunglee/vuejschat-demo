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
  margin-left: 72%;
  text-align: right;
  background-color: #21a;
  .nav-link.disabled a {
    color: #fff;
  }
}
@media (max-width: 480px) {
  .nav-item:nth-child(4) {
    // 帳號 position
    margin-left: 1%;
    text-align: right;
    background-color: #21a;
    .nav-link.disabled a {
      color: #fff;
    }
  }
}

@media (max-width: 767px) {
  .nav-item:nth-child(4) {
    // 帳號 position
    margin-left: 42%;
    text-align: right;
    background-color: #21a;
    .nav-link.disabled a {
      color: #fff;
    }
  }
}

@media (min-width: 768px) and (max-width: 979px) {
  .nav-item:nth-child(4) {
    // 帳號 position
    margin-left: 52%;
    text-align: right;
    background-color: #21a;
    .nav-link.disabled a {
      color: #fff;
    }
  }
}

@media (min-width: 980px) {
  .nav-item:nth-child(4) {
    // 帳號 position
    margin-left: 30%;
    text-align: right;
    background-color: #21a;
    .nav-link.disabled a {
      color: #fff;
    }
  }
}
</style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
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
