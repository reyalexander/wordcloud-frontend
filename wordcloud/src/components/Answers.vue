<template>
  <div class="container">
    <div class="details">
      <h2>{{ question.text_question }}</h2>
      <div id="wordcloud-container" class="wordcloud-wrapper"></div>
    </div>
    <div class="answers">
      <h2>Ingrese su respuesta(s):</h2>
      <div class="card">
        <input type="text" v-model="first_answer" placeholder="Ingresa una palabra">
        <input type="text" v-model="second_answer" placeholder="Ingresa otra palabra">
        <input type="text" v-model="third_answer" placeholder="Ingresa otra palabra">
        <button @click="send">Enviar</button>
      </div>
    </div>
  </div>
  
  <div id="popup" class="popup" v-if="dialog">
    <div class="popup-content">
      <span class="close" @click="closePopup">&times;</span>
      <p class="popup-message">Si deseas puedes volver a responder, en caso contrario</p>
      <p class="popup-message">¡Gracias por tu respuesta!</p>
      <div class="popup-buttons">
        <button class="popup-button" @click="resetForm">Volver a responder</button>
      </div>
    </div>
  </div>
  
  <p class="read-the-docs">Copyright © Camino21, 2024. Terms and Conditions. Notice of Privacy</p>
</template>

<script>
import axios from 'axios'
import * as ECharts from 'echarts'
import 'echarts-wordcloud'

export default {
  name: 'Answers',
  props: {
    questionId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      question: {},
      first_answer: '',
      second_answer: '',
      third_answer: '',
      dialog: false,
      chart: null  // Agregado para almacenar la instancia del gráfico
    }
  },
  created() {
    this.fetchQuestionDetails()
  },
  methods: {
    async fetchQuestionDetails() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/question/question/${this.questionId}`);
        this.question = response.data;
        this.renderWordcloud(); // Render the wordcloud with the answers of the question
      } catch (error) {
        console.error('Error fetching question details:', error);
      }
    },
    async send() {
      const answers = [
        this.first_answer && { text_answer: this.first_answer, question_id: this.questionId },
        this.second_answer && { text_answer: this.second_answer, question_id: this.questionId },
        this.third_answer && { text_answer: this.third_answer, question_id: this.questionId }
      ].filter(Boolean);  // Filtra las respuestas vacías

      if (answers.length === 0) {
        alert('Por favor ingresa al menos una respuesta.');
        return;
      }

      try {
        await axios.post('http://127.0.0.1:8000/api/v1/answer/answer/', answers);
        this.dialog = true; // Muestra el popup de agradecimiento
        await this.fetchQuestionDetails();  // Actualiza las respuestas al enviar
      } catch (error) {
        console.error('Error sending answers:', error);
      }
    },
    renderWordcloud() {
      const container = document.getElementById('wordcloud-container');

      // Verifica si hay una instancia del gráfico existente y destrúyela
      if (this.chart) {
        this.chart.dispose();
      }

      // Crea una nueva instancia del gráfico
      this.chart = ECharts.init(container);

      const wordcloudData = this.question.answers.map(answer => ({ name: answer.text_answer, value: answer.value }));

      this.chart.setOption({
        series: [{
          type: 'wordCloud',
          data: wordcloudData,
          shape: 'circle',
          textStyle: {
            normal: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              color: () => `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`
            },
            emphasis: {
              focus: 'self',
              textStyle: {
                textShadowBlur: 10,
                textShadowColor: '#333'
              }
            }
          }
        }]
      });
    },
    resetForm() {
      this.dialog = false;
      this.first_answer = '';
      this.second_answer = '';
      this.third_answer = '';
    },
    closePopup() {
      this.dialog = false;
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}

.details {
  flex: 1;
  margin-right: 20px;
}

.answers {
  flex: 1;
}

.card input {
  width: 300px;
  height: 20px;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-bottom: 20px;
  border: 1px solid #03A49D;
  border-radius: 8px;
  font-size: 15px;
}

.card button {
  width: 250px;
  font-weight: bolder;
  margin-left: auto;
  margin-right: auto;
  background-color: #03A49D;
  margin-bottom: 20px;
  border-radius: 8px;
}

.wordcloud-wrapper {
  height: 400px;
  width: 100%;
}

.popup {
  display: block; /* Initially hidden */
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.popup-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.popup-message {
  margin-top: 0;
}

.popup-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.popup-button {
  background-color: #03A49D;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
}
</style>
