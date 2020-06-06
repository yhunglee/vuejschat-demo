<template>
  <div class="container" id="chatroom">
    <div class="notice-area">
      <b-alert show dismissible
        >最近是武漢肺炎疫情期間，請做好健康自主管理</b-alert
      >
    </div>
    <MsgList
      v-bind:msgList="msgList"
      v-bind:uploading="uploadingImgFile"
      v-bind:progress="uploadingProgress"
    />
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
              @change="sendImage"
            />
            <b-icon-image></b-icon-image>
          </label>
        </button>
      </div>

      <div class="action emoji">
        <button @click="displayEmojiList">
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

    <div class="list emoji-listing" v-show="showEmojiListing">
      <img
        class="item"
        src="@/assets/SmartSelect_20200531-111510.jpg"
        alt
        width="200"
        @click="sendEmoji"
      />
      <img
        class="item"
        src="@/assets/SmartSelect_20200530-153652.jpg"
        alt
        srcset
        width="200"
        @click="sendEmoji"
      />
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
      width: 70%;
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
  .emoji-listing {
    display: flex;

    .item {
      margin: 20px;
    }
  }
}
</style>

<script lang="ts">
// import Vue from "vue";
import { Vue, Component } from "vue-property-decorator";
import MsgList from "@/components/MsgList.vue";
import { db, Timestamp, storage } from "@/db";
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

  private showEmojiListing = false;

  private uploadingImgFile = false;
  private uploadingProgress = 0;

  get firestore() {
    // notice: use vue-fire package
    return {
      msgList: db.collection("msgList"),
      bugList: db.collection("bug")
    };
  }

  get firestorage() {
    // notice: no use other 3rd party packages.
    return {
      imgList: storage.ref("/images/")
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
              contentType:
                rawMsg["contentType"] === undefined ||
                rawMsg["contentType"] === "text"
                  ? "text"
                  : "picture",
              content: rawMsg["content"],
              isMe:
                rawMsg["authorId"] === this.$store.state.accountId
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
      author: this.$store.state.accountName,
      authorId: this.$store.state.accountId,
      msgId: uuidv4(),
      contentType: "text",
      content: element.value,
      createdAt: Timestamp.fromDate(new Date())
    });

    // clean value of textarea
    element.value = "";

    event.preventDefault();
  }

  private displayEmojiList() {
    this.showEmojiListing = !this.showEmojiListing;

    // 協助瀏覽器移動 div 畫面到最底部和最上面，去展示/隱藏 emoji list
    this.$nextTick(() => {
      const element = document.getElementById("chatroom") as HTMLDivElement;

      element.scrollIntoView({
        behavior: "smooth",
        block: this.showEmojiListing === true ? "end" : "start"
      });
    });
  }

  sendImage(event: Event) {
    const target = event.target as HTMLInputElement;
    if (
      target === null ||
      target.files === null ||
      target.files === undefined
    ) {
      // 沒選取檔案則不處理上傳
      return false;
    }

    // 開始處理上傳資料
    const rawFileElement = ((event.target as HTMLInputElement)
      .files as FileList)[0];
    const rawFilename = rawFileElement.name;
    this._sendImageFile(rawFileElement, rawFilename);
  }

  // 發送圖檔到 firebase storage
  private _sendImageFile(
    rawFileElement: File | Blob,
    rawFilename: string | undefined
  ) {
    const uploadTask = this.firestorage.imgList
      .child(`${rawFilename}_${Math.floor(Date.now() / 1000)}`)
      .put(rawFileElement, {
        contentType: "image/*"
      });

    uploadTask.on(
      `state_changed`,
      snapshot => {
        this.uploadingProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        if (this.uploadingProgress < 100) {
          this.uploadingImgFile = true;
        }
      },
      error => {
        // 上傳圖片的錯誤處理
        this.firestore.bugList.add({
          author: this.$store.state.accountName,
          authorId: this.$store.state.accountId,
          msgId: uuidv4(),
          contentType: "picture",
          content: error.message,
          createdAt: Timestamp.fromDate(new Date())
        });
      },
      () => {
        // 完成上傳的處理
        this.uploadingProgress = 100;
        this.uploadingImgFile = false;
        uploadTask.snapshot.ref.getDownloadURL().then(url => {
          this.firestore.msgList.add({
            author: this.$store.state.accountName,
            authorId: this.$store.state.accountId,
            msgId: uuidv4(),
            contentType: "picture",
            content: url,
            createdAt: Timestamp.fromDate(new Date())
          });
        });
      }
    );
  }

  sendEmoji(event: Event) {
    const rawFileElement = (event.target as HTMLImageElement).src;
    const rawFilename = (event.target as HTMLImageElement).src.split("/").pop();

    fetch(rawFileElement)
      .then(res => res.blob())
      .then(blob => {
        this._sendImageFile(blob, rawFilename);
      });
  }
}
</script>
