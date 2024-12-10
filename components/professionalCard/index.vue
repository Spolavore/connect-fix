<template>
    <div class="w-full max-w-full border-2 border-[#3B82F6] rounded-lg p-4 flex flex-col">
      <div class="flex items-center mb-4">
        <div class="w-16 h-16 bg-[#3B82F6] rounded-full mr-4"></div>
        
        <div>
          <h2 class="text-xl font-medium text-gray-800">{{ professionalName }}</h2>
          <h3 class="text-base font-light text-gray-600">{{ profession }}</h3>
        </div>
      </div>
      <!-- adicionarei um icone para cada profissão em breve-->
      <p class="text-base text-gray-700 mb-4 flex-grow">
        {{ truncatedDescription }}
      </p>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div class="flex mr-2">
            <svg v-for="n in 3" :key="n" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3B82F6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          </div>
          <span class="text-gray-700">{{ rating }}/10</span>
        </div>
        
        <button 
          @click="openModal" 
          class="bg-blue-500 text-white px-14 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Solicitar
        </button>
      </div>
  
      <!-- Modal de solicitação -->
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
    }
  })
  // limite de caracteres: 200.
  const truncatedDescription = computed(() => {
    return props.description.length > 200 
      ? props.description.slice(0, 200) + '...' 
      : props.description
  })
  
  const isModalOpen = ref(false)
  const serviceTitle = ref('')
  const serviceDescription = ref('')
  
  const openModal = () => {
    isModalOpen.value = true
  }
  
  const closeModal = () => {
    isModalOpen.value = false
    serviceTitle.value = ''
    serviceDescription.value = ''
  }
  
  const submitServiceRequest = () => {
    // local para adicionar logica futura
    // por enquanto so fecha o modal
    console.log('Service Request:', {
      title: serviceTitle.value,
      description: serviceDescription.value
    })
    closeModal()
  }
  </script>