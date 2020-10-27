<template>
  <v-container>
    <v-row justify="start">
      <filters />
    </v-row>
    <v-row justify="center" color="black">
      <template v-for="group in getContent">
        <v-col
          sm="6"
          md="3"
          v-for="product in group.product"
          :key="product._id"
        >
          <productCard
            :group_name="group.name"
            :group_price="group.price"
            :product="product"
          />
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import productCard from "../components/cards/product";
import filters from "../components/filter/abovecontentfilter";
export default {
  components: {
    productCard,
    filters,
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