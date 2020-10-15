<template>
  <v-container fluid>
    <v-row>
      <v-col xs="12" sm="2">
        <settingsMenu></settingsMenu>
      </v-col>
      <v-col sm="10">
        <transition name="slide" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import settingsMenu from "../components/addProduct/menu";
export default {
  components: {
    settingsMenu,
  },
};
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.1s, transform 0.1s;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(30%);
}
</style>