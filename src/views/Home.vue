<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <ChatRoom />
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import ChatRoom from "@/components/ChatRoom";

export default {
  name: "Home",
  components: {
    // HelloWorld,
    ChatRoom,
  },
};
</script>
