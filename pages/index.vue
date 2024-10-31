<template>
  <div class="w-screen h-screen flex items-center justify-center flex-col gap-[100px]">
    <img src="/images/leo.png" class="w-96 h-96 rounded-full animate-bounce delay-1000">
    <span :class="corTexto">Leo Heisler</span>
    <span v-if="mostrarMensagem">Mongoloide</span>
    <span v-else>Totoso</span>
    <Skibidi texto="skibidi toilet" @botao-clicado="handleEmit"/>
  </div>
</template>

<script setup>
const colors = ref([
  "green-500",
  "red-500",
  "blue-500",
  "pink-500",
  "yellow-500",
  "black",
]);

const color = ref(0);
const mostrarMensagem = ref(false); 

const corTexto = computed(() => {
  return "text-" + colors.value[color.value];
});

watch(color, () => {
  setTimeout(() => {
    color.value =
      color.value == colors.value.length - 1
        ? (color.value = 0)
        : color.value + 1;
  }, 1100);
});

onMounted(() => {
  color.value++;
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