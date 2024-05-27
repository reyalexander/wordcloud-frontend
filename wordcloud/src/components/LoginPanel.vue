<script setup>
import { ref } from 'vue'
import { useRouter } from "vue-router";
import { userServices } from '../services/userServices.js'


const router = useRouter();
const _firstname = ref("")
const _lastname = ref("")

async function login() {
  
  const credentials = {
    first_name: _firstname.value,
    last_name: _lastname.value,
  };
  try {
    const response = await userServices.addUser(credentials);
    console.log(response)
    router.push({name:"questions"});
  } catch (error) {
    console.log(error)
  }
}

async function skip() {
  
  router.push({name:"questions"});
}

</script>

<template>
  <h1>Word Cloud Camino21 Login</h1>

  <div class="card">
    <input type="text" v-model="_firstname" placeholder="Ingresa tus nombres">
    <input type="text" v-model="_lastname" placeholder="Ingresa tus apellidos">
    <button v-on:click="login"> Continuar </button>
    <button v-on:click="skip" style="background-color: blueviolet"> Omitir </button>
  </div>

  <p class="read-the-docs">Copyright © Camino21, 2024. Terms and Conditions. Notice of Privacy</p>
</template>

<style scoped>

h1{
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
