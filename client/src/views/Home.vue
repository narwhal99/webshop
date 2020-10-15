<template>
  <v-container>
    <v-col>
      <v-row justify="center">
        <h1>Üdvözöllek a weblapon</h1>
      </v-row>
    </v-col>
    <v-dialog>
      <template v-slot:activator="{ on }">
        <v-card v-on="on">
          <v-img
            contain
            height="15vh"
            src="http://192.168.1.152:8085/images/03.jpg"
          ></v-img
        ></v-card>
      </template>
      <v-container>
        <v-img
          contain
          height="15vh"
          src="http://192.168.1.152:8085/images/01.jpg"
        ></v-img>
      </v-container>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      test: true,
    };
  },
};
</script>
