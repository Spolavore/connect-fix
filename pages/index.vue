<template>
    <NavBar class="z-50"/>
    <div class="p-6 flex flex-col gap-6 z-40">
      <ViewsMeusServicos
        v-if="usuarioPrestador"
      />
      <ViewsHistorico/>
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