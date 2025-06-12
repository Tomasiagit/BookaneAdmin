<!-- eslint-disable indent -->
<script>
export default {
  data() {
    return {
      checkbox: true,
      incidentesData: [
        {
            'id': 1,
            'start': '10-12-2024',
            'end': '11-11-2025',
            'incident': 'services down',
            'description': 'falha do sistema',
            'resolution': 'reinicializar o servidores',
        },
        {
            'id': 1,
            'start': '10-12-2024',
            'end': '11-11-2025',
            'incident': 'services down',
            'description': 'falha do sistema',
            'resolution': 'reinicializar o servidores',
        },
        {
            'id': 1,
            'start': '10-12-2024',
            'end': '11-11-2025',
            'incident': 'services down',
            'description': 'falha do sistema',
            'resolution': 'reinicializar o servidores',
        },
      ],
    }
  },
  props: {
    incidentes: {
      type: Object,
      required: false
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
        <!-- <th></th> -->
        <th>
          Inicio do incidente
        </th>
        <th>
          Fim
        </th>
        <th>
          Incidente
        </th>
        <th>
          Motivo
        </th>
        <th>
          Resolução
        </th>
        <th>
          Submetido por:
        </th>
        <!-- <th>
          Solicitante
        </th>
        <th> Data inicio</th>
        <th>Data prevista</th>
        <th>Data final</th>
        <th>Acções</th> -->
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in incidentes" :key="item.id" style="border-top: 1px solid blue;">
        <!-- <td>
          <v-checkbox value="true" v-model="checkbox"></v-checkbox>
        </td> -->
        <td>{{ item.start }}</td>
        <td>{{ item.end }}</td>
        <td>{{ item.incident }}</td>
        <td>{{ item.description }}</td>
        <td> {{ item.resolution }}</td>
        <td> {{ item.user }}</td>

        <!-- <td>
          <v-btn :style="getStatusStyle(item.status_id)" rounded small color="#E5153D"
            :to="{ name: 'actividades.detalhes', params: { id: item.id } }">Detalhes</v-btn>
        </td> -->
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
