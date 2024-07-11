<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { userServices } from '../services/userServices.js';

const router = useRouter();
const _username = ref('');
const _password = ref('');

async function login_user() {
  const credentials = {
    username: _username.value,
    password: _password.value,
  };

  try {
    const response = await userServices.login(credentials);
    const token = response.data.token;
    console.log(response);

    // Después de iniciar sesión, obtener los detalles del usuario
    const userDetails = await userServices.getUserDetails(credentials.username, token);
    if (userDetails.data.is_admin) {
      router.push({ name: 'questions' });
    } else {
      alert('No tienes permiso para acceder a esta página.');
    }
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <h1>Word Cloud Camino21 Login Admin</h1>

  <div class="card">
    <input type="text" v-model="_username" placeholder="Ingrese Usuario">
    <input type="password" v-model="_password" placeholder="Ingresa Contraseña">
    <button v-on:click="login_user"> Continuar </button>
  </div>

  <p class="read-the-docs">Copyright © Camino21, 2024. Terms and Conditions. Notice of Privacy</p>
</template>

<style scoped>
h1 {
  margin-top: 0%;
  margin-bottom: 0%;
}

.read-the-docs {
  margin-top: 50px;
  color: #888;
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
  display: block;
}
</style>
