<template>
  <div class="container">
    <div class="details">
      <h2>{{ question.text_question }}</h2>
      <div v-if="question.answers && question.answers.length">
        <h3>Respuestas:</h3>
        <ul class="answers-list">
          <li v-for="answer in question.answers" :key="answer.id">
            {{ answer.text_answer }} (Valor: {{ answer.value }})
          </li>
        </ul>
      </div>
      <div v-else>
        <p>No hay respuestas disponibles para esta pregunta.</p>
      </div>
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
  <div id="wordcloud-container" class="wordcloud-wrapper"></div>
  <p class="read-the-docs">Copyright © Camino21, 2024. Terms and Conditions. Notice of Privacy</p>
</template>

<script>
import axios from 'axios'
import * as ECharts from 'echarts'
import 'echarts-wordcloud'

export default {
  name: 'Answers',
  data() {
    return {
      question: {},
      first_answer: '',
      second_answer: '',
      third_answer: '',
      wordcloudData: [],
      dialog: false
    }
  },
  created() {
    this.fetchQuestionDetails()
  },
  methods: {
    async fetchQuestionDetails() {
      const questionId = this.$route.params.questionId
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/question/question/${questionId}`)
        this.question = response.data
      } catch (error) {
        console.error('Error fetching question details:', error)
      }
    },
    async send() {
      const questionId = this.$route.params.questionId
      const answers = [
        this.first_answer && { text_answer: this.first_answer, question_id: questionId },
        this.second_answer && { text_answer: this.second_answer, question_id: questionId },
        this.third_answer && { text_answer: this.third_answer, question_id: questionId }
      ].filter(Boolean)  // Filtra las respuestas vacías

      if (answers.length === 0) {
        alert('Por favor ingresa al menos una respuesta.')
        return
      }

      try {
        await axios.post('http://127.0.0.1:8000/api/v1/answer/answer/', answers)
        this.dialog = true // Muestra el popup de agradecimiento
        await this.fetchQuestionDetails()  // Actualiza las respuestas al enviar
        await this.fetchWordcloudData()    // Actualiza la nube de palabras
      } catch (error) {
        console.error('Error sending answers:', error)
      }
    },
    async fetchWordcloudData() {
      const questionId = this.$route.params.questionId
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/answer/answer/?question_id=${questionId}`)
        this.wordcloudData = response.data
        this.renderWordcloud()
      } catch (error) {
        console.error('Error fetching wordcloud data:', error)
      }
    },
    renderWordcloud() {
      const container = document.getElementById('wordcloud-container')
      const chart = ECharts.init(container)

      chart.setOption({
        series: [{
          type: 'wordCloud',
          data: this.wordcloudData.map(answer => ({ name: answer.text_answer, value: answer.value })),
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
      })
    },
    resetForm() {
      this.dialog = false
      this.first_answer = ''
      this.second_answer = ''
      this.third_answer = ''
    },
    goBack() {
      this.$router.push({ name: 'questions' })
    }
  }
}
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
}

.answers-list {
  list-style-type: none;
  padding-left: 0;
  margin-top: 10px;
}

.answers-list li {
  margin-bottom: 5px;
}
</style>