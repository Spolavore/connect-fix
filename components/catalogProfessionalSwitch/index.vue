<template>
  <div class="flex justify-center w-full py-8">
    <div class="w-3/4 flex flex-col">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-4xl font-bold text-[#1E40AF]">
          {{ isPrimaryState ? 'CATÁLOGO DE SERVIÇOS' : 'PROFISSIONAIS A POSTOS' }}
        </h1>
      </div>
      <p class="text-lg text-black">
        {{ isPrimaryState ? 'Soluções rápidas e confiáveis em elétrica, eletrônica e encanamento, feitas por quem entende do assunto!' : 'Soluções rápidas e confiáveis feitas por quem entende do assunto!' }}
      </p>
      <div class="mt-4 flex space-x-4">
        <button 
          @click="toggleServices" 
          class="inline-block w-[26%] py-2 border-2 border-blue-700 text-blue-700 font-semibold rounded-lg transition-all hover:bg-blue-700 hover:text-white min-w-[200px]"
        >
          {{ isPrimaryState ? 'VER PRESTADORES DISPONÍVEIS' : 'VISUALIZAR CATÁLOGO' }}
        </button>
        
        <div v-if="!isPrimaryState" class="relative w-[40%]">
          <select 
            v-model="selectedFilter"
            @change="onFilterChange"
            class="w-[72.5%] px-4 py-2 border-2 border-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value='' disabled @click="resetFilter">Filtrar por profissional</option>
            <option value="eletricista">Eletricista</option>
            <option value="encanador">Encanador</option>
            <option value="todos">Todos</option>
          </select>
          <div 
            @click="resetFilter" 
            class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 cursor-pointer"
          >
          </div>
        </div>
        
        <div v-else class="relative flex-grow">
          <input 
            v-model="searchQuery" 
            placeholder="Buscar por tipo de serviço" 
            class="w-[40%] px-4 py-2 border-2 border-blue-700 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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

const emit = defineEmits(['toggle-services', 'search'])

const searchQuery = ref('')
const selectedFilter = ref('')

const toggleServices = () => {
  emit('toggle-services')
}

const onFilterChange = () => {
  emit('search', { 
    query: selectedFilter.value, 
    type: 'professional' 
  })
}

const resetFilter = () => {
  selectedFilter.value = ''
  emit('search', { 
    query: '', 
    type: 'professional' 
  })
}

watch(searchQuery, (newQuery) => {
  emit('search', { 
    query: newQuery, 
    type: props.isPrimaryState ? 'service' : 'rating' 
  })
})
</script>