<template>
  <v-container>
    <v-card flat :to="`/product/${product.fullindex}`">
      <v-img
        :src="'http://192.168.1.152:8085/' + product.productImage[0]"
        height="60vh"
      />
      <v-card-title class="justify-center">{{ group_name }}</v-card-title>
      <v-card-subtitle class="text-center"
        >{{ group_price }},00 HUF</v-card-subtitle
      >
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    group_name: String,
    group_price: Number,
    product: null,
  },
};
</script>