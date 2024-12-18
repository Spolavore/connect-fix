<template>
  <div>
    <CatalogProfessionalSwitch 
      @toggle-services="toggleServiceCards" 
      @search="handleSearch"
      @refresh-dados="atualizar"
      :is-primary-state="isPrimaryServiceState" 
    />
    <div 
      class="flex flex-col items-center justify-center gap-3 border border-neutral-200 rounded-md p-6"
      v-if="carregando"
    >
      <img src="/icons/loading_circle.svg" class="animate-spin" >
    </div>
    <div v-else class="flex w-full">
      <div class="w-full grid grid-cols-3 gap-4">
        <ServiceCard 
          v-if="isPrimaryServiceState"
          v-for="service in filteredPrimaryServices"
          :key="service.id"
          :serviceTitle="service.titulo"
          :professionalName="service.nome"
          :serviceDescription="service.descricao"
          :id-servico="service.id"
          :id-prestador="service.idPrestador"
        />

        <ProfessionalCard 
          v-else
          v-for="professional in filteredProfessionals"
          :key="professional.id"
          :professionalName="professional.nome"
          :profession="professional.profissao"
          :description="professional.descricao"
          :rating="professional.nota"
          :id-prestador="professional.id"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// Props to potentially pass in data if needed
const props = defineProps({
  initialServices: {
    type: Array,
    default: () => []
  },
  initialProfessionals: {
    type: Array,
    default: () => []
  }
})

// função para representar no maximo 2 casas decimais
function formatRating(rating) {
  // Verifica se o número tem casas decimais
  if (Number.isInteger(rating)) {
  // Retorna número inteiro sem casas decimais
    return rating.toString() 
  }
  // Se tiver casas decimais, mantém no máximo 2
  return Number(rating.toFixed(2))
}

// Estado dos serviços
const isPrimaryServiceState = ref(true)
const carregando = ref(true);
const buscar = async () => {
  let { data: services } = await useFetch('http://localhost:6969/servico', {
    method: 'GET',
    transform: (data) => data.map(service => ({
      id: service.id_servico,
      titulo: service.titulo,
      nome: service.nome,
      descricao: service.descricao,
      idPrestador: service.id_prestador
    }))
  })

  // dados prestadores
  let { data: professionals } = await useFetch('http://localhost:6969/prestador', {
    method: 'GET',
    transform: (data) => data.map(professional => ({
      id: professional.id,
      nome: professional.nome,
      profissao: professional.profissao,
      descricao: professional.email,
      nota: formatRating(professional.avaliacao)
    }))
  })
  return {services, professionals}
}
const atualizar = async () => {
  carregando.value = true;
  let { services, professionals } = await buscar();
  carregando.value = false;
  return {services, professionals}
}
// Buscar os dados dos serviços da API
let { services, professionals } = await buscar();
carregando.value = false;

// estado de pesquisa
const searchQuery = ref('')
const selectedFilter = ref('')

// método para alternar os serviços
const toggleServiceCards = () => {
  isPrimaryServiceState.value = !isPrimaryServiceState.value
  
  // Resetar filtros quando mudar de estado
  searchQuery.value = ''
  selectedFilter.value = ''
}

// método de manipulação da pesquisa
const handleSearch = (searchData) => {
  searchQuery.value = searchData.query.toLowerCase()
  selectedFilter.value = searchData.query
}

// filtro de serviços
const filteredPrimaryServices = computed(() => {
  if (!searchQuery.value) return services.value || []
  
  return (services.value || []).filter(service => 
    service.titulo.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    service.descricao.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// filtro de profissionais
const filteredProfessionals = computed(() => {
  if (!professionals.value) return []

  let filteredList = [...professionals.value]

  // fintro dropdown (profissionais)
  if (selectedFilter.value === 'eletricista') {
    filteredList = filteredList.filter(p => p.profissao === 'eletricista')
    return filteredList.sort((a, b) => b.nota - a.nota)
  } else if (selectedFilter.value === 'encanador') {
    filteredList = filteredList.filter(p => p.profissao === 'encanador')
    return filteredList.sort((a, b) => b.nota - a.nota)
  } else if (selectedFilter.value === 'todos') {
    return filteredList.sort((a, b) => b.nota - a.nota)
  }

  return professionals.value
})

// Observador para resetar o filtro quando muda o estado
watch(isPrimaryServiceState, () => {
  searchQuery.value = ''
  selectedFilter.value = ''
})
</script>