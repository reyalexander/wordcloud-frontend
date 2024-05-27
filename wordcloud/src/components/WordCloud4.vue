<template>
  <div id="wordcloud-container" class="wordcloud-wrapper"></div>
</template>

<script>
import axios from 'axios';
import * as ECharts from 'echarts';
import 'echarts-wordcloud';

export default {
  name: 'WordCloud',
  data() {
    return {
      data: [], // Inicialmente vacío, será llenado con la respuesta de la API
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get('http://127.0.0.1:8000/api/v1/answer/answer')
        .then(response => {
          const filteredData = response.data
            .filter(item => item.question_id === 1)
            .map(item => ({
              name: item.text_answer,
              value: item.value,
            }));
          
          this.data = filteredData;
          this.renderChart();
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    renderChart() {
      const container = document.getElementById('wordcloud-container');
      const chart = ECharts.init(container);

      chart.setOption({
        series: [
          {
            type: 'wordCloud',
            data: this.data,
            shape: 'circle',
            textStyle: {
              normal: {
                fontFamily: 'sans-serif',
                fontWeight: 'bold',
                color: function () {
                  return `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
                },
              },
              emphasis: {
                focus: 'self',
                textStyle: {
                  textShadowBlur: 10,
                  textShadowColor: '#333',
                },
              },
            },
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wordcloud-wrapper {
  height: 400px; /* Adjust height as needed */
}
</style>
