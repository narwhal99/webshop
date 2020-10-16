<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-form ref="addproduct_form" @submit.prevent="submit">
            <v-card-title>Termék hozzáadás</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-select
                    outlined
                    :rules="[required('Termék család')]"
                    label="Termék család"
                    menu-props="auto"
                    v-model="product.group_index"
                    :items="getProductGroupIndex"
                    hide-details
                    @change="selectedGroup"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    :rules="[required('szín')]"
                    label="Szín"
                    v-model="product.color"
                    outlined
                    hide-details
                    :disabled="autofilldisableButton"
                    @change="checkDuplicateInput"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    :rules="[required('Termék index')]"
                    label="Termék index"
                    v-model="product.index"
                    outlined
                    hide-details
                    :disabled="autofilldisableButton"
                    @change="checkDuplicateInput"
                  ></v-text-field>
                  <v-btn class="mt-1" @click="resetColorIndex" outlined
                    >Clear</v-btn
                  >
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    :rules="[required('mennyiség')]"
                    label="Mennyiség"
                    type="Number"
                    v-model="product.quantity"
                    outlined
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    type="Number"
                    :rules="[required('méret')]"
                    label="Méret"
                    v-model="product.size"
                    outlined
                    hide-details
                  ></v-text-field>
                </v-col>
              </v-row>
              <input
                :disabled="autofilldisableButton"
                type="file"
                @change="onFileSelected"
                multiple
              />
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" type="submit" outlined>Feltöltés</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
      <v-col lg="3" xl="6" v-for="content in getProduct" :key="content._id">
        <h1>Termék család:</h1>
        <v-card class="my-6">
          <v-img
            contain
            height="300"
            width="300"
            :src="
              'http://192.168.1.152:8085/' + content.product[0].productImage[0]
            "
          ></v-img>
          <v-card-title>{{ content.name }}</v-card-title>
          <v-card-text>
            <v-btn
              class="mr-1"
              v-for="(product, index) in content.product"
              :key="index"
              height="31px"
              min-width="31px"
              :color="product.color.toLowerCase()"
            ></v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      required(propertyType) {
        return (v) => (v && v.length > 0) || `Kötelező mező ${propertyType}`;
      },
      selectedFile: 0,
      autofilldisableButton: false,
      product: {
        group_index: "",
        index: "",
        quantity: null,
        color: "",
        size: "",
      },
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files;
    },
    async submit() {
      if (this.$refs.addproduct_form.validate()) {
        const fd = new FormData();
        for (let i = 0; i < this.selectedFile.length; i++) {
          fd.append(
            "productImage",
            this.selectedFile[i],
            this.selectedFile[i].name
          );
        }
        for (var key in this.product) {
          fd.append(key, this.product[key]);
        }
        const resp = await this.$store.dispatch("addProduct", fd);
        if (resp.status === 201) this.$refs.addproduct_form.reset();
      }
    },
    selectedGroup(index) {
      this.$store.dispatch("getGroupProductsByIndex", index);
    },
    checkDuplicateInput() {
      const colorindex = this.getProduct[0].product.findIndex((item) => {
        return item.color == this.product.color;
      });
      const indexindex = this.getProduct[0].product.findIndex((item) => {
        return item.index == this.product.index;
      });
      if (indexindex > -1) {
        this.product.color = this.getProduct[0].product[indexindex].color;
        this.autofilldisableButton = true;
      }
      if (colorindex > -1) {
        this.product.index = this.getProduct[0].product[colorindex].index;
        this.autofilldisableButton = true;
      }
    },
    resetColorIndex() {
      (this.autofilldisableButton = false), (this.product.color = "");
      this.product.index = "";
    },
  },
  computed: {
    ...mapGetters(["getProductGroupIndex", "getProduct"]),
  },
  created() {
    return this.$store.dispatch("getProductGroupIndex");
  },
};
</script>