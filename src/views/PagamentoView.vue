

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
             <tr v-if="!filteredPagamentos.length" style="background-color: #eef7fa;">
              <td colspan="4" class="text-center">Nenhum Pagamento encontrado!</td>
             </tr>
            
             <tr v-for="item in filteredPagamentos" :key="item.id" style="background-color: #eef7fa;">
             <template v-if="editingPagamento && editingPagamento.id === item.id">
             <td><input v-model="editingPagamento.id"></td>
             <td><input v-model="editingPagamento.user_id" /></td>
             <td><input v-model="editingPagamento.classe_id" /></td>
             <td><input v-model="editingPagamento.pacote_id" /></td>
             <td><input v-model="editingPagamento.data_inicio" /></td>
             <td><input v-model="editingPagamento.data_fim" /></td>
             <td><input v-model="editingPagamento.estado" /></td>
              <td>
                <div style="display: flex; gap: 10px;">
              <v-btn color="success" small @click="saveEditionPagamento(item)">Salvar</v-btn>
              <v-btn color="default" small @click="cancelEditionPagamento(item)">Cancelar</v-btn>
              </div> 
              </td>
              </template>
              <template v-else>
              
              <td style="color: black;">
                {{ item.id }}
              </td>
              <td style="color: black;">
                {{ item.user_id }}
              </td>
              <td style="color: black;">
                {{ item.classe_id }}
              </td>
              <td style="color: black;">
                {{ item.pacote_id }}
              </td>
              
              <td style="color: black;">
                {{ item.data_inicio }}
              </td>

              <td style="color: black;">
                {{ item.data_fim }}
              </td>
              <td style="color: black;">
                {{ item.estado }}
              </td>
              
              <td>
                <div style="display: flex; gap: 10px;">
              <v-btn color="warning" small @click="editpagamento(item)">Editar</v-btn>
              <v-btn color="error" small @click="deletePagamento(item)">Apagar</v-btn>
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
import { onMounted, ref, computed} from 'vue';
import Swal from 'sweetalert2'


const pagamentosList = ref([]);
const editingPagamento = ref(null);
const searchQuery = ref('');
//------------------------------------------FEtch ------ Pagamentos -------------------//
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
//-------------------------------Update - Pagamento -------------------------//

const editpagamento = (pagamento) =>{
  editingPagamento.value = { ...pagamento }

}
const cancelEditionPagamento =() => {
  editingPagamento.value = null;
}

const saveEditionPagamento = async() => {

  try{
    await api.post(`pagamentos/${editingPagamento.value.id}`, editingPagamento.value);
    await fetchPagamentos();
    editingPagamento.value = null;
  }catch(e){
    console.error('Erro ao Salvar', e);

  }
}
//---------------------------Search Pagamentos --------------------//

const filteredPagamentos = computed(() => {
  return pagamentosList.value.filter(pagamento => 
    // pagamento.user_id.includes(searchQuery.value.toLowerCase()) ||
    // pagamento.classe_id.includes(searchQuery.value.toLowerCase()) ||
    // pagamento.pacote_id.includes(searchQuery.value.toLowerCase()) ||
    pagamento.estado.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

//-------------------------------Delete- Pagamento-----------------------------//

const deletePagamento = async(pagamento) => {

     const result = await Swal.fire({
    title: 'Tem certeza?',
    text: `Você deseja apagar o Pagamento com referência ${pagamento.id}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, apagar',
    cancelButtonText: 'Cancelar',
  })

  if(result.isConfirmed){

     try {
     
       await api.delete(`pagamentos/${pagamento.id}`)
       await fetchPagamentos()
      Swal.fire('Apagado!', 'O Pagamento foi removido.', 'success')
    } catch (e) {
      Swal.fire('Erro!', 'Não foi possível apagar o Pagamento.', e)


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
