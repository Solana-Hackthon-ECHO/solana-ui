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
            <v-card
              class="mx-auto"
              max-width="344"
              color="rgb(255,255,251,0.1)"
              dark
            >
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <!-- <v-select
                    :items="activities"
                    label="PLEASE ENTER ACTIVITIES"
                    v-model="activity"
                    :rules="Rules"
                    required
                    prepend-icon="mdi-map-marker-plus"
                  ></v-select> -->

                  <v-text-field
                    label="PLEASE ENTER TOPIC"
                    v-model="topic"
                    :rules="Rules"
                    required
                    prepend-icon="mdi-content-paste"
                  ></v-text-field>

                  <v-textarea
                    label="PLEASE ENTER CONTENT"
                    v-model="content"
                    :rules="Rules"
                    required
                    prepend-icon="mdi-table-of-contents"
                  ></v-textarea>
                </v-form>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn width="50%" outlined rounded @click="preview()">
                    PREVIEW
                  </v-btn>
                  <v-btn width="50%" outlined rounded @click="submit()">
                    SUBMIT
                  </v-btn>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col cols="0" md="2"></v-col>
        </v-row>
      </v-container>
    </v-card>

    <!-- dialog -->
    <v-dialog max-width="800px" v-model="dialog" content-class="vdialognew">
      <v-container fill-height fluid>
        <v-row align="center" justify="center" style="text-align: center">
          <v-col cols="12" style="padding: 0px">
            <v-card width="100vw" height="80vh" style="background: black">
              <div style="height: 80vh; background: rgb(0, 0, 0, 0.8)">
                <v-container fill-height fluid>
                  <v-row
                    align="center"
                    justify="center"
                    style="text-align: center"
                  >
                    <v-col cols="12">
                      <p style="font-size: 2em; color: white">
                        {{ topic }}
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
                        {{ content }}
                      </p>
                    </v-col>
                    <v-col cols="12">
                      <v-btn style="width: 50%; height: 45px" depressed>
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

    activities: ["test1", "test2", "test3"],
    activity: null,
    topic: null,
    content: null,

    valid: true,
    Rules: [(v) => !!v || "Data is required"],

    dialog: false,
  }),
  methods: {
    preview() {
      this.dialog = true;
    },
    async submit() {
      try {
        var date = new Date();

        // add a day
        date.setDate(date.getDate() + 1);

        let _d = {
          title: this.topic,
          content: this.content,
          start_date: new Date().toISOString().slice(0, 10),
          end_date: date.toISOString().slice(0, 10),
        };

        let config = {
          headers: {
            apikey: "handsomesongchieng",
          },
        };

        console.log(_d);

        let r = await axios.post(this.API_PATH + "api/activity", _d, config);
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
      } catch (e) {
        console.log(e);
      }
    },
  },
  created: function () {},
  watch: {},
};
</script>
