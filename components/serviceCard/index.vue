<template>
  <div class="w-full max-w-full border-2 border-[#3B82F6] rounded-lg p-4 flex flex-col">

    <Toast 
      v-if="showToast" 
      :texto="toastTexto" 
      :status="toastStatus" 
      @fecharToast="fecharToast"
    />

    <h2 class="text-xl font-medium text-gray-800 mb-2">{{ serviceTitle }}</h2>
    <h3 class="text-base font-light text-gray-600 mb-3">{{ professionalName }}</h3>
    
    <p class="text-base text-gray-700 mb-4 flex-grow">
      {{ limiteCaracteres }}
    </p>
    
    <button 
      v-if="mostrarBotao"
      @click="openModal" 
      class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
    >
      Solicitar
    </button>

    <!-- modal de agendamento -->
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
        
        <form @submit.prevent="confirmSchedule">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Selecione a Data</label>
            <input 
              type="date" 
              v-model="selectedDate" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Selecione o Horário</label>
            <input 
              type="time" 
              v-model="selectedTime" 
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <button 
            type="submit"
            class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Confirmar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// props do componente
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
  },
  mostrarBotao: {
    type: Boolean,
    default: true,
    required: false
  }
})

// limita o número de caracteres da descrição
const limiteCaracteres = computed(() => {
  return props.serviceDescription.length > 120 
    ? props.serviceDescription.slice(0, 120) + '...' 
    : props.serviceDescription
})

// Estado do modal
const isModalOpen = ref(false)
// Data selecionada
const selectedDate = ref('')
// Hora selecionada
const selectedTime = ref('')
// Controle de exibição do toast
const showToast = ref(false)
// Texto do toast
const toastTexto = ref('')
// Status do toast
const toastStatus = ref('')

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  // limpa os campos quando o modal é fechado
  selectedDate.value = ''
  selectedTime.value = ''
}

// Confirma o agendamento
const confirmSchedule = () => {
  showToast.value = true
  toastTexto.value = 'Agendamento confirmado com sucesso!'
  toastStatus.value = 'sucesso'

  closeModal()
}

const fecharToast = () => {
  showToast.value = false
}
</script>