<template>
  <div class="w-full max-w-full border-2 border-[#3B82F6] rounded-lg p-4 flex flex-col">
    <Toast 
      v-if="showToast" 
      :texto="toastTexto" 
      :status="toastStatus" 
      @fecharToast="fecharToast"
      class="z-50"
    />
    
    <div class="flex items-center mb-4">
      <div class="w-16 h-16 bg-[#3B82F6] flex items-center justify-center rounded-full mr-4">
        <svg v-if="profession === 'eletricista'" xmlns="http://www.w3.org/2000/svg" width="24" height="44" viewBox="0 0 228 393" fill="none">
          <path d="M150.748 1.03156C149.219 2.03051 9.55351 188.142 2.21077 199.054C-0.848704 203.434 -0.69573 207.43 2.44023 210.426L4.81132 212.655H50.2445C93.0007 212.655 95.6777 212.732 95.6777 213.961C95.6777 214.73 88.7939 253.227 80.3804 299.563C71.9668 345.976 65.083 384.704 65.083 385.78C65.083 390.929 72.1963 394.771 76.862 392.158C80.3039 390.237 228 159.326 228 155.868C228 152.564 226.241 149.337 223.793 148.261C222.34 147.57 210.714 147.339 179.737 147.339H137.746L138.128 145.572C139.352 140.116 162.986 8.48525 162.986 7.02525C162.986 6.0263 162.068 4.10525 160.921 2.87577C158.32 -0.0442267 153.655 -0.88949 150.748 1.03156ZM130.097 98.16C124.666 128.359 120.154 154.178 120.154 155.561C120.154 158.788 121.148 160.786 123.442 162.093C124.743 162.861 134.686 163.168 165.051 163.476L204.977 163.86L147.153 254.303C115.335 304.097 89.1763 344.746 89.0999 344.593C88.9469 344.516 94.5304 313.087 101.491 274.897C109.139 232.634 113.958 204.433 113.652 202.973C113.423 201.666 112.352 199.745 111.281 198.746L109.292 196.902L66.9187 196.518L24.5449 196.134L82.0631 119.138C113.729 76.7979 139.734 42.3726 139.887 42.7568C140.04 43.141 135.604 68.0379 130.097 98.16Z" fill="white"/>
          <path d="M218 157.5C220.4 157.5 127.667 306.167 81 380.5L103 204H13L153 17L128 157.5H218Z" fill="white"/>
        </svg>
        <svg v-else-if="profession === 'encanador'" xmlns="http://www.w3.org/2000/svg" width="28" height="36" viewBox="0 0 318 393" fill="none">
          <path d="M209 297.933C209 264.6 209.4 232.867 209.8 227.267L210.733 217L205.4 217C198.467 217 187.4 211.4 182.333 205.267C174.867 196.067 174.333 192.6 174.333 146.733L174.333 105L105.667 105L37.0001 105L37.0001 159.533C37.0001 202.067 37.4 216.6 39.0001 225.8C46.3334 269 71 306.733 107.667 330.867C133.667 348.067 167.267 358.333 197.267 358.333L209 358.333L209 297.933Z" fill="white"/>
          <rect width="210" height="83" rx="41.5" fill="white"/>
          <rect x="318" y="183" width="210" height="83" rx="41.5" transform="rotate(90 318 183)" fill="white"/>
       </svg>
      </div>
      
      <div>
        <h2 class="text-xl font-medium text-gray-800">{{ professionalName }}</h2>
        <h3 class="text-base font-light text-gray-600">{{ profession }}</h3>
      </div>
    </div>

    <p class="text-base text-gray-700 mb-4 flex-grow">
      {{ limiteCaracteresDesc }}
    </p>
    
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="flex mr-2">
          <svg v-for="n in 1" :key="n" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3B82F6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
        <span class="text-gray-700">{{ rating }}/5</span>
      </div>
      
      <button 
        @click="openModal" 
        class="bg-blue-500 text-white w-[67%] py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Solicitar
      </button>
    </div>

    <!-- modal de solicitação com agendamento -->
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
        <h2 class="text-xl mb-4">Solicitar Serviço</h2>
        
        <form @submit.prevent="submitServiceRequest">
          <div class="mb-4">
            <label for="serviceTitle" class="block text-gray-700 mb-2">Título do Serviço</label>
            <input 
              id="serviceTitle"
              v-model="serviceTitle" 
              type="text" 
              required 
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite um título para o serviço"
            />
          </div>
          
          <div class="mb-4">
            <label for="serviceDescription" class="block text-gray-700 mb-2">Descrição do Serviço</label>
            <textarea 
              id="serviceDescription"
              v-model="serviceDescription" 
              required 
              rows="4"
              class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descreva detalhadamente o serviço solicitado"
            ></textarea>
          </div>
          
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
          
          <div class="flex justify-end space-x-2">
            <button 
              type="submit"
              class="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Enviar Solicitação
            </button>
          </div>
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

const props = defineProps({
  professionalName: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true,
    validator: (value) => ['eletricista', 'encanador'].includes(value)
  },
  description: {
    type: String,
    default: '',
    validator: (value) => value.length <= 200
  },
  rating: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 10
  },
  idPrestador: {
    type: Number,
    required: false,
    default: -1
  }
})

// variaveis toast 
const showToast = ref(false)
const toastTexto = ref('')
const toastStatus = ref('')

// limite de caracteres: 200.
const limiteCaracteresDesc = computed(() => {
  return props.description.length > 200 
    ? props.description.slice(0, 200) + '...' 
    : props.description
})

const isModalOpen = ref(false)
const serviceTitle = ref('')
const serviceDescription = ref('')
const selectedDate = ref('')
const selectedTime = ref('')

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  serviceTitle.value = ''
  serviceDescription.value = ''
  selectedDate.value = ''
  selectedTime.value = ''
}

const submitServiceRequest = () => {
  // Verifica se todos os campos foram preenchidos
  if (!serviceTitle.value || !serviceDescription.value || !selectedDate.value || !selectedTime.value) {
    alert('Por favor, preencha todos os campos')
    return
  }

  console.log('Service Request:', {
    title: serviceTitle.value,
    description: serviceDescription.value,
    date: selectedDate.value,
    time: selectedTime.value
  })
  requerirAgendamento();

}

const requerirAgendamento = async () => {
  const userInfo = userService.getUserInfo();
  const options = {
    url: api_urls().requerir_agendamento,
    data: {
      titulo : serviceTitle.value,
      descricao: serviceDescription.value,
      id_prestador: props.idPrestador,
      id_solicitador: userInfo.id,
      dia: selectedDate.value,
      horario: selectedTime.value,
      criado_por: 'SOLICITADOR'
    },
    callback: () => {
      // mostrando toast de sucesso
      showToast.value = true
      toastTexto.value = 'Solicitação de serviço enviada com sucesso!'
      toastStatus.value = 'sucesso'
      closeModal();
    },
    errorCallback: () => {
      // mostrando toast de sucesso
      showToast.value = true
      toastTexto.value = 'Erro na solicitação de serviço'
      toastStatus.value = 'erro'
    }
  }
  await requestService.postRequest(options);
}

const fecharToast = () => {
  showToast.value = false
}
</script>