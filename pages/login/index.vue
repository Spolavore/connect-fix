<template>
  <div class="w-screen h-screen flex justify items-center overflow-hidden">
    <BarraLateral :login-prestador="loginPrestador"/>
    <div class="flex items-center justify-center w-full h-full flex-col z-10">
      <h2 class="text-3xl font-semibold text-blue-800">{{ textoBoasVindas }}</h2>
      <span class="text-neutral-500 text-lg">Entre para acessar a plataforma</span>

      <form @submit.prevent="handleLogin">
        <div class="flex flex-col gap-4 w-96 mt-10">
          <span class="flex flex-col">
            E-mail
          <input  v-model="email" type="email" class="input-padrao" required/>
          </span>
          <span class="flex flex-col gap-2">
          Senha
          <div class="flex gap-2">
            <input v-model="senha" :type="visilibidadeSenha" class="input-padrao" required ref="senhaInput"/>
            <img v-if="senha" :src="iconeVisibilidade" @click="() => mostrarSenha = !mostrarSenha" class="cursor-pointer" >
          </div>
          </span>
          <div 
            v-if="!realizandoLogin"
            class="flex justify-end gap-2">
            <button class="w-24 h-9 botao-cinza">Cadastrar</button>
            <button class="w-24 h-9 botao-azul" type="submit">Logar</button>
          </div>
          <div
            v-else
            class="flex justify-end"
          >
          <div class="botao-azul w-24 h-9 flex justify-center items-center cursor-not-allowed">
            <img src="/icons/loading_sphere.svg" class="animate-spin ">
          </div>
          </div>
          <div class="flex flex-col w-full items-center mt-6">
            <span class="text-neutral-500 text-base underline cursor-pointer" @click="toggleLoginPrestador">{{ textoTipoLogin }}</span>
          </div>
        </div>
      </form>
    </div>
    <Toast 
      v-if="mostrarToast" 
      :texto="mensagemToast" 
      status="erro"  
      @fecharToast="() => mostrarToast = false"/>
</div>
</template>

<script setup>
// Assets
import VisibilidadeOn from '~/public/icons/visibility.svg'
import VisibilidadeOFF from '~/public/icons/visibility_off.svg'

// Services
import requestService from '~/services/requestService';
import api_urls from '~/utils/Constants';

const email = ref('');
const senha = ref('');
const mostrarSenha = ref(false);
const loginPrestador = ref(false);
const realizandoLogin = ref(false);
const mensagemToast = ref('');
const mostrarToast = ref(false);

const visilibidadeSenha = computed(() => {
  return mostrarSenha.value ? 'text' : 'password';
});

const iconeVisibilidade = computed(() => {
  return mostrarSenha.value ? VisibilidadeOFF : VisibilidadeOn;
})

const textoTipoLogin = computed(() => {
  return loginPrestador.value ? 'Entrar como solicitador' : 'Entrar como prestador'
})

const textoBoasVindas = computed(() => {
  return loginPrestador.value ? 'Boas-vindas Prestador' : 'Boas-vindas ao Connect & Fix'
})


onMounted(() => {
  if(isClientSide()){
    if(localStorage.getItem('user-info')) localStorage.removeItem('user-info')
  }
})

const handleLogin = async () => {
  realizandoLogin.value = true;
  const options  = {
    url: api_urls().login,
    data: {
      email: email.value,
      senha: senha.value,
      prestador: loginPrestador.value
    },
    callback: (response) => {
      localStorage.setItem('user-info', response.token);
      return navigateTo('/');
    },
    errorCallback: (error) => {
      mostrarToast.value = true;
      mensagemToast.value = error.response.data
    }
  }
  await requestService.postRequest(options);
  realizandoLogin.value = false;
}

const toggleLoginPrestador  = () =>{
  loginPrestador.value = !loginPrestador.value;
}
</script>

