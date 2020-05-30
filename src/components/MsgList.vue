<template>
  <div class="msg-list">
    <Msg v-for="msg in msgList" v-bind:msg="msg" v-bind:key="msg.msgId" />
    <!-- <Msg
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
    /> -->
  </div>
</template>

<style lang="scss">
.msg-list {
  width: 100%;
  height: 80vh;
  overflow: hidden;
  overflow-y: scroll;
}
</style>

<script lang="ts">
// import Vue from "vue";
import { Vue, Component, Prop } from "vue-property-decorator";
import Msg from "@/components/Msg.vue";
import { MsgType } from "@/components/Msg.vue";

// export default Vue.extend({
//   name: "msg-list" as string,
//   components: {
//     Msg,
//   },
// });

@Component({
  components: { Msg },
  props: ["msgList"],
})
export default class MsgList extends Vue {
  // @Prop() readonly msgList: Array<MsgType> = [];
}
</script>
