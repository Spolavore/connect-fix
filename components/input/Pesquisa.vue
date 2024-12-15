<template>
    <div 
        class="w-[250px] h-10 flex items-center justify-start border rounded-md px-2 gap-2"
        :class="{'border-neutral-200': !textoPesquisado.length > 0,  'border-blue-200': textoPesquisado.length > 0}"
    >
        <img src="/icons/search_icon.svg" class="w-5 h-5">
        <input type="text" v-model="textoPesquisado" :placeholder="placeholder" class="outline-none w-full  text-sm">
        <img 
            v-if="textoPesquisado.length > 0"
            src="/icons/close_icon.svg" 
            class="w-5 h-5 cursor-pointer"
            @click="() => textoPesquisado = ''"
        >

    </div>
</template>

<script setup>
const props = defineProps(['placeholder']);
const emits = defineEmits(['filtra-pesquisa']);
const textoPesquisado = ref('');

watch(textoPesquisado, () => {
    emits("filtra-pesquisa", textoPesquisado);
})

</script>