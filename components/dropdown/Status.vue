<template>
  <div 
      class="w-[250px] h-10 flex items-center justify-start border rounded-md px-2 gap-2"
      :class="{'border-neutral-200': !statusSelecionado, 'border-blue-200': statusSelecionado}"
  >
      <img src="/icons/search_icon.svg" class="w-5 h-5">
      <select 
          v-model="statusSelecionado" 
          class="outline-none w-full text-sm bg-transparent border-none"
      >
          <option value="" disabled>Selecione um status</option>
          <option v-for="status in opcoesStatus" :key="status" :value="status">
              {{ status }}
          </option>
      </select>
      <img 
          v-if="statusSelecionado"
          src="/icons/close_icon.svg" 
          class="w-5 h-5 cursor-pointer"
          @click="limparSelecao"
      />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const emits = defineEmits(['filtra-pesquisa']);
const opcoesStatus = ['PENDENTE', 'EM ANDAMENTO', 'EM CONFIRMACAO', 'CONCLUIDO', 'RECUSADO', 'CANCELADO'];
const statusSelecionado = ref('');

// Emite o valor sempre que o status é alterado
watch(statusSelecionado, (novoValor) => {
  emits("filtra-pesquisa", novoValor); // Emitindo o valor correto
});

// Função para limpar a seleção
const limparSelecao = () => {
  statusSelecionado.value = '';
  emits("filtra-pesquisa", ''); // Emitir vazio para resetar
};
</script>
