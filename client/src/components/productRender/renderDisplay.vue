<template>
  <v-container v-if="getContent" fluid>
    <v-row align="center" justify="center">
      <v-col cols="7">
        <v-row>
          <v-col cols="1">
            <v-img
              height="10vh"
              class="mb-2"
              v-for="(picture, index) in getContent.product.productImage"
              :key="index"
              contain
              @click="midPicture = index"
              :src="'http://192.168.1.152:8085/' + picture"
            />
          </v-col>
          <v-col cols="8">
            <v-img
              contain
              :src="
                'http://192.168.1.152:8085/' +
                getContent.product.productImage[midPicture]
              "
              height="100vh"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-card outlined>
          <v-card-title>{{ getContent.group.name }}</v-card-title>
          <v-card-subtitle>{{ getContent.group.price }} HUF</v-card-subtitle>
          <v-col>
            <v-select
              :items="getContent.product.stock"
              item-text="size"
              item-value="quantity"
              filled
              label="Size"
              dense
            ></v-select>
          </v-col>
          <v-card-actions>
            <v-row>
              <v-col cols="12">
                <v-btn
                  class="mr-1"
                  height="31px"
                  min-width="31px"
                  v-for="(product, index) in getContent.group.product"
                  :key="index"
                  :to="product.fullindex"
                  :color="product.color.toLowerCase()"
                ></v-btn>
              </v-col>
              <v-col>
                <v-btn width="100%" outlined color="success"
                  >Add shopcard</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      midPicture: 0,
    };
  },
  watch: {
    $route(to) {
      this.$store.dispatch("getProduct", to.params.product);
    },
  },
  created() {
    this.$store.dispatch("getProduct", this.$route.params.product);
  },
  computed: {
    getContent() {
      return this.$store.getters.getProduct;
    },
  },
};
</script>
