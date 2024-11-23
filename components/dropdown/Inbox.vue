<template>
    <div class="absolute top-16 right-32 drop-shadow-lg bg-neutral-100 w-64 flex flex-col rounded-md z-50">
        <span class=" border-b-2  p-2 text-center">Caixa de mensagens</span>
        <div class="p-2">
            <div 
                v-if="!temServicosRequisitados"
                class="flex flex-col items-center gap-2 mt-5"
            >
                <img src="/images/sem-servicos.png" class="w-20" >
                <span class="text-base text-center netral-500">Não encontramos nenhum serviço requisitado</span>
                
            </div>
        </div>
    </div>
</template>

<script setup>

import requestService from '~/services/requestService';
import userService from '~/services/userService';
import api_urls from '~/utils/Constants';

const servicos = ref([]);

const temServicosRequisitados = computed(() => {
    return servicos.length > 0;
})

onMounted(async() => {
    await buscarServicos()
})

const buscarServicos = async () => {
    try {
        if(isClientSide()){
            const idPrestador = userService.getUserInfo().id;
            const options = {
                url: api_urls().agendamentosPendentes + `/${idPrestador}`
            }
            const agendamentosPendentes = await requestService.getRequest(options);
            console.log(agendamentosPendentes)

        }
    } catch (error) {
        
    }
}

</script>