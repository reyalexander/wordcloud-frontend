<template>
  <div>
    <div style="text-align: right;">
      <input style="width: 250px;" v-model="newQuestionText" placeholder="Ingresa una nueva pregunta" />
      <button @click="createQuestion" style="background-color: rgb(249, 136, 42);">
        <b>+</b> Crear Nueva Pregunta
      </button>
    </div>
    <div>
      <h2 style="text-align: center; color:#004eff ">Lista de Preguntas</h2>
    </div>
    <div v-for="question in questions" :key="question.id" class="question-card" @click="goToAnswers(question.id)">
      <h3>{{ question.text_question }}</h3>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  name: 'Questions',
  data() {
    return {
      questions: [],
      newQuestionText: ''
    }
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/question/question/')
        this.questions = response.data
      } catch (error) {
        console.error('Error fetching questions:', error)
      }
    },
    async createQuestion() {
      if (this.newQuestionText.trim() === '') {
        alert('Por favor, ingresa una pregunta.')
        return
      }

      try {
        const newQuestion = {
          text_question: this.newQuestionText
        }
        await axios.post('http://127.0.0.1:8000/api/v1/question/question/', newQuestion)
        this.newQuestionText = '' // Limpiar el cuadro de texto después de crear la pregunta
        this.fetchQuestions() // Actualiza la lista de preguntas
      } catch (error) {
        console.error('Error creating question:', error)
      }
    },
    goToAnswers(questionId) {
      this.$router.push({ name: 'answers', params: { questionId } }) // Redirige a la vista de respuestas con el ID de la pregunta
    }
  },
  mounted() {
    this.fetchQuestions()
  }
}
</script>

<style scoped>
.question-card {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-left: 150px;
  margin-right: 150px;
  cursor: pointer; /* Cambia el cursor al hacer hover sobre la tarjeta */
}

input {
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
