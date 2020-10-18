<template>
  <v-row justify="center">
    <template v-for="group in getContent">
      <v-col sm="6" md="3" v-for="product in group.product" :key="product._id">
        <productCard :group_name="group.name" :group_price="group.price" :product="product" />
      </v-col>
    </template>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
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
    ...mapGetters(["getContent"]),
  },
  mounted() {
    this.$store.dispatch(
      "getGroupProductsByTag",
      Object.values(this.$route.params)
    );
  },
};
</script>