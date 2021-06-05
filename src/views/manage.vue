<template>
  <div>
    <Toolbar></Toolbar>

    <v-container fluid>
      <v-row>
        <v-col cols="0" md="2"></v-col>

        <!-- real Stuff -->
        <v-col cols="12" md="8" class="text-end" v-if="items.length != 0">
          <v-row :key="i" v-for="i in Math.ceil(items.length / 3)">
            <v-col cols="12" md="4" :key="j" v-for="j in 3" class="text-end">
              <div v-if="3 * i + j - 4 < items.length">
                <a @click="preview(items[3 * i + j - 4])">
                  <v-img
                    :src="items[3 * i + j - 4].photo"
                    width="100%"
                    height="150px"
                  ></v-img>
                </a>
                <strong style="color: black">{{
                  items[3 * i + j - 4].title
                }}</strong>
              </div>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="0" md="2"></v-col>
      </v-row>
    </v-container>

    <!-- dialog -->
    <v-dialog max-width="800px" v-model="dialog" content-class="vdialognew">
      <v-img
        v-if="activity != null"
        width="100vw"
        height="80vh"
        :src="activity.photo"
      >
        <div style="height: 80vh; background: rgb(0, 0, 0, 0.5)">
          <v-container>
            <div v-if="preview_participant != null">
              <v-card-title style="color: white">
                <span>PARTICIPANT</span>
                <v-spacer></v-spacer>
                <v-text-field
                  dark
                  v-model="search_item"
                  append-icon="mdi-magnify"
                  label="SEARCH"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>

              <br />

              <v-data-table
                style="background: rgb(255, 255, 251, 0.85)"
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
                  <div v-if="item.token_address.length === 0">
                    <v-btn outlined rounded @click="send(item)">
                      <span>SEND NTF TOKEN </span>
                    </v-btn>
                  </div>
                  <div v-else>
                    <v-icon style="color: #c43b3b"
                      >mdi-check-underline-circle
                    </v-icon>
                  </div>
                </template>
              </v-data-table>

              <br />

              <div class="text-center pt-2">
                <v-pagination
                  v-model="Page"
                  :length="PageCount"
                  color="#c43b3b"
                ></v-pagination>
              </div>
            </div>
            <div v-else>
              <span style="color: white; text-align: center"
                >NO DATA NOW...</span
              >
            </div>
          </v-container>
        </div>
      </v-img>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Toolbar from "../components/toolbar.vue";
import { createToken } from "@/common/spl-token.js";

export default {
  name: "Home",

  components: {
    Toolbar,
  },
  data: () => ({
    //
    API_PATH: process.env.VUE_APP_PATH,

    items: [],

    dialog: false,
    preview_participant: null,
    activity: null,
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
            for (let i = 0; i < this.items.length; i++) {
              if (i % 3 === 0) {
                this.items[i].photo = require("@/assets/photo1.png");
              } else if (i % 3 === 1) {
                this.items[i].photo = require("@/assets/photo2.png");
              } else {
                this.items[i].photo = require("@/assets/photo3.png");
              }
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    },
    async preview(item) {
      this.dialog = true;
      this.activity = item;
      this.preview_participant = null;

      console.log(this.activity);

      try {
        let config = {
          headers: {
            apikey: "handsomesongchieng",
          },
        };

        let r = await axios.get(
          this.API_PATH + "api/participants/activity/" + item.id,
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
    },
    async send(item) {
      try {
        let token = await createToken(
          "B9kLd4QqKYPH7CkVvknFMqBUURPB9KfxNMFsx7ywC11S"
        );
        console.log(token);

        let _d = {
          activityId: item.activityId,
          token_address: token,
          participant_address: item.participant_address,
        };

        let config = {
          headers: {
            apikey: "handsomesongchieng",
          },
        };

        console.log(_d);

        let r = await axios.post(
          this.API_PATH + "api/tokens_activity",
          _d,
          config
        );
        if (r.status == 200) {
          this.$swal({
            icon: "success",
            title: "更新成功",
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.go();
            }
          });
        }
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
