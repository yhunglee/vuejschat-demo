<template>
  <div class="msg-list">
    <Msg
      v-bind:msg="{
        author: 'hello',
        authorId: '',
        color: '#f00',
        createdAt: new Date(),
        content:
          'worldqwerqwersdfjsadfjweorqjpwoerjqwerqweoreqerasdfasdfasldfkasld;fkas;dlfkjas;ldfkjas;ldfkjasdl;feworuqpwoeirupedfqwreqwerqwerqwerqwerqwerqwerqwer',
        isMe: true,
      }"
    />
    <Msg
      v-bind:msg="{
        author: 'hello1',
        authorId: '',
        color: '#bf0',
        createdAt: new Date(),
        content: 'world1',
        isMe: false,
      }"
    />
    <Msg
      v-bind:msg="{
        author: 'hello',
        authorId: '',
        color: '#f00',
        createdAt: new Date(),
        content: 'world2',
        isMe: true,
      }"
    />
  </div>
</template>

<style lang="scss"></style>

<script lang="ts">
import Vue from "vue";
import Msg from "@/components/Msg.vue";

export default Vue.extend({
  name: "msg-list" as string,
  components: {
    Msg,
  },
});
</script>
