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
            <v-img
              contain
              :src="
                'http://192.168.1.152:8085/' +
                getContent.product.productImage[midPicture]
              "
              height="80vh"
            />
          </v-col>
        </v-row>
        <v-row justify="center">
          <p>Index: {{ $route.params.product }}</p>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-card flat>
          <v-card-title
            ><h1>{{ getContent.group.name }}</h1></v-card-title
          >
          <v-card-subtitle
            ><h2>{{ getContent.group.price }},00 HUF</h2></v-card-subtitle
          >
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <p>Color</p>
                <v-btn
                  class="mr-1"
                  height="31px"
                  min-width="31px"
                  width="31"
                  v-for="(product, index) in getContent.group.product"
                  :key="index"
                  :to="product.fullindex"
                  :color="product.color.toLowerCase()"
                >
                  <v-icon
                    v-if="$route.params.product == product.fullindex"
                    right
                    class="pl-2 pt-4"
                    color="green"
                    >done</v-icon
                  ></v-btn
                >
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="getContent.product.stock"
                  item-text="size"
                  item-value="quantity"
                  solo
                  label="Choose size"
                ></v-select>
              </v-col>
              <v-col>
                <v-btn width="100%" outlined color="success"
                  >Add shopcard</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
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
      this.midPicture = 0
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

