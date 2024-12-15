<template>
  <NavBar />
  <div v-if="ehSolicitador">
    <ViewsCatalogo&profissionais />
  </div>
  <div v-else>
    <h1>aqui ficarão as coisas do prestador</h1>
  </div>
  <RodaPe/>
</template>

<script setup>
import { jwtDecode } from 'jwt-decode'
import { computed } from 'vue'

// verifica se é um solicitador, usando o localstorage
const ehSolicitador = computed(() => {
  if (typeof window !== 'undefined') {
    const userInfo = localStorage.getItem('user-info')
    if (userInfo) {
      try {
        const decodedToken = jwtDecode(userInfo)
        return !decodedToken.prestador 
      } catch (error) {
        console.error('Erro ao decodificar token', error)
        return false
      }
    }  
  }
  return false
})
</script>