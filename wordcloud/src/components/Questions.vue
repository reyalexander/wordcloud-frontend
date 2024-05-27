<template>
  <div>
    <h1>Lista de Preguntas</h1>
    <div v-for="question in questions" :key="question.id" class="question-card" @click="goToAnswers(question.id)">
      <h2>{{ question.text_question }}</h2>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default {
  name: 'Questions',
  data() {
    return {
      questions: []
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
  cursor: pointer; /* Cambia el cursor al hacer hover sobre la tarjeta */
}
</style>
