<template>
    <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card elevation="10" class="pa-6">
                    <v-card-title class="text-h5 text-center primary">
                        <span class="font-weight-bold">Publicar Um Livro</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form @submit.prevent="publicarLivros">
                            <!-- Disciplina Dropdown -->
                            <v-select
                            v-model="discip"
                            :items="disciplinaList"
                            item-title="disciplina"
                            item-value="disciplina"
                            label="Selecione a Disciplina"
                            prepend-inner-icon="mdi-book-open"
                            required
                            ></v-select>
                        <!-- Disciplina Radio Option -->
                            <v-container fluid>
                            <p>Selecione a classe do livro</p>
                            <v-radio-group inline v-model="cls">
                            <v-radio v-for="item in classeList" :key=item.id :value="item" :label="item.classe"></v-radio>
                            </v-radio-group>
                        </v-container>

                            <!-- Arquivo File Upload -->
                            <v-file-input
                                v-model="arqv"
                                label="Arquivo"
                                prepend-inner-icon="mdi-upload"
                                required
                                show-size
                            ></v-file-input>
                             <v-file-input
                                v-model="imagem"
                                label="Capa do livro"
                                prepend-inner-icon="mdi-upload"
                                required
                                show-size
                            ></v-file-input>

                            <v-btn type="submit" color="primary" block class="mt-4">
                                Publicar
                            </v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>

import api from '@/config/api';
import {onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2'

const router = useRouter();
const discip = ref(null);
let disciplinaList = ref([]);
const cls = ref(null);
let classeList = ref([]);
const arqv = ref(null);
const imagem = ref(null);

const fetchDisciplinas =async() =>{
    try{
        const response = await api.get('disciplinas');
        disciplinaList.value = response.data.disciplinas;
    }catch(e){
        console.log('Erro',e);
    }
}

const fetchClasses = async() => {
    try{
        const response = await api.get('classes');
        classeList.value = response.data.classes; 

    }catch(e){
         console.log('Erro',e);
    }
}

const publicarLivros = async() =>{
    if(!discip.value || !cls.value || !arqv.value){
        console.log("preencha todos campos");
        return;
    }
    try{
        const response= await api.post('livros',{
           disciplina: discip.value,
           classe: cls.value.classe,
           classe_id: cls.value.id,
           arquivo: arqv.value,
           capa: imagem.value 

        },
        {
  headers: {
    'Content-Type': 'multipart/form-data',
   // 'Authorization': 'Bearer your_token_here' // Optional if needed
  }
}
        
    );

        if (response.status === 200) {
            router.push('/livros');
        }

    Swal.fire('Success', 'Livro publicado com sucesso', 'success')
    }catch(e){
      console.log('Error details:', e); 
    const errorMessage = e.response?.data?.message 
      || e.response?.data?.error 
      || e.message 
      || 'Upload Book Failed';
      
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: errorMessage
    });
    }
}

onMounted(() => {
  fetchDisciplinas()
  fetchClasses()
})
</script>