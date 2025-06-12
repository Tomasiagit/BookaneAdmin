

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
              <v-btn color="#3d80c2" prepend-icon="mdi-add" style="margin-right: 10px;" to="/pagecustom">Novo Utilizador</v-btn>
            </VCol>
          </VRow>

        </v-card-text>
      </v-card>
    </VCol>
    <VCol cols="12">
      
      <div class="" style="height: 10px;"></div>
      
        <VCard color="#eef7fa">
        <v-card-title class="text-h6 font-weight-light" style="color: black">Utilizadores</v-card-title>
          <v-table class="styled-table">
          <thead style="background-color:#047df5;">
            <tr>
              <th class="text-left">
                Name
              </th>
              <th class="text-left">
                Email
              </th>
              <th class="text-left">
                Role
              </th>
              
             <th class="text-left">
              Acção
            </th>
            </tr>
           
          </thead>
          <tbody>

            <tr v-if="!filteredUsers.length">
              <td colspan="4" class="text-center">Nenhum usuário encontrado</td>
            </tr>
            <tr v-for="item in filteredUsers" :key="item.id" style="background-color: #eef7fa;">
              <template v-if="editedUser && editedUser.id === item.id">
                <td><input v-model="editedUser.name" /></td>
                <td><input v-model="editedUser.email" /></td>
                <td><input v-model="editedUser.role_id"/></td>
                <td>
                  <v-btn color="success" small @click="saveEdited">Salvar</v-btn>
                  <v-btn color="default" small @click="cancelEdit">Cancelar</v-btn>
                </td>
              </template>
              <template v-else>

              <td style="color: black;">
                {{ item.name }}
              </td>
              <td style="color: black;">
                {{ item.email }}
              </td>
              <td style="color: black;">
                {{ item.role_id }}
              </td>
              <td>
                <div style="display: flex; gap: 10px;">
              <v-btn color="warning" small @click="editUser(item)">Editar</v-btn>
              <v-btn color="error" small @click="deleteUser(item)">Apagar</v-btn>
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

const usersList  = ref([]);
const searchQuery = ref('');

//------------------------------------------------Search---//---------------------------------------------

const filteredUsers = computed(() => {
  return usersList.value.filter(user => 
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
//-------------------------------------------------GET-USERS-----------------//
const fetchUsers = async () => {
  try {
    const response = await api.get('users');
    console.log('Data:', response.data);
    usersList.value = response.data.users;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error.response || error)
  }
}
onMounted(() => {
  fetchUsers()
})
//-----------------------------------EDIT-USER---------------------------//

// Currently edited user
const editedUser = ref(null)

const editUser = (user) => {
  editedUser.value = { ...user }
}

const cancelEdit = () => {
  editedUser.value = null
}

const saveEdited = async() =>  {

  try{

     await api.post(`/users/${editedUser.value.id}`, editedUser.value)

      await fetchUsers()
      editedUser.value = null;
      console.log("Editar: ",editedUser);

    const index = filteredUsers.value.findIndex(u => u.id === editUser.value.id)
    if(index !== -1){
      filteredUsers.value[index] = { ...editedUser.value}
    }
   

  }catch(e){
    console.error('Erro ao salvar:', e);

  }
}


//----------------------------------------------------------Apagar _USer-------------//
const deleteUser = async (user) => {
  const result = await Swal.fire({
    title: 'Tem certeza?',
    text: `Você deseja apagar o usuário ${user.name}?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, apagar',
    cancelButtonText: 'Cancelar',
  })

  if (result.isConfirmed) {
    try {
     
       await api.delete(`users/${user.id}`)
       await fetchUsers()
      Swal.fire('Apagado!', 'O usuário foi removido.', 'success')
    } catch (err) {
      Swal.fire('Erro!', 'Não foi possível apagar o usuário.', 'error')
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
