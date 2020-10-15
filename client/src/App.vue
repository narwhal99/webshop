<template>
  <v-app>
    <navbar />
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import navbar from "./components/navbar/navbar";
export default {
  components: {
    navbar,
  },
};
</script>

<style>
