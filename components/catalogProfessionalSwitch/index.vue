<template>
  <div class="flex justify-center w-full py-8">
    <div class="w-3/4 flex flex-col">
      <div class="flex items-center justify-between mb-4">
        <h1 class="text-4xl font-bold" :class="isPrimaryState ? 'text-[#1E40AF]' : 'text-[#1E40AF]'">
          {{ isPrimaryState ? 'CATÁLOGO DE SERVIÇOS' : 'PROFISSIONAIS A POSTOS' }}
        </h1>
      </div>

      <p class="text-lg text-black">
        {{ isPrimaryState
          ? 'Soluções rápidas e confiáveis em elétrica, eletrônica e encanamento, feitas por quem entende do assunto!'
          : 'Soluções rápidas e confiáveis feitas por quem entende do assunto!'
        }}
      </p>

      <div class="mt-4">
        <button 
          @click="toggleServices"
          class="inline-block px-4 py-2 border-2 border-blue-700 text-blue-700 font-semibold rounded-lg transition-all hover:bg-blue-700 hover:text-white"
        >
          VER PRESTADORES DISPONÍVEIS
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

defineProps({
  isPrimaryState: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['toggle-services'])

const toggleServices = () => {
  emit('toggle-services')
}
</script>