<template>
  <link
    rel="stylesheet"
    href="https://pro.fontawesome.com/releases/v5.15.2/css/all.css"
  />
  <component :is="layout">
    <router-view />
  </component>
</template>

<script>
import MainLayout from "@/layouts/Main.vue";
import EmptyLayout from "@/layouts/Empty.vue";

export default {
  computed: {
    layout() {
      return this.$route.meta.layout + "-layout";
    },
  },
  components: {
    MainLayout,
    EmptyLayout,
  }
};
</script>

<style lang="css">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

body {
  background: linear-gradient(90deg, #15181f, #2e1d33);
}

html {
  scroll-behavior: smooth;
}

.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.side-enter-active,
.side-leave-active {
  transition: all 0.5s;
}

.side-enter-from,
.side-leave-to {
  transform: translateX(100%);
}

::-webkit-scrollbar {
  width: 3px;
  background: #000;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, black, white);
  border-radius: 30px;
}
</style>