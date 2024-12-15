<template>
<div 
    v-if="visivel"
    class="absolute top-16 right-4 drop-shadow-lg bg-neutral-100 w-56 flex flex-col rounded-md z-40"
>

    <div class="item" @click="() => navigateTo('/login')">Encerrar sessão</div>    
</div>
</template>

<script setup>
const props = defineProps(['visivel'])

</script>


<style scoped>
.item { 
    @apply cursor-pointer  hover:bg-neutral-300 hover:font-semibold p-3 text-neutral-700
}

</style>