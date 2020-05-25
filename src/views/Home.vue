<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <Navigator />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Navigator from "@/components/Navigator";
// import ChatRoom from "@/components/ChatRoom";

export default {
  name: "Home",
  components: {
    Navigator
  }
};
</script>
