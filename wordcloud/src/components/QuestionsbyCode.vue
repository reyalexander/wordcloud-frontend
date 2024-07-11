<template>
  <div class="card">
    <input v-model="uniqueCode" placeholder="Ingresar el codigo" />
    <button @click="fetchQuestion">Ir a la pregunta</button>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      uniqueCode: '',
      errorMessage: '',
    };
  },
  methods: {
    async fetchQuestion() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/question/questions/by-code/${this.uniqueCode}/`);
        if (!response.data || !response.data.id) {
          throw new Error('Question not found');
        }
        const questionId = response.data.id;
        this.goToAnswers(questionId)
      } catch (error) {
        this.errorMessage = 'El codigo que usted ingreso no existe!'
        console.error(error);
      }
    },
    goToAnswers(questionId) {
      this.$router.push({ name: 'answers', params: { questionId } }) // Redirige a la vista de respuestas con el ID de la pregunta
    }
  },
};
</script>

<style>

.card{
  padding-bottom: 15em;
}
.card input {
  width: 300px;
  height: 20px;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-bottom: 10px;
  border: 1px solid #03A49D;
  border-radius: 8px;
  font-size: 15px;
  font-size: 30px;
}

.card button {
  width: 250px;
  font-weight: bolder;
  margin-left: auto;
  margin-right: auto;
  background-color: #03A49D;
  margin-bottom: 20px;
  border-radius: 8px;
  display: block;
}
</style>
