<template>
  <nav>
    <v-toolbar class="pa-0" height="120" flat>
      <v-col>
        <v-row justify="center">
          <v-btn to="/" text>
            <span class="font-weight-light">Web</span>
            <span>Shop</span>
          </v-btn>
        </v-row>
        <v-row>
          <v-col cols="2"> </v-col>
          <v-col cols="8" class="d-flex justify-center">
            <v-menu
              v-model="menu"
              min-width="100%"
              open-on-hover
              transition="slide-y-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-btn text v-on="on" class="mr-3" to="/man/all">
                  Férfi
                  <v-icon :class="{ hidden: !menu }">expand_more</v-icon></v-btn
                >
              </template>
              <v-list class="mx-5 mt-2" flat>
                <v-row justify="center">
                  <v-col v-for="(subheader, i) in man" :key="i" cols="3">
                    <v-list-item-group>
                      <v-col>
                        <v-list-item-title class="font-weight-bold">{{
                          subheader.title
                        }}</v-list-item-title>
                      </v-col>
                      <v-list-item
                        v-for="(subitem, i) in subheader.subitems"
                        :key="i"
                        :to="{
                          params: { gender: 'man', product: i },
                          name: 'contentrender',
                        }"
                      >
                        <v-list-item-title class="subcategory">{{
                          subitem
                        }}</v-list-item-title>
                      </v-list-item>
                    </v-list-item-group>
                  </v-col>
                </v-row>
              </v-list>
            </v-menu>
          </v-col>
          <v-col cols="2" class="d-flex justify-end">
            <v-text-field
              append-outer-icon="search"
              label="Search"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-toolbar>
  </nav>
</template>

<script>
import { navcontent } from "../../navcontent";
export default {
  data() {
    return {
      menu: false,
    };
  },
  mixins: [navcontent],
};
</script>

<style scoped>
.v-menu__content {
  box-shadow: none;
}
.v-btn::before {
  background-color: transparent;
}
.hidden {
  visibility: hidden;
}
.hover-show-hidden:hover .hidden {
  visibility: visible;
}
.subcategory {
  left: 0;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  position: relative;
}
.subcategory:hover {
  opacity: 0.6;
  left: 10px;
  padding-left: -10px;
}
</style>