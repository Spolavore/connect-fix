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
              :min="getCurrentDate()"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Selecione o Horário</label>
            <input 
              type="time" 
              v-model="selectedTime" 
              min="06:00"
              max="23:00"
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
import requestService from '~/services/requestService';
import userService from '~/services/userService';
import api_urls from '~/utils/Constants';

// função para obter a data atual no formato YYYY-MM-DD
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// props do componente
const props = defineProps({
  idServico: {
    type: Number,
    required: false,
    default: -1
  },
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
  },
  idPrestador: {
    type: Number,
    required: false,
    default: -1
  },
})

// limita o número de caracteres da descrição
const limiteCaracteres = computed(() => {
  return props.serviceDescription.length > 120 
    ? props.serviceDescription.slice(0, 120) + '...' 
    : props.serviceDescription
})

// Validação de data e horário
const validateDateTime = () => {
  const today = new Date();
  const selectedDateTime = new Date(`${selectedDate.value}T${selectedTime.value}`);
  
  // Se a data selecionada é hoje, verifique o horário
  if (selectedDate.value === getCurrentDate()) {
    const currentTime = new Date();
    const [hours, minutes] = selectedTime.value.split(':').map(Number);
    
    // Verifica se o horário está entre 6h e 23h
    if (hours < 6 || hours > 23) {
      alert('Por favor, selecione um horário entre 6h e 23h');
      return false;
    }
    
    // Verifica se o horário selecionado não é anterior ao horário atual
    if (selectedDateTime < currentTime) {
      alert('Não é possível selecionar um horário passado');
      return false;
    }
  }
  
  return true;
}

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
const confirmSchedule = async() => {
  // Valida data e hora antes de submeter
  if (!validateDateTime()) {
    return;
  }

  const userInfo = userService.getUserInfo();
  const options = {
    url: api_urls().agendar_servico,
    data: {
      id_servico: props.idServico,
      id_prestador: props.idPrestador,
      id_solicitador: userInfo.id,
      dia: selectedDate.value,
      horario: selectedTime.value,
      criado_por: 'SOLICITADOR'
    },
    callback: () => {
      showToast.value = true
      toastTexto.value = 'Agendamento confirmado com sucesso!'
      toastStatus.value = 'sucesso'
      closeModal();
    },
    errorCallback: () => {
      showToast.value = true
      toastTexto.value = 'Falha ao agendar!'
      toastStatus.value = 'erro'
    }
  }
  await requestService.postRequest(options);
}

const fecharToast = () => {
  showToast.value = false
}
</script>