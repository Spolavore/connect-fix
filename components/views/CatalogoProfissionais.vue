<template>
    <div>
      <CatalogProfessionalSwitch 
        @toggle-services="toggleServiceCards" 
        @search="handleSearch"
        :is-primary-state="isPrimaryServiceState" 
      />
      <div class="flex w-full">
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
  
  // Estado dos serviços
  const isPrimaryServiceState = ref(true)
  
  // Buscar os dados dos serviços da API
  const { data: services } = await useFetch('http://localhost:6969/servico', {
    method: 'GET',
    transform: (data) => data.map(service => ({
      id: service.id_servico,
      titulo: service.titulo,
      nome: service.titulo,         // trocar para nome quando tiver a coluna na tabela
      descricao: service.descricao,
      idPrestador: service.id_prestador
    }))
  })
  console.log(services)
  
  // dados prestadores
  const { data: professionals } = await useFetch('http://localhost:6969/prestador', {
    method: 'GET',
    transform: (data) => data.map(professional => ({
      id: professional.id,
      nome: professional.nome,
      profissao: professional.profissao,
      descricao: professional.email,
      nota: professional.avaliacao
    }))
  })
  
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
      service.titulo.toLowerCase().includes(searchQuery.value.toLowerCase())
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