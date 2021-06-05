<template>
  <div :style="backgroundStyle">
    <v-card
      height="100vh"
      img="https://solana.com/static/af80cf3bd48b742194ce88fc8d64ae4c/89126/CoverTrans.avif"
    >
      <Toolbar></Toolbar>

      <v-container fluid>
        <v-row>
          <v-col cols="0" md="2"></v-col>

          <v-col cols="12" md="8" class="text-end" v-if="items.length != 0">
            <v-row :key="i" v-for="i in Math.ceil(items.length / 3)">
              <v-col cols="12" md="4" :key="j" v-for="j in 3" class="text-end">
                <div v-if="3 * i + j - 4 < items.length">
                  <!-- <v-container fill-height fluid>
                    <v-row
                      align="center"
                      justify="center"
                      style="text-align: center"
                    > -->
                  <strong style="color: white">{{
                    items[3 * i + j - 4].token_address
                  }}</strong>
                  <!-- </v-row>
                  </v-container> -->
                </div>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="0" md="2"></v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import Toolbar from "../components/toolbar.vue";

export default {
  name: "Home",

  components: {
    Toolbar,
  },
  data: () => ({
    //
    API_PATH: process.env.VUE_APP_PATH,
    //
    backgroundStyle: {
      backgroundColor: "black",
    },
    //
    items: [],
  }),
  methods: {
    async getPersonToken() {
      try {
        let participant = this.$route.path.split("/");
        let config = {
          headers: {
            apikey: "handsomesongchieng",
          },
        };

        console.log(participant[2]);

        let r = await axios.get(
          this.API_PATH + "api/tokens_activity/participant/" + participant[2],
          config
        );

        console.log(
          this.API_PATH + "api/tokens_activity/participant/" + participant[2]
        );
        console.log(r.data);

        if (r.status == 200) {
          if (r.data.result.length > 0) {
            this.items = r.data.result;
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  created: function () {
    this.getPersonToken();
  },
};
</script>

<style>
</style>
