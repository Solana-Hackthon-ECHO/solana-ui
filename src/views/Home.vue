<template>
  <div :style="backgroundStyle">
    <v-card
      height="100vh"
      img="https://solana.com/static/af80cf3bd48b742194ce88fc8d64ae4c/89126/CoverTrans.avif"
    >
      <v-toolbar class="elevation-0" color="rgb(255,255,255,0)" dark>
        <a @click="render('Home')">
          <v-img
            class="mx-2"
            src="@/assets/logo.svg"
            max-height="120"
            max-width="150"
            contain
          ></v-img>
        </a>
      </v-toolbar>

      <v-container fill-height fluid>
        <v-row>
          <v-col cols="0" md="2"></v-col>

          <!-- real Stuff -->
          <v-col cols="12" md="4" class="text-end">
            <v-card
              class="mx-auto"
              max-width="344"
              color="rgb(255,255,251,0.1)"
              dark
            >
              <v-card-text>
                <p class="focus">{{ transactionCount.toLocaleString() }}</p>
                <p class="text">Transaction Count</p>

                <br /><br />

                <p class="focus">{{ balance.toLocaleString() }}</p>
                <p class="text">Wallet Balance</p>

                <br /><br />

                <p class="focus">{{ fees.toLocaleString() }}</p>
                <p class="text">Fees</p>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- 介紹 -->
          <v-col cols="12" md="4" class="text-start">
            <h1 class="display-2 font-weight-bold mb-3" style="color: white">
              Build Crypto Apps that Scale
            </h1>

            <p class="subheading font-weight-regular" style="color: white">
              Solana is a fast, secure, and censorship resistant
              <br />blockchain providing the open infrastructure required for
              <a href="https://community.vuetifyjs.com" target="_blank"
                >global adoption.</a
              >
            </p>

            <v-btn class="ma-1" color="#e03c8a" outlined plain @click="getData">
              CHECK
            </v-btn>
          </v-col>

          <v-col cols="0" md="2"></v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import anime from "animejs";

export default {
  name: "Home",

  components: {},
  data: () => ({
    //
    backgroundStyle: {
      backgroundColor: "black",
    },
    //
    transactionCount: 0,
    balance: 0,
    fees: 0,
  }),
  methods: {
    render(path_url) {
      console.log(path_url);
      this.$router.push({ name: path_url });
    },

    async getTransactionCount() {
      try {
        const r = await axios.post(
          "http://devnet.solana.com",
          {
            jsonrpc: "2.0",
            id: 1,
            method: "getTransactionCount",
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        console.log(r);

        if (r.status == 200) {
          this.setCount(r.data.result, this.transactionCount);
          this.transactionCount = r.data.result;
        }
      } catch (e) {
        console.log(e);
      }
    },

    async getBalance() {
      try {
        const r = await axios.post(
          "http://devnet.solana.com",
          {
            jsonrpc: "2.0",
            id: 1,
            method: "getBalance",
            params: [""],
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

    async getFees() {
      try {
        const r = await axios.post(
          "http://devnet.solana.com",
          {
            jsonrpc: "2.0",
            id: 1,
            method: "getFees",
          },
          {
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        console.log(r);

        if (r.status == 200) {
          this.fees = r.data.result.value.feeCalculator.lamportsPerSignature;
        }
      } catch (e) {
        console.log(e);
      }
    },
    getData() {
      this.getBalance();
      this.getFees();
    },

    // num
    setCount(val, count) {
      const obj = { n: count };
      anime({
        targets: obj,
        n: val,
        round: 1,
        duration: 1500,
        easing: "linear",
        update: () => {
          this.transactionCount = obj.n;
        },
      });
    },
  },
  created: function () {
    let vm = this;
    vm.getTransactionCount();

    setInterval(function () {
      vm.getTransactionCount();
    }, 5000);
  },
};
</script>

<style>
.focus {
  color: #6a8372;
  font-size: 2em;
  font-weight: bold;
}

.text {
  color: white;
  font-size: 1.2em;
}
</style>
