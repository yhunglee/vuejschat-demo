<template>
  <div class="container">
    <div class="notice-area"></div>
    <!-- <MsgList
      v-bind:msgList="[
        {
          author: 'hello',
          authorId: '1',
          msgId: '1',
          color: '#f00',
          createdAt: new Date(),
          content: 'world2',
          isMe: true,
        },
        {
          author: 'hello',
          authorId: '1',
          msgId: '2',
          color: '#f00',
          createdAt: new Date(),
          content:
            'worldqwerqwersdfjsadfjweorqjpwoerjqwerqweoreqerasdfasdfasldfkasld;fkas;dlfkjas;ldfkjas;ldfkjasdl;feworuqpwoeirupedfqwreqwerqwerqwerqwerqwerqwerqwer',
          isMe: true,
        },
        {
          author: 'hello1',
          authorId: '2',
          msgId: '3',
          color: '#bf0',
          createdAt: new Date(),
          content: 'world1',
          isMe: false,
        },
      ]"
    /> -->
    <MsgList v-bind:msgList="msgList" />
    <div class="input-area">
      <div class="action pic">
        <button>
          <label>
            <input
              type="file"
              name="imgFile"
              id="imgFile"
              accept="image/*"
              hidden
            />
            <b-icon-image></b-icon-image>
          </label>
        </button>
      </div>

      <div class="action emoji-list">
        <button>
          <label>
            <b-icon-emoji-smile></b-icon-emoji-smile>
          </label>
        </button>
      </div>

      <div class="txt msg-input">
        <b-form>
          <b-textarea
            name="msg"
            id="inputMsg"
            cols="30"
            rows="1"
            autofocus
            @keydown.enter="sendMessage"
          ></b-textarea>
        </b-form>
      </div>

      <div class="action send-msg">
        <button @click="sendMessage">
          <b-icon-arrow-right></b-icon-arrow-right>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  min-width: 100%;
  min-height: 100%;

  .input-area {
    display: flex;
    width: 100%;
    align-items: center;

    // 排在這個分頁的最底部
    position: relative;
    bottom: 2%;
    height: 2%;

    button,
    button:focus {
      // 取消邊線和聚焦效果
      border: none;
      outline: none;
      font-size: 30px;
    }
    .action {
      // 每個行動佔至少 10%位置，顯得比較開闊
      min-width: 10%;
    }
    .txt.msg-input {
      width: 65%;
      padding: 0px 5px;
      textarea {
        resize: none;
        border-radius: 20px;
        width: 100%;
        padding: 5px 10px;
        &:focus {
          // 取消聚焦效果
          outline: none;
        }
      }
    }
  }
}
</style>

<script lang="ts">
// import Vue from "vue";
import { Vue, Component } from "vue-property-decorator";
import MsgList from "@/components/MsgList.vue";
import { db, Timestamp } from "@/db";
import { MsgType } from "./Msg.vue";
import { v4 as uuidv4 } from "uuid";

// export default Vue.extend({
//   name: "chat-room" as string,
//   components: {
//     MsgList,
//   },
// });

@Component({
  components: { MsgList },
  props: []
})
export default class ChatRoom extends Vue {
  public msgList: Array<MsgType> = [];

  get firestore() {
    return {
      msgList: db.collection("msgList")
    };
  }

  public mounted() {
    this.firestore.msgList
      .orderBy("createdAt", "asc")
      .limitToLast(10)
      .onSnapshot(snapshot => {
        const rawMsgs = snapshot.docs.map(doc => doc.data());
        rawMsgs.forEach(rawMsg => {
          // 每一個遠端訊息需要尋找是否已存在畫面訊息列表
          const msgIsExistingList = this.msgList.findIndex(element => {
            return element["msgId"] === rawMsg["msgId"];
          });

          if (msgIsExistingList === -1) {
            // 當遠端訊息沒有存在畫面訊息列表時，增加到畫面的訊息列表
            this.msgList.push({
              author: rawMsg["author"],
              authorId: rawMsg["authorId"],
              msgId: rawMsg["msgId"],
              color: "",
              createdAt: rawMsg["createdAt"].toDate(),
              content: rawMsg["content"],
              isMe:
                rawMsg["authorId"] === localStorage.getItem("nickname_uuid")
                  ? true
                  : false
            });
          }
        });
      });
  }

  sendMessage(event: Event | KeyboardEvent) {
    // console.log(
    //   `event.target.value: ${JSON.stringify(
    //     (event.target as HTMLTextAreaElement).value
    //   )}`
    // ); // debug

    if ((event as KeyboardEvent).shiftKey) {
      return false;
    }

    // 選擇輸入欄元素
    const element = document.getElementById("inputMsg") as HTMLTextAreaElement;
    // 當輸入欄位空值時不傳訊息
    if (element.value.length < 1 || element.value.trim() === "") {
      event.preventDefault();
      return false;
    }

    this.firestore.msgList.add({
      author: localStorage.getItem("nickname"),
      authorId: localStorage.getItem("nickname_uuid"),
      msgId: uuidv4(),
      content: element.value,
      createdAt: Timestamp.fromDate(new Date())
    });

    // clean value of textarea
    element.value = "";

    event.preventDefault();
  }
}
</script>
