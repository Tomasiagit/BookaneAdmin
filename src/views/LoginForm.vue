<template>
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card elevation="10" class="pa-6">
           
            <v-card-title class="text-h5 text-center primary">
              <span class="font-weight-bold"> Bookane</span>
             
             
            </v-card-title>
  
            <v-card-text>
              <v-form @submit.prevent="submitLogin">
                <v-text-field
                  v-model="email"
                  label="Email"
                  type="email"
                  prepend-inner-icon="mdi-email"
                  required
                ></v-text-field>
  
                <v-text-field
                  v-model="password"
                  label="Password"
                  type="password"
                  prepend-inner-icon="mdi-lock"
                  required
                ></v-text-field>
  
                <v-btn type="submit" color="primary" block class="mt-4">
                  Login
                </v-btn>
              </v-form>
<!-- 
              <v-alert
                v-if="error"
                type="error"
                class="mt-4"
              >
                {{ error }}
              </v-alert> -->
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
<script setup>

import { ref } from 'vue'
import api from '@/config/api';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'

const router = useRouter()



const email = ref('')
const password = ref('')

const submitLogin = async () => {
  try {
    const response = await api.post('login', {
      email: email.value,
      password: password.value,
    });
    if (response.status === 200) {
           
            router.push('/home');
        }
    Swal.fire('Success', 'Login successful', 'success')
    localStorage.setItem('token', response.data.token)

  } catch (e) {
    // Error
      console.log('Error details:', e); // For debugging
    const errorMessage = e.response?.data?.message 
      || e.response?.data?.error 
      || e.message 
      || 'Login failed';
      
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage
    });
  }
}



</script>

<style scoped>
.login-container {
    max-width: 400px;
    margin: auto;
    padding: 2rem;
}
.error {
    color: red;
    margin-top: 1rem;
}
</style>
