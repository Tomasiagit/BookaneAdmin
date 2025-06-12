<script setup>
import api from '@/config/api';
import Swal from 'sweetalert2';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const status = ref([])
const form = ref(
  {
    id: null,
    incident: '',
    description: '',
    resolution: null,
    start: null,
    end: null,
  }
)


const tipos = ref([
  { name: 'Diaria', value: 'Diaria' },
  { name: 'Mensal', value: 'Mensal' },

])

const uns = ref([
  { name: 'Direção de Academia (DACA)', value: 'Direção de Academia (DACA)' },
  { name: 'Direcção de Tecnologias de Informação (DTI)', value: 'Direcção de Tecnologias de Informação (DTI)' },
  { name: 'Direcção de Protecção de Receita e Controlo de Perdas (DPRCP)', value: 'Direcção de Protecção de Receita e Controlo de Perdas (DPRCP)' },
  { name: 'Direcção Comercial (DIC)', value: 'Direcção Comercial  (DIC)' },
  { name: 'Direcção de Distribuição  (DID)', value: 'Direcção de Distribuição (DID)' },
  { name: 'Direcção de Eletrificação (DIP)', value: 'Direcção de Eletrificação  (DIP)' },
  { name: 'Direcção de Planeamento de Sistemas e Engenharia  (DPSE)', value: 'Direcção de Planeamento de Sistemas e Engenharia (DPSE)' },
  { name: 'Direcção de Aquisições  (DIA)', value: 'Direcção de Aquisições  (DIA)' },
  { name: 'Direcção das Finanças corporativas  (DFC)', value: 'Direcção das Finanças corporativas  (DFC)' },
  { name: 'Direcção Serviços Gerais  (DSG)', value: 'Direcção das Finanças corporativas  (DFC)' },
  { name: 'Direcção Recursos Humanos (DRH)', value: 'Direcção Recursos Humanos (DRH)' },
  { name: 'Direcção de Higiene Segurança e saúde no Trabalho (DHSST)', value: 'Direcção de Higiene Segurança e saúde no Trabalho (DHSST)' },
  { name: 'Direcao de Operação de Mercado (DOS)', value: 'Direcao de Operação de Mercado (DOS)' },
  { name: 'Direcção de Desenvolvimento de Negócios (DDN)', value: 'Direcção de Desenvolvimento de Negócios (DDN)' },
  { name: 'Direcção de Energias Renováveis (DER)', value: 'Direcção de Energias Renováveis (DER)' },
  { name: 'Direcção de Operacao  de Sistema (DOS)', value: 'Direcção de Operacao  de Sistema (DOS)' },
  { name: 'Direcção de Produção  (DIP)', value: 'Direcção de Produção  (DIP)' },
  { name: 'Direcção de Transporte   (DIT)', value: 'Direcção de Transporte   (DIT)' },
  { name: 'Gabinete de Auditoria e Risco (GAR)', value: 'Gabinete de Auditoria e Risco (GAR)' },
  { name: 'Gabinete de Estratégia e Desempenho Empresarial (GEDE)', value: 'Gabinete de Estratégia e Desempenho Empresarial (GEDE)' },
  { name: 'Gabinete de Ética e Provedoria do Cliente (GEPC)', value: 'Gabinete de Ética e Provedoria do Cliente (GEPC)' },
  { name: 'Gabinete de Inspeção de Actividades (GIA)', value: 'Gabinete de Inspeção de Actividades (GIA)' },
  { name: 'Gabinete Jurídico (GAJ)', value: 'Gabinete Jurídico (GAJ)' },
  { name: 'Gabinete do Conselho de Administração  (GCA)', value: 'Gabinete do Conselho de Administração  (GCA)' },
  { name: 'Gabinete de Comunicao e Relações Institucionais  (GCRI)', value: 'Gabinete de Comunicao e Relações Institucionais (GCRI)' },
  { name: 'Área de Serviço ao cliente de Nacala  (ASC Nacala)', value: ' Área de Serviço ao cliente de Nacala (ASC Nacala)' },
  { name: 'Área de Serviço ao cliente de Angoche  (ASC Angoche)', value: ' Área de Serviço ao cliente de Angoche (ASC Angoche)' },
  { name: 'Área de Serviço ao cliente de Pemba  (ASC Pemba)', value: 'Área de Serviço ao cliente de Pemba (ASC Pemba)' },
  { name: 'Área de Serviço ao cliente de Nampula  (ASC Nampula)', value: ' Área de Serviço ao cliente de Nampula (ASC Nampula)' },
  { name: 'Área de Serviço ao cliente de Lichinga  (ASC Lichinga)', value: 'Área de Serviço ao cliente de Lichinga (ASC Lichinga)' },
  { name: 'Área de Serviço ao cliente de Cumba  (ASC Cumba)', value: ' Área de Serviço ao cliente de Cumba (ASC Cumba)' },
  { name: 'Área de Serviço ao cliente de Chimoio (ASC Chimoio)', value: ' Área de Serviço ao cliente de Chimoio (ASC Chimoio)' },
  { name: 'Área de Serviço ao cliente de Caia  (ASC Caia)', value: ' Área de Serviço ao cliente de Caia (ASC Caia)' },
  { name: 'Área de Serviço ao cliente de Beira  (ASC Beira)', value: 'Área de Serviço ao cliente de Beira (ASC Beira)' },
  { name: 'Área de Serviço ao cliente de Tete  (ASC Tete)', value: 'Área de Serviço ao cliente de Tete (ASC Tete)' },
  { name: 'Área de Serviço ao cliente de Quelimane  (ASC Quelimane)', value: 'Área de Serviço ao cliente de Quelimane (ASC Quelimane)' },
  { name: 'Área de Serviço ao cliente de Mocuba  (ASC Mocuba)', value: 'Área de Serviço ao cliente de Mocuba (ASC Mocuba)' },
  { name: 'Área de Serviço ao cliente de Chokwe  (ASC Chokwe)', value: 'Área de Serviço ao cliente de Chokwe (ASC Chokwe)' },
  { name: 'Área de Serviço ao cliente de Xai-Xai  (ASC Xai-Xai)', value: 'Área de Serviço ao cliente de Xai-Xai (ASC Xai-Xai)' },
  { name: 'Área de Serviço ao cliente de Vilanculos (ASC Vilanculos)', value: ' Área de Serviço ao cliente de Nacala (ASC Nacala)' },
  { name: 'Área de Serviço ao cliente de Boane  (ASC Boane)', value: ' Área de Serviço ao cliente de Boane (ASC Boane)' },
  { name: 'Área de Serviço ao cliente de Inhambane  (ASC Inhambane)', value: 'Área de Serviço ao cliente de Inhambane (ASC Inhambane)' },
  { name: 'Área de Serviço ao cliente de Machava  (ASC Machava)', value: ' Área de Serviço ao cliente de Machava (ASC Machava)' },
  { name: 'Área de Serviço ao cliente de Infulene  (ASC Infulene)', value: ' Área de Serviço ao cliente de Infulene (ASC Infulene)' },
  { name: 'Área de Serviço ao cliente de Matola  (ASC Matola)', value: 'Área de Serviço ao cliente de Matola (ASC Matola)' },
  { name: 'Área de Serviço ao cliente de Ka Maxaquene   (ASC Ka Maxaquene )', value: ' Área de Serviço ao cliente de Ka Maxaquene  (ASC Ka Maxaquene)' },
  { name: 'Área de Serviço ao cliente de Ka Guava  (ASC Ka Guava)', value: 'Área de Serviço ao cliente de Ka Guava (ASC Ka Guava)' },
  { name: 'Área de Serviço ao cliente de Ka Mubucuane  (ASC Ka Mubucuane)', value: ' Área de Serviço ao cliente de Ka Mubucuane (ASC Ka Mubucuane)' },
  { name: 'Área de Serviço ao cliente de  Ka Mavota  (ASC Ka Mavota)', value: ' Área de Serviço ao cliente de Ka Mavota (ASC Ka Ka Mavota)' },
  { name: 'Área de Serviço ao cliente de  Ka Mpfumo  (ASC Ka Mpfumo)', value: ' Área de Serviço ao cliente de Ka Mpfumo (ASC Ka Mpfumo)' },
  { name: 'Área de Serviço ao cliente de Ka Mubucuane  (ASC Ka Mubucuane)', value: ' Área de Serviço ao cliente de Ka Mubucuane (ASC Ka Mubucuane)' },
])


