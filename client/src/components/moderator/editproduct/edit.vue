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
        <v-icon @click="deleteProductGroup(item)">mdi-delete</v-icon>
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
              <v-icon @click="deleteProduct(item)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </td>
      </template>
    </v-data-table>
    <h1 v-else>Nincs adat</h1>
    <v-dialog dark v-model="editedGroupDialog" width="500">
      <v-card>
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
          </v-row>
          <v-row>
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>Tags</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-list>
                    <v-list-item v-for="tag in editedGroup.tag" :key="tag">
                      <v-list-item-content>
                        <v-text-field
                          outlined
                          :value="tag"
                        ></v-text-field></v-list-item-content
                    ></v-list-item>
                  </v-list>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-col>
            <v-btn color="success" @click="submitproductgroup">Save</v-btn>
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
    <v-dialog dark v-model="editedPictureDialog">
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
      this.editedPictureDialog = false;
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files;
    },
    async submitproductgroup() {
      try {
        const resp = await this.$store.dispatch(
          "productgroup_patch",
          this.editedGroup
        );
        if (resp === 200) this.editedGroupDialog = false;
      } catch (err) {
        console.log(err);
      }
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
        this.$store.dispatch("deleteimg", { index, product });
        this.editedPictureDialog = false;
      }
    },
    deleteProductGroup(group) {
      if (confirm("Biztos törölni szeretnéd a termékcsaládot?")) {
        this.$store.dispatch("deleteProductGroup", group);
      }
    },
    deleteProduct(product) {
      if (confirm("Biztos törölni szeretnéd ezt a terméket?")) {
        this.$store.dispatch("deleteproduct", product);
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