<template>
  <div :style="backgroundStyle">
    <v-card
      height="100vh"
      img="https://solana.com/static/af80cf3bd48b742194ce88fc8d64ae4c/89126/CoverTrans.avif"
    >
      <Toolbar></Toolbar>

      <v-container fluid>
        <v-row>
          <v-col cols="0" md="1"></v-col>

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
            <v-card
              class="mx-auto"
              max-width="100%"
              color="rgb(255,255,251,0.1)"
              dark
            >
              <v-card-text>
                <v-row>
                  <v-col>
                    <p class="text">Name</p>
                    <p class="focus">GREENHOPE</p>
                  </v-col>
                  <v-col>
                    <p class="text">Wallet Balance</p>
                    <p class="focus">{{ balance.toLocaleString() }}</p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <br />

            <v-card-text>
              <v-layout align-center justify-center>
                <v-row :key="i" v-for="i in Math.ceil(proofs.length / 3)">
                  <v-col cols="12" md="4" :key="j" v-for="j in 3">
                    <v-img
                      width="50vw"
                      :src="proofs[i * 3 - (3 - j) - 1].photo"
                    >
                    </v-img>
                  </v-col>
                </v-row>
              </v-layout>
            </v-card-text>
          </v-col>

          <v-col cols="0" md="1"></v-col>
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
    backgroundStyle: {
      backgroundColor: "black",
    },
    //
    balance: 0,
    // proofs
    proofs: [
      {
        topic: "test1",
        content: "content1",
        photo:
          "https://www.ilo.org/wcmsp5/groups/public/---dgreports/---dcomm/documents/image/wcms_793467.jpg",
      },
      {
        topic: "test2",
        content: "content2",
        photo:
          "https://www.ilo.org/wcmsp5/groups/public/---dgreports/---dcomm/documents/image/wcms_793467.jpg",
      },
      {
        topic: "test3",
        content: "content3",
        photo:
          "https://www.ilo.org/wcmsp5/groups/public/---dgreports/---dcomm/documents/image/wcms_793467.jpg",
      },
    ],
  }),
  methods: {
    async getBalance() {
      try {
        const r = await axios.post(
          "http://devnet.solana.com",
          {
            jsonrpc: "2.0",
            id: 1,
            method: "getBalance",
            params: ["8TYFkKF8tZ5iPhWKuZsqnUsh5SAayDv22M4exd9FqeRg"],
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        if (r.status == 200) {
          this.balance = r.data.result.value;
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
  created: function () {
    this.getBalance();
  },
};
</script>

<style>
.focus {
  color: palevioletred;
  font-size: 2em;
  font-weight: bold;
}

.text {
  color: white;
  font-size: 1.2em;
}
</style>
