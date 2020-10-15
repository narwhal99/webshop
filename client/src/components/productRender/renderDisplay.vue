<template>
  <v-container v-if="getContent" fluid>
    <v-row>
      <v-col cols="2">
        <v-col
          v-for="(picture, index) in getContent.product.productImage"
          :key="index"
        >
          <v-img
            @click="midPicture = index"
            :src="'http://192.168.1.152:8085/' + picture"
            height="120"
          />
        </v-col>
      </v-col>
      <v-col cols="6">
        <v-img
          contain
          :src="
            'http://192.168.1.152:8085/' +
            getContent.product.productImage[midPicture]
          "
          height="500"
        />
      </v-col>
      <v-col cols="4">
        <v-card outlined>
          <v-card-title>{{ getContent.group.name }}</v-card-title>
          <v-card-subtitle>{{ getContent.group.price }} HUF</v-card-subtitle>
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="getContent.product.stock"
              item-text="size"
              item-value="quantity"
              outlined
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
              <v-col cols="12">
                <v-btn outlined color="success">Add shopcard</v-btn>
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
