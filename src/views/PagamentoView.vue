

<template>
  <VRow>
    <VCol cols="12">
      <v-card color="#eef7fa">
        <v-card-text>
          <VRow>
            <VCol cols="6">

              <VTextField theme="dark" base-color="white" v-model="name" item-title="name" item-value="name"
                    label="Search" append-icon="mdi-search"></VTextField>
            </VCol>
            <VCol cols="3">
              <v-btn color="#3d80c2" prepend-icon="mdi-add" style="margin-right: 10px;" to="/pagecustom">Novo Pagamento</v-btn>
            </VCol>
          </VRow>

        </v-card-text>
      </v-card>
    </VCol>
    <VCol cols="12">
      
      <div class="" style="height: 10px;"></div>
      
        <VCard color="#eef7fa">
        <v-card-title class="text-h6 font-weight-light" style="color: black">Todos pagamentos</v-card-title>
          <v-table class="styled-table">
          <thead style="background-color:#047df5;">
            <tr>
              <th class="text-left">
                id
              </th>
              <th class="text-left">
                User
              </th>
              <th class="text-left">
              Classe
            </th>
              <th class="text-left">
              Pacote
            </th>
            <th class="text-left">
              Data inicio
            </th>
            <th class="text-left">
              Data Fim
            </th>
            <th class="text-left">
              Estado
            </th>
            <th class="text-left">
              Acção
            </th>
            </tr>
           
          </thead>
          <tbody>
             <tr v-if="!pagamentosList.length" style="background-color: #eef7fa;">
              <td colspan="4" class="text-center">Nenhum Pagamento encontrado!</td>
             </tr>
            
             <tr v-for="item in pagamentosList" :key="item.id" style="background-color: #eef7fa;">
             <!-- <template v-if="editingPagamento && editingPagamento.value.id === item.id">
             <td><input v-model="editingPagamento.id"></td>
             <td><input v-model="editingPagamento.user" /></td>
             <td><input v-model="editingPagamento.classe" /></td>
             <td><input v-model="editingPagamento.pacote" /></td>
             <td><input v-model="editingPagamento.data_inicio" /></td>
             <td><input v-model="editingPagamento.data_fim" /></td>
             <td><input v-model="editingPagamento.estado" /></td>
              <td>
                <div style="display: flex; gap: 10px;">
              <v-btn color="warning" small @click="SavePayment(item)">Salvar</v-btn>
              <v-btn color="error" small @click="CancelEditPayment(item)">Cancelar</v-btn>
              </div> 
              </td>
              </template> -->
              
              <!--               mmmm                        -->
              
              <td style="color: black;">
                {{ item.id }}
              </td>
              <td style="color: black;">
                {{ item.user }}
              </td>
              <td style="color: black;">
                {{ item.classe }}
              </td>
              <td style="color: black;">
                {{ item.pacote }}
              </td>
              <td style="color: black;">
                {{ item.estado }}
              </td>
              <td style="color: black;">
                {{ item.data_inicio }}
              </td>
              <td style="color: black;">
                {{ item.data_fim }}
              </td>
              
              <td>
                <div style="display: flex; gap: 10px;">
              <v-btn color="warning" small @click="editUser(item)">Editar</v-btn>
              <v-btn color="error" small @click="deleteUser(item)">Apagar</v-btn>
                </div>
              </td>
              
             
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
import { onMounted, ref } from 'vue';
//import Swal from 'sweetalert2'


const pagamentosList = ref([]);

const fetchPagamentos = async() =>{
  try{

    const response = await api.get('pagamentos');
    pagamentosList.value = response.data.pagamentos;
    console.log('Pagamrenos List', response.data.pagamentos);

  }catch(e){
    console.error('Erro ao buscar pagamentos:', e.response || e)

  }

}
onMounted(() => {
  fetchPagamentos()
});


</script>



<style>
.styled-table thead tr th {
  color: #ffffff !important;
  font-weight: bold !important;
  text-align: left !important;
}
</style> 
