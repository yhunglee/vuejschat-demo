<template>
  <div class="container">
    <div class="notice-area"></div>
    <MsgList />
    <div class="input-area">
      <div class="action pic">
        <button>
          <label>
            <input type="file" name="imgFile" id="imgFile" accept="image/*" hidden />
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
        <textarea name="msg" id="inputMsg" cols="30" rows="1" autofocus></textarea>
      </div>

      <div class="action send-msg">
        <button>
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
import Vue from "vue";
import MsgList from "@/components/MsgList.vue";

export default Vue.extend({
  name: "chat-room" as string,
  components: {
    MsgList
  }
});
</script>
