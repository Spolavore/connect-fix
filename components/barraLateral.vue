<template>
    <div class="w-[700px] h-screen bg-sky-500 flex items-center justify-center flex-col overflow-hidden max-[800px]:hidden">
        <img :src="imagemIlustracao" class="w-64 drop-shadow-lg">
        <div class="flex flex-col">
            <span class="w-96  text-center mt-10 text-5xl text-white font-bold drop-shadow-lg">Connect & Fix</span>
            <span class="w-96  text-center  text-xl text-neutral-200">A plataforma que conecta você aos melhores serviços!</span>
        </div>

    </div>


</template>

<script setup>
import RoboSolicitador from '~/public/images/robot.png'
import RoboPrestador from '~/public/images/robo_prestador.png'



const props = defineProps(['loginPrestador'])

const imagemIlustracao = computed(() => {
   return props.loginPrestador ? RoboPrestador : RoboSolicitador
})
</script>