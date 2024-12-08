<template>
    <NavBar/>
    <div class="p-6">
      <ViewsHistorico v-if="usuarioPrestador"/>
    </div>
</template>

<script setup>
import userService from '~/services/userService';

const usuarioPrestador = computed(() => {
  const userInfo = userService.getUserInfo();
  return userInfo.prestador ? userInfo.prestador : false;
})


</script>

<style scoped>
span {
  @apply text-3xl
}


</style> 