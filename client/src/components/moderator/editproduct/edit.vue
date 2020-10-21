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
    <v-dialog v-model="editedGroupDialog" width="500">
      <v-card dark>
        <v-card-title>Product group edit</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field
                outlined
                label="Name"
                v-model="editedGroup.name"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                label="Price"
                v-model="editedGroup.price"
                type="Number"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                outlined
                label="index"
                v-model="editedGroup.index"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field outlined label="Tags" v-model="editedGroup.tag">
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
        dark
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
    <v-dialog v-model="editedPictureDialog">
      <v-card>
        <v-col>
          <v-row no-gutters justify="center">
            <v-card
              class="mr-3"
              width="150px"
              v-for="(image, index) in editedProduct.productImage"
              :key="index"
            >
              <v-img :src="'http://192.168.1.152:8085/' + image" />
              <v-col>
                <v-btn
                  color="error"
                  @click="deleteimg(index, editedProduct)"
                  outlined
                  >Delete</v-btn
                >
              </v-col>
            </v-card>
          </v-row>
          <v-card-actions>
            <v-row>
              <v-col cols="12">
                <input multiple type="file" @change="onFileSelected" />
              </v-col>
              <v-col>
                <v-btn color="warning" outlined @click="submitUpload"
                  >Upload</v-btn
                >
              </v-col>
            </v-row>
          </v-card-actions>
        </v-col>
      </v-card>
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
      selectedFile: 0,
      indexpictureselect: [],
      editedGroup: {},
      editProductStock: [],
      editedProduct: {},
      editedGroupDialog: false,
      editStockDialog: false,
      editedPictureDialog: false,
    };
  },
  methods: {
    submitUpload() {
      const fd = new FormData();
      for (let i = 0; i < this.selectedFile.length; i++) {
        fd.append(
          "productImage",
          this.selectedFile[i],
          this.selectedFile[i].name
        );
      }
      fd.append("editedProduct", this.editedProduct._id);
      this.$store.dispatch("uploadImg", fd);
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files;
    },
    formatDate(value) {
      return moment(value).locale("hu").format("llll");
    },
    editPicBtn(item) {
      this.selectedFile = 0;
      this.editedProduct = Object.assign({}, item);
      this.editedPictureDialog = true;
    },
    editStockbtn(item) {
      this.editProductStock = item.stock;
      this.editStockDialog = true;
    },
    editGroupbtn(item) {
      this.editedGroup = Object.assign({}, item);
      this.editedGroupDialog = true;
    },
    deleteimg(index, product) {
      if (confirm("Biztos törölni szeretnéd a képet?")) {
        try {
          this.$store.dispatch("deleteimg", { index, product });
        } catch (err) {
          console.log(err);
        }
      }
    },
    cancelDialog() {
      (this.editedGroupDialog = false), (this.editedGroup = {});
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