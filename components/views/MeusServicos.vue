<template>
    <div class="flex flex-col gap-2">
        <div class="flex w-full justify-between items-center mb-3">
            <div class="flex flex-col gap-2">
                <h2 class="text-2xl text-blue-700 font-semibold">Meus Serviços</h2>
                <span> Aqui listamos todos os serviços relacionados ao seu perfil </span>
            </div>
            <div >
                <button 
                    class="botao-verde p-3 text-md flex gap-2 items-center"
                    @click="() => abrirModal = !abrirModal"
                > 
                    <img src="/icons/add_icon.svg" class="w-5 h-5"/>
                    Criar Serviço 
                </button>
            </div>
        </div>
        <div 
            v-if="carregando"
            class="w-full border border-neutral-200 rounded-md h-72 flex items-center justify-center drop-shadow-lg"
        >
            
            <img class="animate-spin w-16" src="/icons/loading_circle.svg" >
        </div>
        <div 
            v-else-if="temServicos"
            class="flex gap-2 flex-wrap"
        >
            <ServiceCard
                v-for="servico, index in servicosPrestadores"
                :serviceTitle="servico.titulo"
                :professionalName="servico.nome"
                :serviceDescription="servico.descricao"
                :key="index" 
                :mostrar-botao="false"
                class="basis-1/4 flex"
            />
        </div>
        <div 
            v-else
            class="w-full border border-neutral-200 rounded-md h-72 flex items-center justify-center drop-shadow-lg flex flex-col gap-2"
        >
            <img src="/images/no-results.png" class="w-20 h-20">
            <span class="text-md text-neutral-700">Não encontramos nenhum serviço relacionado ao seu perfil</span>
            <span class="font-bold text-green-500">Crie seu primeiro serviço</span>
        </div>
        <ModalNovoServico
            v-if="abrirModal"
            @fechar-modal="() => abrirModal = false"
            @atualizar-lista="atualizarLista"

        />
    </div>
</template>


<script setup>
import api_urls from '~/utils/Constants';
import userService from '~/services/userService';
import requestService from '~/services/requestService';

const servicosPrestadores = ref([]);
const carregando = ref(false);
const abrirModal = ref(false);

onMounted(async() => {
    await buscarServicosPrestador()
})

const temServicos = computed(() => {
    return servicosPrestadores.value.length > 0;
})

const buscarServicosPrestador = async () => {
    const userInfo = userService.getUserInfo();
    const idPrestador = userInfo.id;
    carregando.value = true;
    const options = {
        url: api_urls().servicos + `/${idPrestador}`,
        callback: (response) => {
            console.log(response);
            servicosPrestadores.value = response;
        },
        errorCallback: (error) => {
            console.error(error);
        }
    }
    carregando.value = false;;
    await requestService.getRequest(options);

}

const atualizarLista = () => {
    abrirModal.value = false;
    buscarServicosPrestador();
}

</script>