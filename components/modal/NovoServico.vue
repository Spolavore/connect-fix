<template>
    <div class="fixed inset-0 z-50 overflow-y-auto bg-[#9CA3AFA6] flex items-center justify-center">
        <div class="bg-white w-[444px] max-h-[90vh] overflow-y-auto rounded-md shadow-lg">
            <div class="sticky top-0 bg-white border-b w-full px-3 py-4 flex justify-between items-center z-10">
                <div class="w-6 h-6">
                </div>
                <span class="text-neutral-700 font-semibold text-center flex-grow"> 
                    Criar novo serviço 
                </span>
                <img 
                    src="/icons/close_icon.svg" 
                    class="cursor-pointer w-6 h-6" 
                    @click="fecharModal" 
                />
            </div>
            <div class="px-3 py-5 h-full justify-between flex flex-col items-center">
                <img src="/icons/add_servico.svg" class="w-16 h-16 mt-5" />
                <label class="w-3/4 mb-4">
                    Nome
                    <input type="text" v-model="titulo" class="input-padrao">
                </label>
                <label class="w-3/4 mb-10">
                    Descrição
                    <textarea type="text" v-model="descricao" class="input-padrao"/>
                </label>
                <div class="sticky bottom-0 bg-white border-t w-full py-3 flex justify-end">
                    <div v-if="!carregando" class="flex gap-5">
                        <button class="botao-cinza p-2" @click="fecharModal">Cancelar</button>
                        <button class="botao-verde p-2" @click="criarServico">
                            Criar Serviço
                        </button>
                    </div>
                    <span v-else class="botao-azul p-2">
                        <img src="/icons/loading_sphere.svg" class="animate-spin">
                    </span>
                </div>
            </div>
        </div>
    </div>
    <Toast
        v-if="mostrarToast"
        texto="Preencha todos os campos"
        status="erro"
        @fecharToast="() => mostrarToast = false"
    />
</template>

<script setup>
import requestService from '~/services/requestService';
import userService from '~/services/userService';
import api_urls from '~/utils/Constants';

const props = defineProps(['carregando']);
const emits = defineEmits(['fechar-modal', 'atualizar-lista']);

const titulo = ref('');
const descricao = ref('');
const carregando = ref(false);
const mostrarToast = ref(false);

const fecharModal = () => {
    emits('fechar-modal');
}

const criarServico = async () => {
    if(titulo.value == '' || titulo.value == '') {
        mostrarToast.value = true;
        return;
    }

    const idPrestador = userService.getUserInfo().id;
    carregando.value = true;
    const options = {
        url: api_urls().criar_servico,
        data: {
            idPrestador: idPrestador,
            titulo: titulo.value,
            descricao: descricao.value,
            criado_por: 'PRESTADOR'
        },
        callback: () => {
            emits('atualizar-lista');
            carregando.value = false;

        },
        errorCallback: (error) => {
            console.error(error);
        }
    }
    await requestService.postRequest(options);
}

</script>