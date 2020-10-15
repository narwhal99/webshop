<template>
  <nav>
    <v-toolbar color="#E8E8E8" flat>
      <v-toolbar-title class="text-uppercase pr-5">
        <v-btn to="/" text>
          <span class="font-weight-light">Web</span>
          <span>Shop</span>
        </v-btn>
      </v-toolbar-title>
      <v-menu
        open-on-hover
        bottom
        origin="top"
        transition="slide-y-transition"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            Férfi
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>
        </template>
        <v-list flat color="#f1faee">
          <v-row>
            <v-col v-for="(subheader, i) in man" :key="i">
              <v-list-item-group>
                <v-subheader>{{ subheader.title }}</v-subheader>
                <v-list-item
                  v-for="(subitem, i) in subheader.subitems"
                  :key="i"
                  :to="{
                    params: { gender: 'man', product: i },
                    name: 'contentrender',
                  }"
                >
                  <v-list-item-title>{{ subitem }}</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-col>
          </v-row>
        </v-list>
      </v-menu>
      <v-menu
        open-on-hover
        bottom
        origin="top"
        transition="slide-y-transition"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on">
            Női
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>
        </template>
        <v-list flat color="#f1faee">
          <v-row>
            <v-col v-for="(subheader, i) in woman" :key="i">
              <v-list-item-group>
                <v-subheader>{{ subheader.title }}</v-subheader>
                <v-list-item
                  v-for="(subitem, i) in subheader.subitems"
                  :key="i"
                  :to="{
                    params: { gender: 'woman', product: i },
                    name: 'contentrender',
                  }"
                >
                  <v-list-item-title>{{ subitem }}</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-col>
          </v-row>
        </v-list>
      </v-menu>
      <v-spacer />
      <v-col cols="2">
        <v-text-field outlined hide-details label="Kereső"></v-text-field>
      </v-col>
      <v-btn text>Bejelentkezés</v-btn>
    </v-toolbar>
  </nav>
</template>

<script>
import { navcontent } from "../../navcontent";
export default {
  mixins: [navcontent],
};
</script>