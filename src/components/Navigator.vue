<template>
  <b-card no-body>
    <b-tabs card>
      <b-tab title="首頁"></b-tab>
      <b-tab title="今日話題"></b-tab>
      <b-tab title="偷偷說">
        <ChatRoom />
      </b-tab>
      <b-tab title="帳號名稱" disabled />
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
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ChatRoom from "@/components/ChatRoom.vue";

export default Vue.extend({
  name: "Navigator" as string,
  components: {
    ChatRoom
  }
});
</script>