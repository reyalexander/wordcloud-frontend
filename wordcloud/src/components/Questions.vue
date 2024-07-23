<template>
  <div>
    <div style="text-align: right;">
      <input style="width: 250px;" v-model="newQuestionText" placeholder="Ingresa una nueva pregunta" />
      <button @click="createQuestion" style="background-color: rgb(249, 136, 42);">
        <b>+</b> Crear Nueva Pregunta
      </button>
    </div>
    <div>
      <h2 style="text-align: center; color:#004eff">Lista de Preguntas</h2>
    </div>
    <div v-for="question in questions" :key="question.id" class="question-card">
      <div class="question-content">
        <h3>{{ question.text_question }}</h3>
        <div class="action-buttons">
          <button @click="viewDetails(question)" class="details-button">
            Detalles
          </button>
          <button @click="editQuestion(question)" class="edit-button">
            Editar
          </button>
          <button @click="deleteQuestion(question.id)" class="delete-button">
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <div v-if="selectedQuestion" class="modal-overlay" @click.self="closeDetails">
      <div class="modal">
        <h2>Detalles de la Pregunta</h2>
        <p><strong>Pregunta:</strong> {{ selectedQuestion.text_question }}</p>
        <p><strong>Código Único:</strong> {{ selectedQuestion.unique_code }}</p>
        <qrcode-vue :value="generateQRCodeURL(selectedQuestion.unique_code)" size="200"></qrcode-vue>
        <div>
          <br>
          <button @click="closeDetails">Cerrar</button>
        </div>
      </div>
    </div>

    <div v-if="editingQuestion" class="modal-overlay" @click.self="cancelEdit">
      <div class="modal">
        <h2>Editar Pregunta</h2>
        <input style="width: 800px;" v-model="editingQuestion.text_question" />
        <button @click="updateQuestion">Guardar</button>
        <button @click="cancelEdit">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import QrcodeVue from 'qrcode.vue';

export default {
  name: 'Questions',
  components: {
    QrcodeVue
  },
  data() {
    return {
      questions: [],
      newQuestionText: '',
      selectedQuestion: null,
      editingQuestion: null
    }
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/question/question/');
        this.questions = response.data;
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    },
    async createQuestion() {
      if (this.newQuestionText.trim() === '') {
        alert('Por favor, ingresa una pregunta.');
        return;
      }

      try {
        const newQuestion = {
          text_question: this.newQuestionText
        };
        await axios.post('http://127.0.0.1:8000/api/v1/question/question/', newQuestion);
        this.newQuestionText = ''; // Limpiar el cuadro de texto después de crear la pregunta
        this.fetchQuestions(); // Actualiza la lista de preguntas
      } catch (error) {
        console.error('Error creating question:', error);
      }
    },
    viewDetails(question) {
      this.selectedQuestion = question;
    },
    closeDetails() {
      this.selectedQuestion = null;
    },
    editQuestion(question) {
      this.editingQuestion = { ...question };
    },
    cancelEdit() {
      this.editingQuestion = null;
    },
    async updateQuestion() {
      if (!this.editingQuestion) return;

      try {
        await axios.put(`http://127.0.0.1:8000/api/v1/question/question/${this.editingQuestion.id}/`, this.editingQuestion);
        this.editingQuestion = null;
        this.fetchQuestions(); // Actualiza la lista de preguntas
      } catch (error) {
        console.error('Error updating question:', error);
      }
    },
    async deleteQuestion(questionId) {
      const confirmDelete = confirm('¿Estás seguro de que quieres eliminar esta pregunta?');
      if (!confirmDelete) return;

      try {
        await axios.delete(`http://127.0.0.1:8000/api/v1/question/question/${questionId}/`);
        this.fetchQuestions(); // Actualiza la lista de preguntas
      } catch (error) {
        console.error('Error deleting question:', error);
      }
    },
    generateQRCodeURL(unique_code) {
      const baseURL = window.location.origin;
      return `${baseURL}/answers-by-code/${unique_code}`;
    },
    goToAnswers(questionId) {
      this.$router.push({ name: 'answers', params: { questionId } }); // Redirige a la vista de respuestas con el ID de la pregunta
    }
  },
  mounted() {
    this.fetchQuestions();
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.question-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

.details-button{
  margin-left: 20 px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
.edit-button{
  
  padding: 5px 10px;
  border: none;
  background-color: #f9882a;
  color: white;
  border-radius: 4px;
  cursor: pointer;

}
.delete-button {
  padding: 5px 10px;
  border: none;
  background-color: #ff0000;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.details-button:hover {
  background-color: #0056b3;
}

.edit-button:hover {
  background-color: #ffc107;
}

.delete-button:hover {
  background-color: #dc3545;
}

input {
  margin-right: 10px;
  padding: 5px;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 5px 10px;
  margin-left: 5px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.qrcode-vue {
  margin: 20px auto;
}
</style>
