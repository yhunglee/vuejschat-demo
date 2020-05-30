<template>
  <b-modal id="modal-name" @ok="saveNickname">
    <b-row>
      <b-col md="3">
        <label for="nickname">名稱</label>
      </b-col>

      <b-col md="9">
        <b-form-input
          v-model="nickname"
          id="nickname"
          placeholder="輸入暱稱"
          :state="validNickname"
          trim
          aria-describedby="nickname-help nickname-feedback"
        >
        </b-form-input>

        <b-form-invalid-feedback id="nickname-feedback">
          至少3個字
        </b-form-invalid-feedback>

        <b-form-text id="nickname-help">
          請輸入暱稱
        </b-form-text>
      </b-col>
    </b-row>
  </b-modal>
</template>

<style lang="scss" scope></style>

<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";

@Component({})
export default class SettingName extends Vue {
  // TODO: find name and uuid for displaying and checking.

  private nickname = "";

  get validNickname(): boolean {
    return this.nickname.length >= 3 ? true : false;
  }

  mounted() {
    this.nickname = localStorage.getItem("nickname") || "";
  }

  @Emit()
  saveNickname(bvmodalEvt: Event) {
    localStorage.setItem("nickname", this.nickname);
  }

  // TODO: setting nickname id to localstorage
}
</script>
