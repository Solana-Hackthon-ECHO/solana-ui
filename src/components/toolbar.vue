<template>
  <div>
    <v-toolbar class="elevation-0" color="rgb(255,255,255,0)">
      <a @click="render('Home')">
        <v-img
          class="mx-2"
          src="@/assets/logo.png"
          max-height="120"
          max-width="150"
          contain
        ></v-img>
      </a>

      <v-spacer></v-spacer>
      <v-btn plain text @click="render('manage')">
        <span>Lists of Activity </span>
      </v-btn>
      <v-btn plain text @click="render('create')">
        <span>Create Activities</span>
      </v-btn>
      <v-btn plain text @click="getProvider">
        <span>{{ isConnected ? "Wallet Connected" : "Connect Wallet" }}</span>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "toolbar",

  data: () => ({
    isConnected: false,
  }),
  methods: {
    render(path_url) {
      console.log(path_url);
      this.$router.push({ name: path_url });
    },
    async getProvider() {
      if (window.solana) {
        const vm = this;
        if (window.solana.isPhantom) {
          window.solana.on("connect", async () => {
            console.log(
              "Connected to wallet " + window.solana.publicKey.toBase58()
            );
            vm.isConnected = true;
            vm.$store.commit(
              "setWalletPubKey",
              window.solana.publicKey.toBase58()
            );
          });
          window.solana.on("disconnect", () => {
            console.log("Disconnected from wallet");
            vm.isConnected = false;
          });
          // try to eagerly connect
          window.solana.connect(/**{ onlyIfTrusted: true }**/);
          return () => {
            window.solana.disconnect();
          };
        }
      } else {
        this.$swal({
          icon: "error",
          title: "PLEASE INSTALL PHANTOM",
        }).then((result) => {
          if (result.isConfirmed) {
            window.open("https://phantom.app/");
          }
        });
      }
    },
  },
  created: function () {},
};
</script>
