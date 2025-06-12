

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
              <v-btn color="#3d80c2" prepend-icon="mdi-add" style="margin-right: 10px;" to="/pagecustom">Novo Livro</v-btn>
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
            <tr v-for="item in list_livros" :key="item.id" style="background-color: #eef7fa;">
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
              <v-btn color="primary" small @click="viewUser(item)">Ver</v-btn>
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


<script>
//import api from '@/config/api';
//import DemoSimpleTableBasics from '@/layout/tables/DemoSimpleTableBasics.vue';
export default {
  name: "UserView",
  components: {
    //DemoSimpleTableBasics,

  },
  data() {
    return {
      status: [],
      status_id: "",
      list_livros: [],
      loading: false,
      
    }
  },
  methods: {
    getStatus() {
      // api.get("/status").then((res) => {
      //   this.status = res.data
      // })
    },
    getAllUsers() {
      this.loading = true
      console.log("get users functon");
      this.list_livros = [
        {
          id: 1,
          disciplina: 'Portugues',
          classe: '12',
          arquivo: 'link',
        },
        {
          id: 2,
          disciplina: 'Matematica',
          classe: '12',
          arquivo: 'link',
        }, 
        {
          id: 3,
          disciplina: 'Ingles',
          classe: '10',
          arquivo: 'link',
        },
        
        
      ]
      this.loading = false
      
    },
    changeStatus() {
      console.log(this.status_id)
    },
    byStatus(item) {
      console.log(item)
    }
  },
  created() {
    this.getStatus()
    this.getAllUsers()
  },
  // watch: {
  //   status_id(newV, old) {
  //     let data = []
  //     this.activities.forEach((element) => {
  //       if (element['status'] == newV) {
  //         data.push(element)
  //       }
  //     })
  //     this.activities = data
  //   }
  // }
}
</script>



<style>
.styled-table thead tr th {
  color: #ffffff !important;
  font-weight: bold !important;
  text-align: left !important;
}
</style> 
