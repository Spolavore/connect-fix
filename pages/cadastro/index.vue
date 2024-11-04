
<template>
    <div class="h-screen w-screen flex flex-col justify-center items-center">
        <div class="w-1/2 justify-center items-center h-4/5  border-black border-4 rounded-xl  bg-emerald-600"> 
            <div class="h-1/6">
                <h1 class="w-full font-bold text-3xl flex items-center justify-center h-1/2 border-b-4 border-black text-neutral-100">CADASTRO</h1>
                <div class="flex justify-between h-1/2">
                    <button :class="btnUser()" class="btn" @click="setProvider(false)">Solicitador de Serviço</button>
                    <button :class="btnProvider()" class="btn" @click="setProvider(true)">Prestador de Serviço</button>
                </div>
            </div>   
            <form @submit.prevent="handleSubmit" class=" justify-between flex flex-col h-5/6 bg-emerald-600">
                <div class="inputDiv">
                    <p class=" inputDesc">Nome Completo:*</p>
                    <input v-model="userData.nome" required class="inputRes w-full" type="text" placeholder=""  name="username">
                </div>
                <div class="inputDiv">
                    <p class="inputDesc ">Email:*</p>
                    <input v-model="userData.email" required class="inputRes w-full" type="email" placeholder=""  name="userEmail">
                </div>
                <div class="inputDiv">
                    <p class="inputDesc ">CPF:*</p>
                    <input v-model="userData.cpf" required maxlength="14" class="inputRes w-full" type="text" placeholder="___ . ___ . ___ - __"  name="userEmail">
                </div>
                <div class="inputDiv" v-if="isProvider">
                    <p class=" inputDesc ">CEP:*</p>
                    <input v-model="userData.cep" required class="inputRes w-full" type="text"  maxlength="9" placeholder="_____-___"  name="userCity">
                </div>
                <div class="inputDiv" v-if="isProvider">
                    <p class=" inputDesc ">Cidade:*</p>
                    <input :disabled="temResposta" v-model="userData.cidade" required class="inputRes w-full" type="text" placeholder=""  name="userCity">
                </div>
                <div class="inputDiv" v-if="isProvider">
                    <p class=" inputDesc ">Estado:*</p>
                    <input :disabled="temResposta" v-model="userData.estado" required class="inputRes w-full" type="text" placeholder=""  name="userCity">
                </div>
                <div class="inputDiv" v-if="isProvider">
                    <p class=" inputDesc ">Encanador/Eletricista:*</p>
                    <select v-model="userData.profissao">
                        <option value="encanador">Encanador</option>
                        <option value="eletricista">Eletricista</option>
                    </select>
                </div>
                <div class="inputDiv">
                    <p class="inputDesc ">Senha:*</p>
                    <input v-model="userData.senha" required class="inputRes w-full" type="password" placeholder=""  name="userCity">
                </div>
                <div class="inputDiv">
                    <p class="inputDesc">Confirma Senha:*</p>
                    <input class="inputRes w-full" v-model="segSenha" required type="password" placeholder=""  name="userCity">
                </div>
                <div class="w-fit">
                    <NuxtLink class="btnFinal" to="/">VOLTAR</NuxtLink>
                    <button class="btnFinal">ENVIAR</button>
                </div>
            </form>
        </div>




    </div>

</template>

<script setup>
    import requestService from '~/services/requestService';
    import {buscaPorCEP, mascaraCPF, mascaraCEP} from '~/services/verificaInfos.js'
    //DADOS
    const segSenha = ref("")
    const isProvider = ref(false)
    const temResposta = ref(false)
    const userData = reactive( {
        eProvedor: isProvider.value,
        nome: '',
        email: '',
        cpf: '',
        profissao: null,
        cep: null,
        cidade: null,
        estado: null,
        senha: '',
    })

    
    //METODOS
    const setProvider= (bool) =>{
        isProvider.value = bool;
    }
    const fazerRequest = async () =>{
        let url = isProvider.value ? "http://localhost:6969/prestador" : "http://localhost:6969/solicitador"
    
        const options = {
            url: url,
            data: userData,
            callback: (res) => {
                alert("Usuario criado com sucesso")
            },
            errorCallback: (err) =>{
                alert("Erro na criação do usuario")
            }
        }
        await requestService.postRequest(options)
        
    }
    const handleSubmit = () =>{
        if( segSenha.value == userData.senha){
            fazerRequest()
        }else{
            alert("senha tomou gap")
        }
    }
    //CONTROLADORES DE RENDERIZAÇÃO
    const btnUser = () => {
        return{
            'border-black':!isProvider.value,
            'border-netral-100':isProvider.value,
            'border-r-4': !isProvider.value
        };
    };

    const btnProvider = () =>{
        return{            
            'border-black':isProvider.value,
            'border-neutral-100':!isProvider.value,
            'border-l-4':isProvider.value
        };
    }

    watch(userData, async () =>{
        userData.cpf = mascaraCPF(userData.cpf)
        if(isProvider.value){
            userData.cep = mascaraCEP(userData.cep)
            if(userData.cep.length == 9){
                console.log(userData.cep)
                try {
                    const resposta = await buscaPorCEP(userData.cep)
                    if(resposta.cep){
                        userData.cidade = resposta.localidade
                        userData.estado = resposta.estado
                        temResposta.value = true
                    }
                } catch (error) {
                    console.log("nao peguei a viacep")
                }
            }
        }

    })
    

</script>
<style scoped>
.btn{
    @apply w-1/2 h-full border-b-4 font-bold text-neutral-100 hover:bg-emerald-800
}
.inputDiv{
    @apply flex-1 flex flex-col justify-center items-center 
}
.inputDesc{
    @apply h-1/3 w-2/3 font-semibold text-neutral-100
}
.inputRes{
    @apply h-max w-2/3
}
.btnFinal{
    @apply px-12 py-4 my-0 mx-4 border-l-4 border-r-4 border-b-4 border-black rounded-b-md  hover:bg-emerald-800 bg-emerald-600 text-neutral-100 font-semibold
}
</style>