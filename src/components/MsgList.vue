<template>
  <div class="msg-list" ref="msgList">
    <Msg v-for="msg in msgList" v-bind:msg="msg" v-bind:key="msg.msgId" />
    <b-progress
      :value="progress"
      show-value
      animated
      class="uploading-file"
      v-show="uploading"
    ></b-progress>
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

.uploading-file {
  // 上傳圖片時的樣式
  float: right;
  width: 30%;
  margin: 10px 0;
}
</style>

<script lang="ts">
// import Vue from "vue";
import { Vue, Component } from "vue-property-decorator";
import Msg from "@/components/Msg.vue";
// import { MsgType } from "@/components/Msg.vue";

// export default Vue.extend({
//   name: "msg-list" as string,
//   components: {
//     Msg,
//   },
// });

@Component({
  components: { Msg },
  props: ["msgList", "uploading", "progress"]
})
export default class MsgList extends Vue {
  // @Prop() readonly msgList: Array<MsgType> = [];
  // @Prop() readonly uploading: boolean = false;
  // @Prop() readonly progress: number = 0;

  public updated() {
    this.$nextTick(() => {
      // 選擇訊息清單欄元素
      const element = this.$refs.msgList as HTMLDivElement;

      // 當訊息清單更新後，捲到最底部，能夠立刻看到新訊息
      element.scrollTop = element.scrollHeight;
    });
  }
}
</script>
