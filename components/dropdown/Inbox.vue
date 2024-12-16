<template>
    <div class="absolute top-16 right-32 drop-shadow-lg bg-neutral-50 w-80 flex flex-col rounded-md z-50 ">
        <span class=" border-b-2  p-2 text-center">Caixa de mensagens</span>
        <div class="p-2 h-64 overflow-auto">
            <div 
                v-if="carregandoAgendamentos"
                class="flex items-center justify-center h-full"
            >
                <img src="/icons/loading_circle.svg" class="animate-spin w-10">
            </div>
            <div 
                v-else-if="!temServicosRequisitados"
                class="flex flex-col items-center gap-2 mt-5"
            >
                <img src="/images/sem-servicos.png" class="w-20" >
                <span class="text-base text-center netral-500">Não encontramos nenhum serviço requisitado</span>
                
            </div>
            <div 
                v-else
                class="flex flex-col gap-3"
            >
                <div 
                    v-for="agendamento, index in agendamentos"
                    :key="index"
                    class="flex text-sm justify-between items-center border p-2 rounded-lg border-neutral-300 bg-white "
                >
                  <div class="flex flex-col w-52">
                      <span><b class="text-blue-900">Título:</b> {{ agendamento.titulo }}</span>
                      <span><b class="text-blue-900">Descrição:</b> {{ agendamento.descricao }}</span>
                      <span ><b class="text-blue-900">Dia:</b> {{ Utils.formataData(agendamento.dt_dia)}} </span>
                      <span><b class="text-blue-900">Horário:</b>  {{ agendamento.dt_horario }} </span>
                  </div>

                  <div 
                    v-if="!acaoRealizada"
                    class="flex gap-2">
                    <img src="/icons/sucesso.svg" class="botao-acao" @click="handleAcaoAgendamento('aceitar', index)">
                    <img src="/icons/error.svg" class="botao-acao" @click="handleAcaoAgendamento('recusar', index)">
                  </div>
                  <div v-else-if="acaoRealizada && agendamentoSelecionado == index">
                    <img src="/icons/loading_circle.svg" class="animate-spin w-6 mr-4">
                  </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import requestService from '~/services/requestService';
import userService from '~/services/userService';
import api_urls from '~/utils/Constants';
import Utils from '~/utils/Utils';

const agendamentos = ref([]);
const carregandoAgendamentos = ref(false);
const acaoRealizada = ref(false);
const agendamentoSelecionado = ref('');

const temServicosRequisitados = computed(() => {
    return agendamentos.value.length > 0;
})

onMounted(async() => {
    await buscarServicos()
})

const buscarServicos = async () => {
    carregandoAgendamentos.value = true;
    try {
        const idPrestador = userService.getUserInfo().id;
        const options = {
            url: api_urls().agendamentos + `/${idPrestador}` + '/PRESTADOR/PENDENTE'
        }
        const agendamentosPendentes = await requestService.getRequest(options);
        agendamentos.value = agendamentosPendentes;
    } catch (error) {
        console.log(error);
    }
    carregandoAgendamentos.value = false;
}

const handleAcaoAgendamento = async (acao, index) => {
    agendamentoSelecionado.value = index;
    acaoRealizada.value = true;
    const status = acao == 'aceitar' ? 'EM ANDAMENTO' : 'RECUSADO'
    const agendamento = agendamentos.value[index];
    const options = {
        url: api_urls().atualizarStatusAgendamento,
        data: {
            status: status,
            idAgendamento: agendamento.id_agendamento,
        },
        callback: () => {
            buscarServicos();
        }
    }
    acaoRealizada.value = false;
    await requestService.postRequest(options);
}

</script>

<style scoped>

.botao-acao {
    @apply cursor-pointer hover:scale-125 transition-transform
}

</style>