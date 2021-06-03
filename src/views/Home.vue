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

          <!-- real Stuff -->
          <v-col
            cols="12"
            md="8"
            class="text-end"
            style="
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            "
          >
            <section>
              <vue-horizontal-list :items="items" :options="options">
                <template v-slot:default="{ item }">
                  <div class="item">
                    <a @click="preview(item)">
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
                      <!-- <v-img
                        src="@/assets/logo.svg"
                        width="100%;"
                        height="150px;"
                      ></v-img> -->
                    </a>
                    <strong style="color: white">{{ item.title }}</strong>
                    <br />
                    <span style="color: white">{{
                      "END DATE " + item.end_date.slice(0, 10),
                    }}</span>
                  </div>
                </template>
              </vue-horizontal-list>
            </section>

            <br /><br />

            <v-row>
              <v-col cols="12" md="10">
                <v-autocomplete
                  v-model="model"
                  :items="search_items"
                  :loading="isLoading"
                  :search-input.sync="search"
                  chips
                  clearable
                  hide-details
                  hide-selected
                  item-text="participant_address"
                  item-value="symbol"
                  label="Search for a resume..."
                  solo
                  style="height: 45px"
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>
                        Search for the
                        <strong>Resume</strong>
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ attr, on, item, selected }">
                    <v-chip
                      v-bind="attr"
                      :input-value="selected"
                      color="blue-grey"
                      class="white--text"
                      v-on="on"
                    >
                      <v-icon left> mdi-file-account </v-icon>
                      <span v-text="item.participant_address"></span>
                    </v-chip>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-list-item-avatar
                      color="indigo"
                      class="headline font-weight-light white--text"
                    >
                      {{ item.participant_address.charAt(0) }}
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.participant_address"
                      ></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-icon>mdi-file-account</v-icon>
                    </v-list-item-action>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" md="2">
                <v-btn
                  style="height: 45px; color: white"
                  width="100%"
                  outlined
                  @click="submit(model)"
                >
                  <span>SUBMIT</span>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="0" md="2"></v-col>
        </v-row>
      </v-container>
    </v-card>

    <!-- dialog -->
    <v-dialog
      max-width="800px"
      v-model="dialog"
      content-class="vdialognew"
      v-if="preview_activity != null"
    >
      <v-container fill-height fluid>
        <v-row align="center" justify="center" style="text-align: center">
          <v-col cols="12" style="padding: 0px">
            <v-card width="100vw" height="80vh" style="background: black">
              <div style="height: 80vh; background: rgb(0, 0, 0, 0.5)">
                <v-container fill-height fluid>
                  <v-row
                    align="center"
                    justify="center"
                    style="text-align: center"
                  >
                    <v-col cols="12">
                      <p style="font-size: 2em; color: white">
                        {{ preview_activity.title }}
                      </p>
                      <p style="font-size: 1em; color: white">
                        {{
                          preview_activity.start_date.slice(0, 10) +
                          " to " +
                          preview_activity.end_date.slice(0, 10)
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
                        {{ preview_activity.content }}
                      </p>
                    </v-col>
                    <v-col cols="12">
                      <v-btn
                        style="width: 50%; height: 45px"
                        depressed
                        @click="join()"
                      >
                        <span>JOIN</span>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import VueHorizontalList from "@/components/vue-horizontal-list.vue";
import Toolbar from "../components/toolbar.vue";

export default {
  name: "Home",

  components: {
    VueHorizontalList,
    Toolbar,
  },
  data: () => ({
    //
    API_PATH: process.env.VUE_APP_PATH,
    //
    backgroundStyle: {
      backgroundColor: "black",
    },
    // activities
    options: {
      responsive: [
        { end: 576, size: 1 },
        { start: 576, end: 768, size: 2 },
        { start: 768, end: 992, size: 3 },
        { size: 4 },
      ],
      list: {
        // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
        windowed: 1200,

        // Because: #app {padding: 80px 24px;}
        padding: 24,
      },
      position: {
        start: 0,
      },
      autoplay: { play: false, repeat: true, speed: 2500 },
    },
    items: [],

    // search
    isLoading: false,
    search_items: [],
    model: null,
    search: null,

    // dialog
    dialog: false,
    preview_activity: null,
  }),
  methods: {
    render(path_url) {
      console.log(path_url);
      this.$router.push({ name: path_url });
    },
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

    preview(item) {
      this.dialog = true;
      console.log(item);
      this.preview_activity = item;
    },
    join() {
      alert("SEND YOUR PUBLIC KEY TO ME");
    },
    submit(model) {
      if (model !== null) {
        alert("GET " + model + "'s RESUME");
        this.$router.push({ name: "resume" });
      } else {
        alert("FUCK OFF");
      }
    },
  },
  created: function () {
    this.getActivities();
  },
  watch: {
    async search() {
      // Items have already been loaded
      if (this.search_items.length > 0) return;

      this.isLoading = true;

      try {
        let config = {
          headers: {
            apikey: "handsomesongchieng",
          },
        };

        let r = await axios.get(this.API_PATH + "api/participants", config);
        if (r.status == 200) {
          if (r.data.result.length > 0) {
            this.search_items = r.data.result;
            // Object.values(list).map(item => item.name);
            this.isLoading = false;
          }
        }

        console.log(this.items);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
