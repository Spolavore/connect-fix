<template>
    <div>
        <h2 class="text-2xl text-blue-700 font-semibold">Meus Serviços</h2>
        <span> Aqui listamos todos os serviços relacionados ao seu perfil </span>
    </div>
</template>


<script setup>
import api_urls from '~/utils/Constants';
import userService from '~/services/userService';
import requestService from '~/services/requestService';

const servicosPrestadores = ref([]);
const carregando = ref('false');

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

</script>