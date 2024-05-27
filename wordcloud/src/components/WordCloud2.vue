<template>
  <div id="app">
    <wordcloud
      :data="defaultWords"
      :rotate="rotate"
      spiral="archimedean"
      nameKey="name"
      valueKey="value"
      :wordClick="wordClickHandler"
    ></wordcloud>
  </div>
</template>

<script>
import wordcloud from "vue-wordcloud";

export default {
  name: "WordCloud2",
  components: {
    wordcloud,
  },
  mounted() {
    this.wordClickHandler();
  },
  methods: {
    wordClickHandler(name, value) {
      name = this.name;
      value = this.value;
    },
  },
  data() {
    return {
      rotate: { from: 0, to: 0 },
      defaultWords: [
        {
          name: "Cat",
          value: 26,
        },
        {
          name: "fish",
          value: 19,
        },
        {
          name: "things",
          value: 20,
        },
        {
          name: "look",
          value: 4,
        },
        {
          name: "two",
          value: 15,
        },
        {
          name: "fun",
          value: 9,
        },
        {
          name: "know",
          value: 9,
        },
        {
          name: "good",
          value: 9,
        },
        {
          name: "play",
          value: 6,
        },
        { name: "Vue", value: 1000 },
        { name: "js", value: 200 },
        { name: "is", value: 800 },
        { name: "very cool", value: 10000 },
        { name: "Yes!", value: 1000 },
        { name: "Noo", value: 2000 },
        { name: "rollback", value: 3000 },
        { name: "Elon mask", value: 4000 },
        { name: "Hype", value: 5000 },
        { name: "Excellent", value: 728 },
        { name: "Excusive", value: 256 },
        { name: "Private", value: 1 },
        { name: "Seller", value: 2 },
        { name: "Nice!", value: 4 },
        { name: "Heart", value: 8 },
        { name: "Wicther3", value: 16 },
        { name: "Spiderman", value: 32 },
        { name: "See ya!", value: 64 },
        { name: "Attack!!", value: 128 },
        { name: "Oh my god!", value: 256 },
        { name: "Please", value: 512 },
        { name: "Gwent", value: 1024 },
        { name: "Tiss", value: 2048 },
        { name: "Yenifer", value: 4096 },
        { name: "Siri", value: 8192 },
        { name: "LOR", value: 16384 },
      ],
    };
  },
};
</script>


<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  border-bottom: 1px solid black;
}
td {
  border-bottom: 1px solid black;
}
.sub {
  position: absolute;
}
</style>
