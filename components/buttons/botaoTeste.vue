<template>
  <div class="p-5 bg-sky-500 text-white hover:bg-sky-600 rounded-full cursor-pointer" @click="requisicao">
    Fazer requisicao
  </div>
  <div v-if="realizandoReq">
    Carregando...
  </div>
  <div v-else>
    {{ resposta }}
  </div>
</template>

<script setup>
import requestService from '~/services/requestService';

const realizandoReq = ref(false);
const resposta = ref('');

const requisicao = async() => {
  realizandoReq.value = true;
  const options = {
    url: 'http://localhost:6969/leonardo',
    callback: (res) => {
      resposta.value = res;
    }
  }
  await requestService.getRequest(options)
  realizandoReq.value = false;

}


</script>
