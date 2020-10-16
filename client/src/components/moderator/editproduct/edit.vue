<template>
  <v-container>
    <v-select
      outlined
      label="Termék család"
      :items="getProductGroupIndex"
      hide-details
      @change="selectedGroup"
    ></v-select>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getProductGroupIndex"]),
  },
  methods: {
    selectedGroup(index) {
      this.$store.dispatch("getGroupProductsByIndex", index);
    },
  },
  created() {
    return this.$store.dispatch("getProductGroupIndex");
  },
};
</script>