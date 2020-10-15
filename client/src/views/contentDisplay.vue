<template>
  <v-row justify="center">
    <v-col sm="6" md="3" v-for="product in getContent" :key="product._id">
      <productCard :product="product" />
    </v-col>
  </v-row>
</template>

<script>
import productCard from "../components/cards/product";
export default {
  components: {
    productCard,
  },
  watch: {
    $route(to) {
      this.$store.dispatch("getGroupProductsByTag", Object.values(to.params));
    },
  },
  computed: {
    getContent() {
      return this.$store.getters.getContent;
    },
  },
  mounted() {
    this.$store.dispatch(
      "getGroupProductsByTag",
      Object.values(this.$route.params)
    );
  },
};
</script>