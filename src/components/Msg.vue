<template>
  <div class="msg-container" v-bind:class="{ isMe: msg.isMe }">
    <div class="author">{{ msg.author }}</div>
    <div class="msg-content">{{ msg.content }}</div>
    <div class="created-at">{{ simplifyTime(msg.createdAt) }}</div>
  </div>
</template>

<style lang="scss">
.msg-container {
  display: flex;
  position: relative;

  .msg-content {
    padding: 10px;
    color: #000;
    border-radius: 0 20px 20px 20px;
    border: 1px solid #000;
    margin-top: 30px;
    max-width: 70%;
    min-height: 10%;
  }

  .created-at {
    display: inline-block;
    max-width: 10%;
    line-height: 100px;
    padding: 0px 5px;
  }
}

.msg-container.isMe {
  flex-direction: row-reverse;

  .msg-content {
    background-color: #08f;
    color: #fff;
    border-radius: 20px 0 20px 20px;
    border-color: transparent;
  }
}
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {},
  props: ["msg"]
})
export default class Msg extends Vue {
  @Prop() readonly msg!: object;

  public simplifyTime(rawTime: Date): string {
    let simpleTime = "";
    const hours = rawTime.getHours();
    const minutes = rawTime.getMinutes();
    simpleTime = `${hours >= 12 ? "下午" : "上午"} ${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }`;
    return simpleTime;
  }
}
export type MsgType = {
  author: string;
  authorId: string;
  msgId: string;
  color: string;
  createdAt: Date;
  content: string;
  isMe: boolean;
};
</script>
