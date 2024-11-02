<template>
    <div class="h-screen w-screen flex flex-col justify-center items-center">
        <div class="w-1/2 justify-center items-center h-4/5  border-black border-4 rounded-xl  bg-emerald-600"> 
            <div class="h-1/6">
                <h1 class="w-full font-bold text-3xl flex items-center justify-center h-1/2 border-b-4 border-black text-neutral-100">CADASTRO</h1>
                <div class="flex justify-between h-1/2">
                    <button :class="btnUser()" class="btn" @click="setProvider(false)">Usuário Comum</button>
                    <button :class="btnProvider()" class="btn" @click="setProvider(true)">Prestador de Serviço</button>
                </div>
            </div>   
            
            <div class=" justify-between flex flex-col h-5/6 bg-emerald-600">
                <div class="inputDiv">
                    <p class=" inputDesc">Nome Completo:*</p>
                    <input v-model="userData.nome" class="inputRes w-full" type="text" placeholder=""  name="username">
                </div>
                <div class="inputDiv">
                    <p class="inputDesc ">Email:*</p>
                    <input v-model="userData.email" class="inputRes w-full" type="email" placeholder=""  name="userEmail">
                </div>
                <div class="inputDiv">
                    <p class="inputDesc ">CPF:*</p>
                    <input v-model="userData.CPF" class="inputRes w-full" type="email" placeholder=""  name="userEmail">
                </div>
                <div class="inputDiv">
                    <p class="inputDesc">Data Nascimento:*</p>
                    <input v-model="userData.date" class="inputRes w-full" type="text" placeholder=''  name="userDate">
                </div>
                <div class="inputDiv" v-if="isProvider">
                    <p class=" inputDesc ">Localização:*</p>
                    <input v-model="userData.local" class="inputRes w-full" type="text" placeholder=""  name="userCity">
                </div>
                <div class="inputDiv" v-if="isProvider">
                    <p class=" inputDesc ">Encanador/Eletricista:*</p>
                    <input v-model="userData.prof" class="inputRes w-full" type="text" placeholder=""  name="userCity">
                </div>
                <div class="inputDiv">
                    <p class="inputDesc ">Senha:*</p>
                    <input v-model="userData.password" class="inputRes w-full" type="password" placeholder=""  name="userCity">
                </div>
                <div class="inputDiv">
                    <p class="inputDesc">Confirma Senha:*</p>
                    <input v-model="userData.sndPassword" class="inputRes w-full" type="password" placeholder=""  name="userCity">
                </div>
            </div>
        </div>

        <div class="w-fit">
            <NuxtLink class="btnFinal" to="/">VOLTAR</NuxtLink>
            <button class="btnFinal" @click="teste()">ENVIAR</button>
        </div>


    </div>

</template>

<script setup>
    //DADOS
    const isProvider = ref(false)
    const userData = ref( {
        isProvider: isProvider, 
        nome: '',
        email: '',
        date: '',
        CPF: '',
        prof: null,
        local: null,
        password: '',
        sndPassword:'',
    })
    
    //METODOS
    const setProvider= (bool) =>{
        isProvider.value = bool;
    }
    const teste = () =>{
        console.log(userData)
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