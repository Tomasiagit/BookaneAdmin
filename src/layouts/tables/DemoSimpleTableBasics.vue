<script>
export default {
  data() {
    return {
      checkbox: true
    }
  },
  props: {
    activities: {
      type: Object,
      required: true
    }
  },
  methods: {
    getStatusStyle(statusId) {
      switch (statusId) {
        case 1:
          return { backgroundColor: 'rgb(255, 205, 86)', color: '#fff' };
        case 4:
          return { backgroundColor: 'red', color: '#fff' };
        case 5:
          return { backgroundColor: 'green', color: '#fff' };
        default:
          return { backgroundColor: 'grey', color: '#fff' };
      }
    }
  }
}
</script>

<template>
  <VTable class="styled-table">
    <thead>
      <tr>
        <th></th>
        <th>
          Actividades
        </th>
        <th>
          Designado
        </th>
        <th>
          Responsavel
        </th>
        <th>
          Status
        </th>
        <th>
          Solicitante
        </th>
        <th> Data inicio</th>
        <th>Data prevista</th>
        <th>Data final</th>
        <th>Acções</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in activities" :key="item.id" style="border-top: 1px solid blue;">
        <td>
          <v-checkbox value="true" v-model="checkbox"></v-checkbox>
        </td>
        <td>{{ item.name }}</td>
        <td>{{ item.user }}</td>
        <td>{{ item.manager }}</td>
        <td> {{ item.status }}</td>
        <td>{{ item.owner }}</td>
        <td>{{ item.start_date }}</td>
        <td>{{ item.due_date }}</td>
        <td>{{ item.final_date }}</td>

        <td>
          <v-btn :style="getStatusStyle(item.status_id)" rounded small color="#E5153D"
            :to="{ name: 'actividades.detalhes', params: { id: item.id } }">Detalhes</v-btn>
        </td>
      </tr>
    </tbody>


  </VTable>
</template>

<style>
td {
  color: #111;
}

thead {
  background-color: #F58B31;
}

.styled-table thead tr th {
  color: #ffffff !important;
  font-weight: bold !important;
  text-align: left !important;
}
</style>