const loading = ref(false)

const router = useRouter()

const resetForm = () => {
  router.push("/actividades")
}

const getStatus = () => {
  loading.value = true
  api.get("/status").then((res) => {
    status.value = res.data
    loading.value = false
  }).catch((error) => {
    loading.value = false
  })
}

const submit = () => {
  loading.value = true
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("TOKEN_AUTH")}` }
  };
  const formData = new FormData();
  // formData.append("id", form.value.name)
  formData.append("incident", form.value.incident)
  formData.append("description", form.value.description)
  formData.append("resolution", form.value.resolution)
  formData.append("start", form.value.start)
  formData.append("end", form.value.end)
//   formData.append("final_date", form.value.final_date)
//   formData.append("status_situation", form.value.status_situation)
//   formData.append("tipo_actividade", form.value.tipo_actividade)
/
  api.post("/incident", formData, config)
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Incidente cadastrado com Sucesso',
      });
      loading.value = false
      router.push("/incidentes")
    })
    .catch((error) => {
      loading.value = false
    })

}

const handleFileChange = (event) => {
  form.document = event.target.files[0];
};

onMounted(() => {
//   getStatus()
})
</script>

<template>
  <VRow class="match-height">
    <VCol cols="12">
      <VForm class="mt-6">
        <VRow>
            <VCol md="3" cols="12">
                <VTextField label="Data de inicio" type="date" placeholder="DD/MM/YYYY" v-model="form.start" />
            </VCol>
            <VCol md="3" cols="12">
                <VTextField label="Fim" type="date" placeholder="DD/MM/YYYY" v-model="form.end" />
            </VCol>
            
          <VCol md="3" cols="12">
            <VTextField hide-details="auto" label="Incidente" v-model="form.incident" />
          </VCol>
          <VCol md="6" cols="12">
            <VTextarea label="Descrição" v-model="form.description" v-bind:value="form.description"/>
          </VCol>
         

          
          <VCol md="6" cols="12">
            <VTextarea label="Resolução" v-model="form.resolution"/>
          </VCol>

          <VCol cols="12" class="d-flex flex-wrap gap-4">
            <VBtn @click="submit()">Submeter</VBtn>
            <VBtn color="secondary" variant="tonal" type="reset">
              Cancelar
            </VBtn>
          </VCol>
        </VRow>
      </VForm>
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
