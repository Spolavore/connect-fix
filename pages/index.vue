<template>
<div class="w-full h-20 bg-sky-50">
  <h2>Home</h2>
</div>
</template>

<script setup>


const handleEmit = (param) => {
  alert(param);
  mostrarMensagem.value = !mostrarMensagem.value;
}

onMounted(() => {
  console.log('ESTOU NA HOME')
})

</script>

<style scoped>
span {
  @apply text-3xl
}


</style> 