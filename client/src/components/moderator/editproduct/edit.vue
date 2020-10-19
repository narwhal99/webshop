<template>
  <v-container>
    <v-data-table
      dark
      item-key="_id"
      show-expand
      v-if="getContent"
      :headers="headers_groupproduct"
      :items="getContent"
    >
      <template v-slot:item.createdAt="{ item }">{{
        formatDate(item.createdAt)
      }}</template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-3" @click="editGroupbtn(item)">mdi-pencil</v-icon>
        <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-data-table
            class="ma-5"
            hide-default-footer
            :items="item.product"
            :headers="headers_singleProduct"
          >
            <template v-slot:item.createdAt="{ item }">{{
              formatDate(item.createdAt)
            }}</template>
            <template v-slot:item.actions="{ item }">
              <v-icon class="mr-3" @click="editPicBtn(item)"
                >mdi-image-area</v-icon
              >
              <v-icon class="mr-3" @click="editStockbtn(item)"
                >mdi-archive</v-icon
              >
              <v-icon class="mr-3" @click="edigProductbtn(item)"
                >mdi-pencil</v-icon
              >
              <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </td>
      </template>
    </v-data-table>
    <h1 v-else>Nincs adat</h1>
    <v-dialog v-model="picturedialog" width="500">
      <v-card dark>
        <v-card-title>Product group edit</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field
                outlined
                label="Name"
                v-model="editProductGroup.name"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                label="Price"
                v-model="editProductGroup.price"
                type="Number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                outlined
                label="index"
                v-model="editProductGroup.index"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                label="Tags"
                v-model="editProductGroup.tag"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-col>
            <v-btn color="success">Submit</v-btn>
            <v-btn color="error" text @click="cancelDialog">Cancel</v-btn>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="editStockDialog" width="500">
      <v-data-table
        hide-default-footer
        :items="editProductStock"
        :headers="headers_stock"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon class="mr-3" @click="editStock(item)">mdi-pencil</v-icon>
          <v-icon @click="deletestock(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
let moment = require("moment");
export default {
  data() {
    return {
      headers_singleProduct: [
        { text: "Color", value: "color" },
        { text: "Index", value: "index" },
        { text: "Full-Index", value: "fullindex" },
        { text: "Hozzáadva", value: "createdAt" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      headers_groupproduct: [
        { text: "Név", value: "name" },
        { text: "Ár", value: "price" },
        { text: "index", value: "index" },
        { text: "Hozzáadva", value: "createdAt" },
        { text: "Tags", value: "tag" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      headers_stock: [
        { text: "Size", value: "size" },
        { text: "Quantity", value: "quantity" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editProductGroup: {},
      editProductStock: [],
      picturedialog: false,
      editStockDialog: false,
    };
  },
  methods: {
    formatDate(value) {
      return moment(value).locale("hu").format("llll");
    },
    editStockbtn(item) {
      this.editProductStock = item.stock;
      this.editStockDialog = true;
    },
    editGroupbtn(item) {
      this.editProductGroup = Object.assign({}, item);
      this.picturedialog = true;
    },
    cancelDialog() {
      (this.picturedialog = false), (this.editProductGroup = {});
    },
  },
  computed: {
    ...mapGetters(["getContent"]),
  },
  created() {
    this.$store.dispatch("geteveryproduct_group");
  },
};
</script>