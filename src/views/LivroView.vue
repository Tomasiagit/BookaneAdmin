

<template>
  <VRow>
    <VCol cols="12">
      <v-card color="#eef7fa">
        <v-card-text>
          <VRow>
            <VCol cols="6">

              <VTextField theme="dark" base-color="white" v-model="searchQuery" item-title="name" item-value="name"
                    label="Search" append-icon="mdi-search"></VTextField>
            </VCol>
            <VCol cols="3">
              <v-btn color="#3d80c2" prepend-icon="mdi-add" style="margin-right: 10px;" to="/livrosform">Novo Livro</v-btn>
            </VCol>
          </VRow>

        </v-card-text>
      </v-card>
    </VCol>
    <VCol cols="12">
      
      <div class="" style="height: 10px;"></div>
      
        <VCard color="#eef7fa">
        <v-card-title class="text-h6 font-weight-light" style="color: black">Lista de Livros</v-card-title>
          <v-table class="styled-table">
          <thead style="background-color:#047df5;">
            <tr>
              <th class="text-left">
                id
              </th>
              <th class="text-left">
                Disciplina
              </th>
              <th class="text-left">
                Classe
              </th>
              <th class="text-left">
              Arquivo
            </th>
            <th class="text-left">
              Acção
            </th>
            </tr>
           
          </thead>
          <tbody>

            <tr v-if="!filterLivros.length" style="background-color: #eef7fa;">
              <td style="color: black;">
                Nenhum Livro encontrado!
              </td>
            </tr>
          <tr v-for="item in filterLivros" :key="item.id" style="background-color: #eef7fa;">
          <template v-if="livroToEdit && livroToEdit.id === item.id">
            <td><input v-model="livroToEdit.id"/></td>
             <td><input v-model="livroToEdit.disciplina"/></td>
             <td><input v-model="livroToEdit.classe"/></td>
             <td><input v-model="livroToEdit.arquivo"/></td>
                <td>
                  <v-btn color="success" small @click="saveEdited">Salvar</v-btn>
                  <v-btn color="default" small @click="cancelEdition">Cancelar</v-btn>
                </td>

              </template>
          
           <template v-else>
           
              <td style="color: black;">
                {{ item.id }}
              </td>
              <td style="color: black;">
                {{ item.disciplina }}
              </td>
              <td style="color: black;">
                {{ item.classe }}
              </td>
              <td style="color: black;">
                {{ item.arquivo }}
              </td>
              <td>
                
              <div style="display: flex; gap: 10px;">
              <v-btn color="warning" small @click="editLivro(item)">Editar</v-btn>
              <v-btn color="error" small @click="deleteLivro(item)">Apagar</v-btn>
              </div>
              </td>
          </template>
              </tr>
            
            
          </tbody>
        </v-table>
      </VCard>
    </VCol>
    <VDialog width="auto" v-model="loading">
      <VCard color="primary">
        <VCardText>
          Por favor aguarde
          <VProgressLinear indeterminate color="white" class="mb-0" />
        </VCardText>
      </VCard>
    </VDialog>
  </VRow>
</template>


<script setup>
import api from '@/config/api';
import { ref, onMounted, computed } from 'vue'
import Swal from 'sweetalert2'

const livroList  = ref([]);
const searchQuery = ref('');
const livroToEdit = ref(null);

//------------------------- LIStar Livros -------------------------//
const fetchLivros = async () => {
  try {
    const response = await api.get('livros');
    console.log('Data:', response.data);
    livroList.value = response.data.livros;
  } catch (error) {
    console.error('Erro ao buscar os Livros:', error.response || error)
  }
}
onMounted(() => {
  fetchLivros()
})

//----------------------------Search --Livros ----------------//

const filterLivros = computed(() => {
  return livroList.value.filter(livro => 
    livro.disciplina.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    livro.classe.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

//---------------------------EDIT-livro---------------------------//




const editLivro = (livro) => {
  livroToEdit.value = { ...livro }
}

const cancelEdition = () => {
  livroToEdit.value = null;
}

const saveEdited = async() =>  {

  try{

     await api.post(`/livros/${livroToEdit.value.id}`, livroToEdit.value);

    await fetchLivros();
    livroToEdit.value = null;
      

    const index = filterLivros.value.findIndex(u => u.id === livroToEdit.value.id)
    if(index !== -1){
      filterLivros.value[index] = { ...livroToEdit.value}
    }
   

  }catch(e){
    console.error('Erro ao salvar:', e);

  }
}

//----------------------------------------------------------Apagar _USer-------------//
const deleteLivro = async (livro) => {
  const result = await Swal.fire({
    title: 'Tem certeza?',
    text: `Você deseja apagar o livro da disciplina de ${livro.disciplina} da ${livro.classe}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, apagar',
    cancelButtonText: 'Cancelar',
  })

  if (result.isConfirmed) {
    try {
     
       await api.delete(`livros/${livro.id}`)
       await fetchLivros()
      Swal.fire('Apagado!', 'O Livro foi removido.', 'success')
    } catch (err) {
      Swal.fire('Erro!', 'Não foi possível apagar o Livro', 'error')
    }
  }
}

</script>



<style>
.styled-table thead tr th {
  color: #ffffff !important;
  font-weight: bold !important;
  text-align: left !important;
}
</style> 
