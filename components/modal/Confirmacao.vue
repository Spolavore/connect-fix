<template>
    <div class="fixed inset-0 z-50 bg-[#9CA3AFA6] flex items-center justify-center">
        <div class="bg-white w-[444px] h-fit pt-5 rounded-md">
            <div class="border-b w-full px-3 pb-5 flex justify-between items-center">
                <span class="text-neutral-700 font-semibold"> {{ titulo }}</span>
                <img src="/icons/close_icon.svg" class="cursor-pointer" @click="fecharModal" />
            </div>
            <div class="px-3 h-full justify-between flex flex-col items-center">
                <img src="/icons/warning.svg" class="w-16 h-16 mt-5" />
                <span class="text-black p-2 text-center mb-5">
                    {{ subtitulo }}
                </span>
                <div class="flex w-full justify-end border-t py-3">
                    <div v-if="!carregando" class="flex gap-5">
                        <button class="botao-cinza p-2" @click="fecharModal">Cancelar</button>
                        <button class="botao-azul p-2" @click="confirmarAcao">
                            {{ textoBotaoAcao }}
                        </button>
                    </div>
                    <span v-else class="botao-azul p-2">
                        <img src="/icons/loading_sphere.svg" class="animate-spin">
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
const props = defineProps(['titulo', 'subtitulo', 'textoBotaoAcao', 'carregando']);
const emits = defineEmits(['fechar-modal', 'botao-acao-clicado']);

const fecharModal = () => {
    emits('fechar-modal');
}
const confirmarAcao = () => {
    emits('botao-acao-clicado', 'CONFIRMAR');
}


</script>