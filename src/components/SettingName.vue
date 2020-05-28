<template>
  <b-modal id="modal-name">
    <b-row>
      <label for="nickname">名稱</label>
      <b-form-input v-model="nickname" id="nickname" placeholder="輸入暱稱">
      </b-form-input>
    </b-row>
  </b-modal>
</template>

<style lang="scss" scope></style>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {},
  props: [],
})
export default class SettingName extends Vue {
  // TODO: find name and uuid for displaying and checking.

  nickname = "";
}
</script>
