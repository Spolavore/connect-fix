<template>
  <div class="w-screen h-screen flex justify items-center overflow-hidden">
    <BarraLateral :login-prestador="loginPrestador"/>
    <div class="flex items-center justify-center w-full h-full flex-col z-10">
      <h2 class="text-3xl font-semibold text-blue-800">{{ textoBoasVindas }}</h2>
      <span class="text-neutral-500 text-lg">Entre para acessar a plataforma</span>

      <div class="flex flex-col gap-4 w-96 mt-10">
        <span class="flex flex-col">
          E-mail
        <input  v-model="email" type="email" class="input-padrao"/>
        </span>
        <span class="flex flex-col gap-2">
        Senha
        <div class="flex gap-2">
          <input v-model="senha" :type="visilibidadeSenha" class="input-padrao"/>
          <img v-if="senha" :src="iconeVisibilidade" @click="() => mostrarSenha = !mostrarSenha" class="cursor-pointer" >
        </div>
        </span>
        <div class="flex justify-end gap-2">
          <button class="w-24 h-9 botao-cinza">Cadastrar</button>
          <button class="w-24 h-9 botao-azul">Logar</button>
        </div>
        <div class="flex flex-col w-full items-center mt-6">
          <span class="text-neutral-500 text-base underline cursor-pointer" @click="() => loginPrestador = !loginPrestador">{{ textoTipoLogin }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import VisibilidadeOn from '~/public/icons/visibility.svg'
import VisibilidadeOFF from '~/public/icons/visibility_off.svg'


const email = ref('');
const senha = ref('');
const mostrarSenha = ref(false);
const loginPrestador = ref(false);

const visilibidadeSenha = computed(() => {
  return mostrarSenha.value ? 'text' : 'password';
});

const iconeVisibilidade = computed(() => {
  return mostrarSenha.value ? VisibilidadeOn : VisibilidadeOFF;
})

const textoTipoLogin = computed(() => {
  return loginPrestador.value ? 'Entrar como solicitador' : 'Entrar como prestador'
})

const textoBoasVindas = computed(() => {
  return loginPrestador.value ? 'Boas-vindas Prestador' : 'Boas-vindas ao Connect & Fix'
})
</script>

