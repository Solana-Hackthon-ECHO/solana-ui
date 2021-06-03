<template>
  <div>
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

      <v-spacer></v-spacer>
      <v-btn plain text @click="render('manage')">
        <span>Lists of Activity </span>
      </v-btn>
      <v-btn plain text @click="render('create')">
        <span>Create Activities</span>
      </v-btn>
      <v-btn plain text @click="render('')">
        <span>Connect Wallet</span>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: "toolbar",

  data: () => ({}),
  methods: {
    render(path_url) {
      console.log(path_url);
      this.$router.push({ name: path_url });
    },
  },
  created: function () {},
};
</script>
