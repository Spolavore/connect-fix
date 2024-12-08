<template>
  <div class="flex flex-col gap-5">
    <h2 class="text-2xl text-neutral-700 font-semibold flex flex-col ">Histórico e Agendamentos</h2>
    <div class="p-4 w-full border border-neutral-300 flex items-center rounded-lg">
      <span class="text-xl text-neutral-700">Filtrar</span>
    </div>
    <div class="rounded-md ">
      <!-- HEADERS -->
      <div class="w-full flex justify-between px-6 mb-2">
        <span class="header">Solicitador</span>
        <span class="header">Serviço</span>
        <span class="header">Data</span>
        <span class="header">Status</span>
        <span class="header">Ações</span>

      </div>
      <div
        v-for="item, index in itemsTabela"
        :key="index"
        class="bg-white p-6 flex justify-between items-center"
        :class="index % 2 == 0 && 'bg-blue-50'"
      >
    <span class="item-tam" >{{ item.nome_solicitador }} </span>
      <div class="flex flex-col item-tam h-fit ">
        <span class="text-wrap truncate" >{{ item.titulo }}</span>
        <span class="text-wrap truncate text-sm text-neutral-700" >{{ item.descricao }} </span>
      </div>
      <span class="item-tam" >{{ item.dt_dia }} as {{ item.dt_horario }}</span>
      <span class="item-tam" :class="estiloStatus(item.status)">{{ item.status }}</span>      
      <span class="item-tam">
        <button 
          class="p-2 bg-white text-[#095CAE] hover:bg-[#F3F7FF] font-normal border border-[#095CAE] rounded-md text-sm"
          v-if="item.status == 'EM ANDAMENTO' || item.status == 'EM CONFIRMAÇÃO'"
          @click="() => abrirModalConfirmacao = true"
        >
          Confirmar finalização
        </button>
      </span>      
        
      </div>

    </div>
  </div>
  <ModalConfirmacao 
    v-if="abrirModalConfirmacao"
    titulo="Confirmar finalização de serviço?"
    subtitulo="Essa é uma ação de duas fases, tanto o solicitador quanto o prestador devem confirmar a finalização do serviço para que o serviço seja finalizado"
    texto-botao-acao="Confirmar"
    @fechar-modal="() => abrirModalConfirmacao = false"
  />
</template>

<script setup>
import api_urls from '~/utils/Constants';
import userService from '~/services/userService';
import Utils from '~/utils/Utils';
import requestService from '~/services/requestService';

const itemsTabela = ref([]);
const carregandoHistorico = ref(false);
const abrirModalConfirmacao = ref(false);
onMounted(async() => {
 await buscarServicos();
})

const buscarServicos = async () => {
    carregandoHistorico.value = true;
    try {
        const idPrestador = userService.getUserInfo().id;
        const options = {
            url: api_urls().agendamentos + `/${idPrestador}`,
            callback: (response) => {
              itemsTabela.value = response;
            },
            errorCallback: (error) => {
              console.log(error);
              itemsTabela.value = [];
            }
        }
        await requestService.getRequest(options)
        console.log(itemsTabela.value)
    } catch (error) {
        console.log(error);
    }
    carregandoHistorico.value = false;
}

const estiloStatus = (status) => {
  switch(status){
    case 'RECUSADO':
      return 'text-red-600'
    case 'EM ANDAMENTO':
      return 'text-yellow-600'
    case 'CONCLUIDO':
      return 'text-green-600'
    case 'EM CONFIRMACAO':
      return 'text-blue-600'
    case 'PENDENTE':
      return 'text-black'
  }
}

</script>

<style scoped>

.item-tam {
  @apply text-base
}
.item-tam, .header {
  @apply basis-1/5 truncate pr-16 text-wrap 
}

.header {
  @apply font-semibold text-base
}
 
</style>