<template>
  <div :style="backgroundStyle">
    <v-card
      img="https://solana.com/static/af80cf3bd48b742194ce88fc8d64ae4c/89126/CoverTrans.avif"
    >
      <Toolbar></Toolbar>

      <v-container fluid>
        <v-row>
          <v-col cols="0" md="2"></v-col>

          <!-- real Stuff -->
          <v-col cols="12" md="8" class="text-end" v-if="items.length != 0">
            <v-row :key="i" v-for="i in Math.ceil(items.length / 3)">
              <v-col cols="12" md="4" :key="j" v-for="j in 3" class="text-end">
                <div v-if="3 * i + j - 4 < items.length">
                  <a @click="preview(items[3 * i + j - 4].id)">
                    <div
                      align="center"
                      justify="center"
                      style="
                        width: 100%;
                        height: 150px;
                        background: rgba(0, 0, 0, 0.5);
                        text-align: center;
                      "
                    ></div>
                  </a>
                  <strong style="color: white">{{
                    items[3 * i + j - 4].title
                  }}</strong>
                  <br />
                  <span style="color: white">{{
                    items[3 * i + j - 4].content
                  }}</span>
                </div>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="0" md="2"></v-col>
        </v-row>
      </v-container>
    </v-card>

    <!-- dialog -->
    <v-dialog max-width="800px" v-model="dialog" content-class="vdialognew">
      <v-card width="100vw" height="85vh" color="rgb(0,0,0,1)" dark>
        <v-container>
          <div v-if="preview_participant != null">
            <v-card-title>
              PARTICIPANT <v-spacer></v-spacer>
              <v-text-field
                v-model="search_item"
                append-icon="mdi-magnify"
                label="SEARCH"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>

            <br />

            <v-data-table
              :search="search_item"
              :headers="headers"
              :items="preview_participant"
              :page.sync="Page"
              :items-per-page="itemsPerPage"
              hide-default-footer
              class="elevation-1"
              @page-count="PageCount = $event"
            >
              <template v-slot:item.sent="{ item }">
                <div v-if="item.sent === false">
                  <v-btn outlined rounded @click="send(item)">
                    <span>SEND NTF TOKEN </span>
                  </v-btn>
                </div>
                <div v-else>
                  <span style="color: green; font-weight: bold">SENT</span>
                </div>
              </template>
            </v-data-table>

            <br />

            <div class="text-center pt-2">
              <v-pagination v-model="Page" :length="PageCount"></v-pagination>
            </div>
          </div>
          <div v-else>{{ "NO DATA NOW..." }}</div>
        </v-container>
      </v-card>
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

    backgroundStyle: {
      backgroundColor: "black",
    },

    items: [],

    dialog: false,
    preview_participant: null,
    id: null,
    search_item: "",
    // table
    headers: [
      {
        text: "PUCLIC-KEY",
        value: "participant_address",
        align: "center",
        width: "50%",
      },
      { text: "SENT-TOKEN", value: "sent", align: "center", width: "50%" },
    ],

    // page-num
    PageCount: 0,
    Page: 1,

    itemsPerPage: 5,
  }),
  methods: {
    async getActivities() {
      try {
        let config = {
          headers: {
            apikey: "handsomesongchieng",
          },
        };

        let r = await axios.get(this.API_PATH + "api/activities", config);
        if (r.status == 200) {
          if (r.data.result.length > 0) {
            this.items = r.data.result;
          }
        }

        console.log(this.items);
      } catch (e) {
        console.log(e);
      }
    },
    async preview(id) {
      this.dialog = true;
      this.id = id;

      try {
        let config = {
          headers: {
            apikey: "handsomesongchieng",
          },
        };

        let r = await axios.get(
          this.API_PATH + "api/participants/activity/" + id,
          config
        );
        console.log(r.data.result);

        if (r.status == 200) {
          if (r.data.result.length > 0) {
            this.preview_participant = r.data.result;
          }
        }
      } catch (e) {
        console.log(e);
      }

      // this.preview_participant = [
      //   { participant_address: "public-key1", sent: false },
      //   { participant_address: "public-key2", sent: false },
      //   { participant_address: "public-key3", sent: true },
      //   { participant_address: "public-key3", sent: true },
      //   { participant_address: "public-key3", sent: false },
      //   { participant_address: "public-key3", sent: false },
      // ];
    },
    send(item) {
      try {
        let _d = {
          activityId: this.id,
          token_address: item.token_address,
        };

        let config = {
          method: "post",
          data: _d,
          url: "https://solana-hackthon-api.herokuapp.com/api/tokens_activity",
          headers: {
            apikey: "handsomesongchieng",
          },
        };

        axios(config)
          .then(function (r) {
            if (r.status == 200) {
              this.$swal({
                icon: "success",
                title: "SUCCESS",
              }).then((result) => {
                if (result.isConfirmed) {
                  this.$router.go();
                }
              });
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
  created: function () {
    this.getActivities();
  },
  watch: {},
};
</script>
