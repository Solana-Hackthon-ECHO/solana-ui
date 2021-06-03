<template>
  <div id="app">
    <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      chips
      clearable
      hide-details
      hide-selected
      item-text="name"
      item-value="symbol"
      label="Search for a company..."
      solo
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            Search for the company
            <strong>CSResume</strong>
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
          <span v-text="item.name"></span>
        </v-chip>
      </template>
      <template v-slot:item="{ item }">
        <v-list-item-avatar
          color="indigo"
          class="headline font-weight-light white--text"
        >
          {{ item.name.charAt(0) }}
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-file-account</v-icon>
        </v-list-item-action>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "Autocomplete",
  components: {},
  data() {
    return {
      isLoading: false,
      items: [],
      model: null,
      search: null,
    };
  },
  watch: {
    search() {
      // Items have already been loaded
      if (this.items.length > 0) return;

      this.isLoading = true;

      // // Lazily load input items
      // fetch("https://api.coingecko.com/api/v3/coins/list")
      //   .then((res) => res.clone().json())
      //   .then((res) => {
      //     console.log(res);
      this.items = [
        { name: "市民永續" },
        { name: "市民永續2" },
        { name: "市民永續3" },
      ];
      this.isLoading = false;

      // })
      // .catch((err) => {
      //   console.log(err);
      // })
      // .finally(() => (this.isLoading = false));
    },
  },
});
</script>

<style>
</style>