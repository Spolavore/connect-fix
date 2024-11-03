<template>
<div>
  <h2>Home</h2>
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