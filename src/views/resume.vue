<template>
  <div>
    <Toolbar></Toolbar>

    <v-container fluid>
      <v-row align="center" justify="center" style="text-align: center">
        <v-col cols="0" md="2"></v-col>

        <!-- real Stuff -->
        <v-col
          cols="12"
          md="8"
          style="
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          "
        >
          <v-card class="mx-auto" max-width="100%" color="#c43b3b">
            <v-card-text>
              <v-row>
                <v-col>
                  <p style="font-size: 1em; font-weight: bold">PUBLIC KEY</p>
                  <p style="font-size: 1em; font-weight: bold">
                    <a style="color: #f1e5d7" @click="address(public_key)">
                      {{ public_key }}
                    </a>
                  </p>
                </v-col>
                <v-col>
                  <p style="font-size: 1em; font-weight: bold">NFTs COUNT</p>
                  <p style="font-size: 2em; font-weight: bold; color: #f1e5d7">
                    {{ items.length }}
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <br />

          <v-data-table
            dark
            style="background: black"
            v-if="items.length != 0"
            :headers="headers"
            :items="items"
            :page.sync="Page"
            :items-per-page="itemsPerPage"
            hide-default-footer
            class="elevation-1"
            @page-count="PageCount = $event"
          >
            <template v-slot:item.token_address="{ item }">
              <a
                style="font-weight: bold; color: #c43b3b"
                @click="address(item.token_address)"
              >
                {{ item.token_address }}
              </a>
            </template>

            <template v-slot:item.detail="{ item }">
              <v-icon @click="detail(item)"
                >mdi-account-supervisor-circle
              </v-icon>
            </template>
          </v-data-table>
        </v-col>

        <v-col cols="0" md="2"></v-col>
      </v-row>
    </v-container>

    <!-- dialog -->
    <v-dialog
      max-width="800px"
      v-model="dialog"
      content-class="vdialognew"
      v-if="activity != null"
    >
      <v-container fill-height fluid>
        <v-row align="center" justify="center" style="text-align: center">
          <v-col cols="12" style="padding: 0px">
            <v-img
              width="100vw"
              height="80vh"
              :src="require('@/assets/photo1.png')"
            >
              <div style="height: 80vh; background: rgb(0, 0, 0, 0.5)">
                <v-container fill-height fluid>
                  <v-row
                    align="center"
                    justify="center"
                    style="text-align: center"
                  >
                    <v-col cols="12">
                      <p style="font-size: 2em; color: white">
                        {{ activity.title }}
                      </p>
                      <p style="font-size: 1em; color: white">
                        {{
                          activity.start_date.slice(0, 10) +
                          " to " +
                          activity.end_date.slice(0, 10)
                        }}
                      </p>
                    </v-col>
                    <v-col cols="12">
                      <p
                        style="
                          font-size: 1em;
                          color: white;
                          white-space: pre-line;
                        "
                      >
                        {{ activity.content }}
                      </p>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </v-img>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
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
    items: [],

    headers: [
      {
        text: "TOKEN-ADDRESS",
        value: "token_address",
        align: "center",
        width: "50%",
      },
      {
        text: "ACTIVITY",
        value: "detail",
        align: "center",
        width: "50%",
      },
    ],

    // page-num
    PageCount: 0,
    Page: 1,

    itemsPerPage: 5,

    // dialog
    dialog: false,
    activity: null,
  }),
  methods: {
    async getPersonToken() {
      try {
        let config = {
          headers: {
            apikey: "handsomesongchieng",
          },
        };

        let r = await axios.get(
          this.API_PATH + "api/tokens_activity/participant/" + this.public_key,
          config
        );

        console.log(r.data.result);

        if (r.status == 200) {
          if (r.data.result.length > 0) {
            this.items = r.data.result;
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    address(url) {
      window.open(
        "https://explorer.solana.com/address/" + url + "?cluster=devnet",
        "_blank"
      );
    },
    async detail(item) {
      this.dialog = true;

      try {
        let config = {
          headers: {
            apikey: "handsomesongchieng",
          },
        };

        let r = await axios.get(
          this.API_PATH + "api/activity/" + item.activityId,
          config
        );

        console.log(r.data.result);

        if (r.status == 200) {
          if (r.data.result.length > 0) {
            this.activity = r.data.result[0];
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
  computed: {
    public_key() {
      const participant = this.$route.path.split("/");
      return participant[2];
    },
  },
};
</script>

<style>
</style>
