<template>
    <div class="fixed inset-0 z-50 bg-[#9CA3AFA6] flex items-center justify-center">
        <div class="bg-white w-[444px] h-fit pt-5 rounded-md">
            <div class="border-b w-full px-3 pb-5 flex justify-between items-center">
                <span class="text-neutral-700 font-semibold">Avalie o {{ usuarioPrestador ? 'Solicitador' : 'Prestador' }}</span>
                <img src="/icons/close_icon.svg" class="cursor-pointer" @click="fecharModal" />
            </div>
            <div class="px-3 h-full justify-between flex flex-col items-center">
                <div class="flex gap-2 my-6">
                    <svg 
                        v-for="index in 5" 
                        :key="index" 
                        @click="selecionarEstrela(index)"
                        @mouseover="estrelaHover(index)"
                        @mouseleave="resetEstrelaHover"
                        xmlns="http://www.w3.org/2000/svg" 
                        width="48" 
                        height="48" 
                        viewBox="0 0 24 24" 
                        :fill="obterCorEstrela(index)"
                        class="cursor-pointer"
                    >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                </div>
                <span class="text-black p-2 text-center mb-5">
                    Como foi sua experiência? Avalie com estrelas.
                </span>
                <div class="flex w-full justify-end border-t py-3">
                    <div class="flex gap-5">
                        <button class="botao-cinza p-2" @click="fecharModal">Cancelar</button>
                        <button 
                            class="botao-azul p-2" 
                            @click="enviarAvaliacao"
                            :disabled="!avaliacaoSelecionada"
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    usuarioPrestador: {
        type: Boolean,
        default: false
    },
    servicoSelecionado: {
        type: Object,
        required: true
    }
});

const emits = defineEmits(['fechar-modal', 'enviar-avaliacao']);

const avaliacaoSelecionada = ref(0);
const estrelaHoverAtual = ref(0);

// Adicione este watch
watch(() => props.servicoSelecionado, () => {
    avaliacaoSelecionada.value = 0;
    estrelaHoverAtual.value = 0;
}, { immediate: true });

const selecionarEstrela = (index) => {
    avaliacaoSelecionada.value = index;
}

const estrelaHover = (index) => {
    estrelaHoverAtual.value = index;
}

const resetEstrelaHover = () => {
    estrelaHoverAtual.value = 0;
}

const obterCorEstrela = (index) => {
    // Se a estrela atual está abaixo ou igual à selecionada, pinta de azul
    if (index <= (estrelaHoverAtual.value || avaliacaoSelecionada.value)) {
        return "#095CAE"; 
    }
    return "#D1D5DB"; 
}

const fecharModal = () => {
    emits('fechar-modal');
}

const enviarAvaliacao = () => {
    if (avaliacaoSelecionada.value > 0) {
        emits('enviar-avaliacao', {
            idAgendamento: props.servicoSelecionado.id_agendamento,
            nota: avaliacaoSelecionada.value
        });
    }
}
</script>