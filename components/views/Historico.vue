<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-1">
      <h2 class="text-2xl text-blue-700 font-semibold flex flex-col ">Histórico e Agendamentos</h2>
      <span cass="text-neutral-700 text-sm font-semibold ">Veja uma lista com todos os agendamentos relacionados ao seu perfil!</span>
      <div class="p-4 w-full border border-neutral-300 flex items-center rounded-lg gap-3 mt-4">
        <span class="text-xl text-neutral-700 mr-5">Filtrar</span>
        <InputPesquisa 
          :placeholder="usuarioPrestator ? 'Pesquise por solicitador...': 'Pesquise por prestador...'"
          @filtra-pesquisa="filtrarItemNome"
        />
        <InputPesquisa 
          placeholder="Pesquisa por status..."
          @filtra-pesquisa="filtrarItemsStatus"

        />

      </div>
    </div>
    <div 
      class="flex flex-col items-center justify-center gap-3 border border-neutral-200 rounded-md p-6"
      v-if="carregandoHistorico"
    >
      <img src="/icons/loading_circle.svg" class="animate-spin" >
    </div>
    <div 
      v-else-if="temServicos"
      class="flex flex-col gap-5"
    >
      <div class="rounded-md ">
        <!-- HEADERS -->
        <div class="w-full flex justify-between px-6 mb-2">
          <span class="header">{{ usuarioPrestator ? 'Solicitador' : 'Prestador'}}</span>
          <span class="header">Serviço</span>
          <span class="header">Data</span>
          <span class="header">Status</span>
          <span class="header">Ações</span>
  
        </div>
        <div
          v-for="item, index in itemsTabela"
          :key="index"
          class=" p-6 flex justify-between items-center"
          :class="{'bg-blue-50': index % 2 == 0 , 'bg-white': index % 2 != 0 }"
        >
      <span class="item-tam" >{{ usuarioPrestator ? item.nome_solicitador : item.nome_prestador}} </span>
        <div class="flex flex-col item-tam h-fit ">
          <span class="text-wrap truncate" >{{ item.titulo }}</span>
          <span class="text-wrap truncate text-sm text-neutral-700" >{{ item.descricao }} </span>
        </div>
        <span class="item-tam" >{{ item.dt_dia }} as {{ item.dt_horario }}</span>
        <span class="item-tam" :class="estiloStatus(item.status)">{{ item.status }}</span>      
        <span class="item-tam">
          <button 
            class="p-2 bg-white text-[#095CAE] hover:bg-[#F3F7FF] font-normal border border-[#095CAE] rounded-md text-sm w-full"
            v-if="mostrarBotaoConfirmacao(item)"
            @click="confirmarAcao(item)"
          >
            Confirmar finalização
          </button>
          <button 
            class="p-2 bg-white text-[#56C271] hover:bg-[#EEF9F1] font-normal border border-[#56C271] rounded-md text-sm w-full"
            v-if="item.status == 'CONCLUIDO'"
            @click="baixarCertificado(item)"
          >
            Baixar certificado
          </button>
        </span>      
        </div>
      </div>
    </div>
    <div 
      v-else
      class="flex flex-col items-center justify-center gap-3 border border-neutral-200 rounded-md p-6"
    >
      <img src="/images/sem-servicos.png" class="w-36 h-36"/>
      <h3 class="font-semibold text-lg w-72 text-center">Não encontramos nenhum serviço relacionado no momento :( </h3>
    </div>
  </div>
  <ModalConfirmacao 
    v-if="abrirModalConfirmacao"
    titulo="Confirmar finalização de serviço?"
    subtitulo="Essa é uma ação de duas fases, tanto o solicitador quanto o prestador devem confirmar a finalização do serviço para que o serviço seja finalizado"
    texto-botao-acao="Confirmar"
    :carregando="acaoSendoRealizada"
    @fechar-modal="() => abrirModalConfirmacao = false"
    @botao-acao-clicado="atualizarStatusServico"
  />
</template>

<script setup>
import api_urls from '~/utils/Constants';
import userService from '~/services/userService';
import requestService from '~/services/requestService';

const itemsTabela = ref([]);
const itemsTabelaBackup = ref([]);
const carregandoHistorico = ref(true);
const abrirModalConfirmacao = ref(false);
const servicoSelecionado = ref({});
const acaoSendoRealizada = ref(false);

const usuarioPrestator = computed(() => {
    return userService.userIsPrestador() 
});

const temServicos = computed(() => {
  return itemsTabela.value.length > 0;
})

onMounted(async() => {
 await buscarServicos();
})


const buscarServicos = async () => {
    carregandoHistorico.value = true;
    const userInfo = userService.getUserInfo();
    try {
        const idUsuario = userInfo.id;
        const tipoUsuario = usuarioPrestator ? 'prestador' : 'solicitador';
        const options = {
            url: api_urls().agendamentos + `/${idUsuario}` + `/${tipoUsuario}` ,
            callback: (response) => {
              itemsTabela.value = response;
              itemsTabelaBackup.value = [...itemsTabela.value];
            },
            errorCallback: (error) => {
              console.log(error);
              itemsTabela.value = [];
            }
        }
        await requestService.getRequest(options)
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

const mostrarBotaoConfirmacao = (item) => {
  const usuarioJaConfirmou = usuarioPrestator ? item.confirmacao_prestador : item.confirmacao_solicitador;
  return (item.status == 'EM ANDAMENTO' || item.status == 'EM CONFIRMACAO') && !usuarioJaConfirmou;
}

const confirmarAcao = (item) => {
  abrirModalConfirmacao.value = true;
  servicoSelecionado.value = item;
}

const atualizarStatusServico = async (status) => {
  acaoSendoRealizada.value = true;
  const tipoUsuario = usuarioPrestator ? 'prestador' : 'solicitador';
  let novoStatusServico;

  const idAgendamento = servicoSelecionado.value.id_agendamento;
  switch(status){
    case 'CONFIRMAR':
      const statusServico = servicoSelecionado.value.status;
      if(statusServico == 'EM ANDAMENTO'){
        novoStatusServico = 'EM CONFIRMACAO';
      }
      else if (statusServico == 'EM CONFIRMACAO'){
        novoStatusServico = 'CONCLUIDO';
      }
      break;
  }
  
  const options = {
    url:  api_urls().atualizarStatusAgendamento,
    data: {
      status: novoStatusServico,
      idAgendamento: idAgendamento,
      tipoUsuario: tipoUsuario
    },
    callback: () => {
      acaoSendoRealizada.value = false;
      buscarServicos();
    },
    errorCallback: (error) => {
      alert('Erro na requisicao')
      console.error(error);
    }
  }
  acaoSendoRealizada.value = false;
  await requestService.postRequest(options);
}

const filtrarItemsStatus = (textoPesquisado) => {

  const texto = textoPesquisado.value
  if(texto.length == 0){
    itemsTabela.value = itemsTabelaBackup.value;
    return
  } 
  itemsTabela.value = itemsTabelaBackup.value.filter( item => {
      return item.status.toUpperCase().includes(texto.toUpperCase())
  })
}

const filtrarItemNome = (textoPesquisado) => {
  const texto = textoPesquisado.value
  const campo = usuarioPrestator ? 'nome_solicitador' : 'nome_prestador';
  if(texto.length == 0) {
    itemsTabela.value = itemsTabelaBackup.value;
    return
  }
  
  itemsTabela.value = itemsTabelaBackup.value.filter( item => {
      return item[campo].toUpperCase().includes(texto.toUpperCase())
  })
}
const baixarCertificado = async (item) => {

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