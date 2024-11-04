<template>  
  <div class="w-screen h-screen flex items-center justify-center flex-col gap-[100px]">
    <NuxtLink to="/cadastro" class='w-auto p-3 rounded-b-md bg-green-700 text-white hover:bg-green-500 '> Cadastrar</NuxtLink>
    <img src="/images/leo.png" class="w-96 h-96 rounded-full animate-bounce delay-1000">
    
    <span :class="corTexto">Leo Heisler</span>
    <span v-if="mostrarMensagem">Mongoloide</span>
    <span v-else>Totoso</span>
    <div class="flex gap-5">
      <Skibidi texto="skibidi toilet" @botao-clicado="handleEmit"/>
      <ButtonsBotaoTeste/>
    </div>
  </div>

</template>

<script setup>



onMounted(() => {
  navigateTo('/login')
});

const handleEmit = (param) => {
  alert(param);
  mostrarMensagem.value = !mostrarMensagem.value;
}
</script>

<style scoped>
span {
  @apply text-3xl
}


</style> 