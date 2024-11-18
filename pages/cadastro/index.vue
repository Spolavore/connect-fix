<template>
    <div class="h-screen w-screen flex flex-col justify-center items-center overflow-x-hidden">
        <div class="w-1/2 justify-center items-center h-4/5  ">
            <div class="h-1/6">
                <h1 class="w-full font-bold text-3xl flex items-center justify-center h-1/2  text-blue-800">Cadastro
                </h1>
                <div class="flex justify-between h-1/2">
                    <button :class="btnUser()" class="btn" @click="setProvider(false)">Solicitador de Serviço</button>
                    <button :class="btnProvider()" class="btn" @click="setProvider(true)">Prestador de Serviço</button>
                </div>
            </div>
            <form @submit.prevent="handleSubmit" class=" justify-between flex flex-col space-y-3 pb-10 pt-5">
                <div class="inputDiv">
                    <p class=" inputDesc">Nome Completo:*</p>
                    <input v-model="userData.nome" required class="input-padrao w-full" type="text" placeholder=""
                        name="username">
                </div>
                <div class="inputDiv">
                    <p class="inputDesc ">Email:*</p>
                    <input v-model="userData.email" required class="input-padrao w-full" type="email" placeholder=""
                        name="userEmail">
                </div>
                <div class="inputDiv">
                    <p class="inputDesc ">CPF:*</p>
                    <input v-model="userData.cpf" required maxlength="14" class="input-padrao w-full" type="text"
                        placeholder="___ . ___ . ___ - __" name="userEmail">
                </div>
                <div class="inputDiv" v-if="isProvider">
                    <p class=" inputDesc ">CEP:*</p>
                    <input v-model="userData.cep" required class="input-padrao w-full" type="text" maxlength="9"
                        placeholder="_____-___" name="userCity">
                </div>
                <div class="inputDiv" v-if="isProvider">
                    <p class=" inputDesc ">Cidade:*</p>
                    <input :disabled="temResposta" v-model="userData.cidade" required class="input-padrao w-full"
                        type="text" placeholder="" name="userCity">
                </div>
                <div class="inputDiv" v-if="isProvider">
                    <p class=" inputDesc ">Estado:*</p>
                    <input :disabled="temResposta" v-model="userData.estado" required class="input-padrao w-full"
                        type="text" placeholder="" name="userCity">
                </div>
                <div class="inputDiv" v-if="isProvider">
                    <p class=" inputDesc ">Serviço Oferecido:*</p>
                    <select class="input-padrao w-full" v-model="userData.profissao">
                        <option value="encanador">Encanador</option>
                        <option value="eletricista">Eletricista</option>
                    </select>
                </div>
                <div class="inputDiv" v-if="isProvider">
                    <p class="inputDesc">Comprovante de profissão:*</p>
                    <label class="file-input-label">
                        <input @change="handleFileChange" required type="file" accept="application/pdf"
                            name="profissaoComprovante">
                        <div class="input-padrao w-full flex items-center">
                            {{ selectedFileName || 'Escolha o arquivo' }}
                        </div>
                    </label>
                </div>
                <div class="inputDiv">
                    <p class="inputDesc ">Senha:*</p>
                    <input v-model="userData.senha" required class="input-padrao w-full" type="password" placeholder=""
                        name="userCity">
                </div>
                <div class="inputDiv">
                    <p class="inputDesc">Confirma Senha:*</p>
                    <input class="input-padrao w-full" v-model="segSenha" required type="password" placeholder=""
                        name="userCity">
                </div>
                <div class="w-fit flex space-x-4 ">
                    <button @click="$router.back()" class="w-24 h-9 botao-border-azul">Voltar</button>
                    <button class="w-24 h-9 botao-azul">Enviar</button>
                </div>
            </form>
        </div>




    </div>

</template>

<script setup>
import requestService from '~/services/requestService';
import { buscaPorCEP, mascaraCPF, mascaraCEP } from '~/services/verificaInfos.js'
//DADOS
const segSenha = ref("")
const isProvider = ref(false)
const temResposta = ref(false)
const userData = reactive({
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
const setProvider = (bool) => {
    isProvider.value = bool;
}
const fazerRequest = async () => {
    let url = isProvider.value ? "http://localhost:6969/prestador" : "http://localhost:6969/solicitador"

    const options = {
        url: url,
        data: userData,
        callback: (res) => {
            alert("Usuario criado com sucesso")
        },
        errorCallback: (err) => {
            alert("Erro na criação do usuario")
        }
    }
    await requestService.postRequest(options)

}
const handleSubmit = () => {
    if (segSenha.value == userData.senha) {
        fazerRequest()
    } else {
        alert("senha tomou gap")
    }
}
//CONTROLADORES DE RENDERIZAÇÃO
const btnUser = () => {
    return {
        'border-b-4 border-blue-800': !isProvider.value,
        'border-none': isProvider.value,
    };
};

const btnProvider = () => {
    return {
        'border-b-4 border-blue-800': isProvider.value,
        'border-none': !isProvider.value,
    };
}

watch(userData, async () => {
    userData.cpf = mascaraCPF(userData.cpf)
    if (isProvider.value) {
        userData.cep = mascaraCEP(userData.cep)
        if (userData.cep.length == 9) {
            console.log(userData.cep)
            try {
                const resposta = await buscaPorCEP(userData.cep)
                if (resposta.cep) {
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

const selectedFileName = ref('');

const handleFileChange = (event) => {
    const file = event.target.files[0];
    selectedFileName.value = file ? file.name : '';
};

</script>
<style scoped>
.btn {
    @apply w-1/2 h-full border-b-4 font-bold text-blue-800 hover:bg-blue-200
}

.inputDiv {
    @apply flex-1 flex flex-col justify-center items-start
}

.inputDesc {
    @apply h-1/3 w-2/3 font-normal text-black
}

input[type="file"] {
    @apply hidden;
}

.file-input-label {
    @apply cursor-pointer w-full text-blue-800 hover:text-blue-600;
}
</style>