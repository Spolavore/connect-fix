<template>
    <NavBar/>
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