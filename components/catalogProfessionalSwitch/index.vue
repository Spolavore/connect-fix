<template>
  <div class="flex w-full py-8">
    <div class="flex flex-col w-full">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-4xl font-bold text-[#1E40AF]">
          {{ isPrimaryState ? 'CATÁLOGO DE SERVIÇOS' : 'PROFISSIONAIS A POSTOS' }}
        </h1>
      </div>
      <p class="text-lg text-black">
        {{ isPrimaryState ? 'Soluções rápidas e confiáveis em elétrica, eletrônica e encanamento, feitas por quem entende do assunto!' : 'Profissionais qualificados e experientes, prontos para solucionar seus problemas com eficiência e competência!' }}
      </p>
      <div class="mt-4 flex space-x-4 items-center">
        <button 
          @click="toggleServices" 
          class="inline-block w-[375px] py-2 border-2 border-blue-700 text-blue-700 font-semibold rounded-lg transition-all hover:bg-blue-700 hover:text-white"
        >
          {{ isPrimaryState ? 'VER PRESTADORES DISPONÍVEIS' : 'VISUALIZAR CATÁLOGO' }}
        </button>
        
        <div v-if="!isPrimaryState" class="relative w-[375px]">
          <select 
            v-model="selectedFilter"
            @change="onFilterChange"
            class="w-full px-4 py-2 border-2 border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value='' disabled>Filtrar por profissional</option>
            <option value="eletricista">Eletricista</option>
            <option value="encanador">Encanador</option>
            <option value="todos">Todos</option>
          </select>
          <div 
            class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div v-else class="relative w-[375px]">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            v-model="searchQuery" 
            placeholder="Buscar por tipo de serviço" 
            class="w-full px-10 py-2 border-2 border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          class="botao-azul p-2 pr-8 pl-8 text-md flex gap-2 items-center"
          @click="buscarServicos"
        > 
          <img src="/icons/refreash.svg" class="w-5 h-5"/>
          Atualizar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isPrimaryState: {
    type: Boolean, 
    default: true
  }
})

const emit = defineEmits(['toggle-services', 'search', 'refresh-dados'])

const searchQuery = ref('')
const selectedFilter = ref('')

const toggleServices = () => {
  // Resetar os inputs quando trocar de estado
  searchQuery.value = ''
  selectedFilter.value = ''
  emit('toggle-services')
}

const onFilterChange = () => {
  emit('search', { 
    query: selectedFilter.value, 
    type: 'professional' 
  })
}

const buscarServicos = () => {
  emit('refresh-dados')
}

watch(searchQuery, (newQuery) => {
  emit('search', { 
    query: newQuery, 
    type: props.isPrimaryState ? 'service' : 'rating' 
  })
})
</script>