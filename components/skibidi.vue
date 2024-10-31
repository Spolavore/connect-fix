<template>
    <span class="p-3 border rounded-md bg-sky-200 text-black text-xl cursor-pointer" @click="handleClick">{{ texto }}</span>
</template>

<script setup>
const props = defineProps(['texto']);
const emits = defineEmits(['botao-clicado'])

const handleClick = () => {
    alert('fui clicado')
    emits('botao-clicado', 'parametro-passado');
}
</script>