<template>
  <NavBar class="z-50"/>
    <div class="p-6 flex flex-col gap-6 z-40">
      <ViewsCatalogo&profissionais v-if="!usuarioPrestador />
      <ViewsMeusServicos
        v-if="usuarioPrestador"
      />
      <ViewsHistorico/>
    </div>
  <RodaPe/>
</template>

<script setup>
import userService from '~/services/userService';

const usuarioPrestador = computed(() => {
  const userInfo = userService.getUserInfo();
  return userInfo.prestador ? userInfo.prestador : false;
})

</script>