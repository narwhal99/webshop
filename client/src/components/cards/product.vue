<template>
  <v-card
    outlined
    :to="`/product/${product.index}-${product.product[productSelectedIndex].index}`"
  >
    <v-img
      contain
      :src="
        'http://192.168.1.152:8085/' +
        product.product[productSelectedIndex].productImage[0]
      "
      height="200"
    />
    <v-card-title class="justify-center">{{ product.name }}</v-card-title>
    <v-card-subtitle class="text-center"
      >{{ product.price }} HUF</v-card-subtitle
    >
    <v-card-text>
      <v-btn
        class="mr-1"
        v-for="(product, index) in product.product"
        :key="index"
        height="31px"
        min-width="31px"
        :color="product.color.toLowerCase()"
        @click="productSelectedIndex = index"
      ></v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      productSelectedIndex: 0,
    };
  },
  props: {
    product: Object,
  },
};
</script>