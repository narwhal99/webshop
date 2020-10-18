<template>
  <v-container>
    <v-row>
      <v-col cols="6">
        <v-card>
          <v-form ref="addgroup_form" @submit.prevent="submit">
            <v-card-title> Termék család hozzáadása </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Index"
                    v-model="group.index"
                    hide-details
                    outlined
                    :rules="[required('index')]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Név"
                    v-model="group.name"
                    hide-details
                    outlined
                    :rules="[required('Név')]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Ár"
                    v-model="group.price"
                    hide-details
                    outlined
                    :rules="[required('Ár')]"
                  ></v-text-field>
                </v-col>
                <v-autocomplete
                  v-model="group.tag"
                  :items="getTags"
                  chips
                  label="Tags"
                  hide-selected
                  multiple
                  hide-details
                  outlined
                  :rules="[required('Tag')]"
                ></v-autocomplete>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-btn color="success" type="submit" outlined>Feltöltés</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { navcontent } from "../../../navcontent";
export default {
  mixins: [navcontent],
  data() {
    return {
      required(propertyType) {
        return (v) => (v && v.length > 0) || `Kötelező mező ${propertyType}`;
      },
      group: {
        index: null,
        name: null,
        price: null,
        tag: null,
      },
    };
  },
  methods: {
    async submit() {
      if (this.$refs.addgroup_form.validate()) {
        const resp = await this.$store.dispatch("addProductGroup", this.group);
        if (resp.status === 201) this.$refs.addgroup_form.reset();
      }
    },
  },
  computed: {
    getTags() {
      let result = ["woman", "man"];
      function printValues(obj) {
        for (var key in obj) {
          if (typeof obj[key] === "object") {
            printValues(obj[key]);
          } else {
            if (key != "title") result.push(key);
          }
        }
      }
      printValues(this.man);
      printValues(this.woman);
      return [...new Set(result)];
    },
  },
};
</script>