<template>
  <div id="app">
    <section>
      <vue-horizontal-list :items="items" :options="options">
        <template v-slot:default="{ item }">
          <div class="item">
            <a v-bind:href="item.url" target="_blank">
              <v-img width="250%" height="150px" :src="item.url"></v-img
            ></a>
            <strong>{{ item.title }}</strong>
            <br />
            <span>{{ item.content }}</span>
          </div>
        </template>
      </vue-horizontal-list>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import VueHorizontalList from "@/components/vue-horizontal-list.vue";

export default Vue.extend({
  name: "ServeDev",
  components: {
    VueHorizontalList,
  },
  data() {
    return {
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
          start: 1,
        },
        autoplay: { play: false, repeat: true, speed: 2500 },
      },
      items: [
        {
          title: "GREENPEACE",
          content: "Plastic is a climate, health and social justice issue",
          url:
            "https://www.greenpeace.org/static/planet4-international-stateless/2018/10/130cf87e-gp0stshe9_medium_res.jpg",
        },
        {
          title: "International Labour Organization (ILO)",
          content:
            "ILO to release new analysis of labour market and social trends",
          url:
            "https://www.ilo.org/wcmsp5/groups/public/---dgreports/---dcomm/documents/image/wcms_793467.jpg",
        },
        {
          title: "Commission for Environmental Cooperation",
          content:
            "Webinar: New tools to prevent marine litter across North America",
          url:
            "http://www.cec.org/wp-content/uploads/cec_webinar_banner-02.jpg",
        },
        {
          title: "United Nations Global Compact (UNGC)",
          content: "Net Zero the Focus of Climate Breakthroughs Summit",
          url:
            "https://unfccc.int/sites/default/files/styles/hero_carousel_960x640/public/2021-05/shipping.jpg?itok=vqjjgW6F",
        },
        {
          title: "Aspen Institute",
          content: "Who’s Winning the Battle for Stakeholder Capitalism?",
          url:
            "https://www.aspeninstitute.org/wp-content/uploads/2020/08/Stakeholder-Card-Image.png",
        },
      ],
    };
  },
});
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

#app {
  max-width: 1400px;

  margin-left: auto;
  margin-right: auto;

  padding: 80px 24px;
}

@media (min-width: 1200px) {
  #app {
    padding-left: 80px;
    padding-right: 80px;
  }
}
</style>