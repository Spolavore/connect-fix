<template>
  <div class="w-full max-w-full border-2 border-[#3B82F6] rounded-lg p-4 flex flex-col">
    <h2 class="text-xl font-medium text-gray-800 mb-2">{{ serviceTitle }}</h2>
    <h3 class="text-base font-light text-gray-600 mb-3">{{ professionalName }}</h3>
    
    <p class="text-base text-gray-700 mb-4 flex-grow">
      {{ truncatedDescription }}
    </p>
    
    <button 
      @click="openModal" 
      class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
    >
      Solicitar
    </button>

    <!-- Modal de Agendamento *colocar campos como obrigatórios*-->
    <div 
      v-if="isModalOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-lg relative w-96">
        <button 
          @click="closeModal" 
          class="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          ✕
        </button>
        <h2 class="text-xl mb-4">Agendar Serviço</h2>
        
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Selecione a Data</label>
          <input 
            type="date" 
            v-model="selectedDate" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Selecione o Horário</label>
          <input 
            type="time" 
            v-model="selectedTime" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        
        <button 
          @click="confirmSchedule" 
          class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  serviceTitle: {
    type: String,
    required: true
  },
  professionalName: {
    type: String,
    required: true
  },
  serviceDescription: {
    type: String,
    default: '',
    validator: (value) => value.length <= 150
  }
})

const truncatedDescription = computed(() => {
  return props.serviceDescription.length > 120 
    ? props.serviceDescription.slice(0, 120) + '...' 
    : props.serviceDescription
})

const isModalOpen = ref(false)
const selectedDate = ref('')
const selectedTime = ref('')

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  // reseta os campos quando o modal é fechado
  selectedDate.value = ''
  selectedTime.value = ''
}

const confirmSchedule = () => {
  // local para adicionar logica futura
  // por agora, so fecha o modal, adicionarei o alerta em breve também!
  closeModal()
}
</script>