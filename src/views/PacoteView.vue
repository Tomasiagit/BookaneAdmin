

<template>
  <VRow>
    <!-- <VCol cols="12">
      <v-card color="#eef7fa">
        <v-card-text>
          <VRow>
            <VCol cols="6">

              <VTextField theme="dark" base-color="white" item-title="name" item-value="name"
                    label="Search" append-icon="mdi-search"></VTextField>
            </VCol>
            <VCol cols="3">
              <v-btn color="#3d80c2" prepend-icon="mdi-add" style="margin-right: 10px;" to="/pagecustom">Novo Pacote</v-btn>
            </VCol>
          </VRow>

        </v-card-text>
      </v-card>
    </VCol> -->

    <VCol cols="12">
      <div class="" style="height: 10px;"></div>
        <VCard color="#eef7fa">
        <v-card-title class="text-h6 font-weight-light" style="color: black">Todos pacotes</v-card-title>
          <v-table class="styled-table">
          <thead style="background-color:#047df5;">
            <tr>
              <th class="text-left">
                Duração
              </th>
              <th class="text-left">
                Valor
              </th>
              <th class="text-left">
              Acção
            </th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="!PacotesList.length" style="background-color: #eef7fa;">
             <td colspan="4" class="text-center">Nenhum Pacote encontrado</td>
            </tr>
            
            <tr v-for="item in PacotesList" :key="item.id" style="background-color: #eef7fa;">
             <template v-if="editingPacote && editingPacote.id === item.id ">
                <td><input v-model="editingPacote.duracao" /></td>
                <td><input v-model="editingPacote.valor" /></td>
                <td>
                  <v-btn color="success" small @click="saveEditedPacote">Salvar</v-btn>
                  <v-btn color="default" small @click="cancedlEditPacote">Cancelar</v-btn>
                </td>
             </template>

             <template v-else>
             <td style="color: black;">
              {{ item.duracao }}
              </td>
               <td style="color: black;">
                
                  {{ item.valor }}
              </td>
              <td>
                <div style="display: flex; gap: 10px;">
                <v-btn color="warning" small @click="editPacote(item)">Editar</v-btn>
                <v-btn color="error" small @click="deletePacote(item)">Apagar</v-btn>
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
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2' 

const PacotesList  = ref([]);
const editingPacote = ref(null);
//-----------------------------------Fetch--Pacotes----------------//
 const fetchPacotes = async () => {
  try{
    const response = await api.get('pacotes');
    console.log('ResponsePacotes: ',response.data);
    PacotesList.value = response.data.pacotes;
  }catch(e){
    console.e('Erro ao buscar Pacotes:', e.response || e)
  }
}
onMounted(() => {
  fetchPacotes()
})

const editPacote = (pacote) => {
editingPacote.value = { ...pacote}
}
const cancedlEditPacote = () => {
  editingPacote.value = null;
}

const saveEditedPacote = async () => {
  try{
    await api.post(`pacotes/${editingPacote.value.id}`, editingPacote.value);
    await fetchPacotes();
    editingPacote.value = null;

  }catch(e){
     console.error('Erro ao salvar:', e);
  }
}

const deletePacote = async (pacote) =>{

  const result = await Swal.fire({
    title : 'Tem certeza?',
    text: `Deseja apagar o pacote de ${pacote.valor}mts de ${pacote.duracao} de duração?`, 
    icon: 'warning',
    showCancelButton: true,
    confirmButton: true,
    cancerButtonText: 'Cancelar'
  });

  if(result.isConfirmed){
    try{
      await api.delete(`pacotes/${pacote.id}`)
      await fetchPacotes()       
      Swal.fire('Pacote!', 'O Pacote foi removido.', 'success')

    }catch(e){  
    Swal.fire('Erro!', 'Não foi possível apagar o pacote.', 'error')
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
