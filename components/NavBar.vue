<template>
    <div 
        v-if="mostrarNavBar" 
        class="w-screen h-20 sticky top-0 bg-white drop-shadow-md flex items-center px-4 justify-between"
    >
      
        <img :src="icone" class="w-10 h-10 border border-neutral-300 rounded-full drop-shadow-sm" >
        <div class="flex gap-4">
            <ButtonInbox v-if="usuarioPrestador"/>
            <button 
                class="bg-neutral-50 max-w-72 px-3 h-10 rounded-md border border-neutral-200 flex items-center justify-center cursor-pointer focus:outline-none hover:bg-neutral-100"
                @click="() => modalAberto = !modalAberto"   
            >   
                <img src="/icons/user_template.svg" class="mr-2">
                <span class="text-sm text-neutral-700 truncate">Boas vindas, <b>{{ nomeUsuario }}</b></span>
                <img src="/icons/chevron_up.svg" :class="{'rotate-180': !modalAberto}">
            </button>
        </div>
        <DropdownUsuarioInfo :visivel="modalAberto" />
    </div>
</template>

<script setup>

import userService from '~/services/userService';

// Assets
import RoboSolicitador from '~/public/images/robot.png'
import RoboPrestador from '~/public/images/robo_prestador.png'

const modalAberto = ref(false);

const usuarioPrestador = computed(() => {
    return userService.userIsPrestador() 
});
onMounted(() => {
})

const icone = computed(() => {
    return usuarioPrestador.value ? RoboPrestador : RoboSolicitador;
})


const mostrarNavBar = computed(() => {
    if(isClientSide()) return !window.location.href.includes('/login');
    else return false;
})

const nomeUsuario = computed(() => {
    return userService.getUserInfo().nome;
})

</script>