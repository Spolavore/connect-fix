<template>
    <div class="h-screen w-screen flex flex-col justify-center items-center">
        <div class="w-1/2 justify-center items-center h-2/3  border-black border-4 rounded-xl bg-green-700"> 
            <div class="h-1/6">
                <h1 class="w-full font-bold text-3xl flex items-center justify-center h-1/2 border-b-4 border-gray-400">CADASTRO</h1>
                <div class="flex justify-between h-1/2">
                    <button :class="btnUser()" class="btn" @click="toUser">Usuário Comum</button>
                    <button :class="btnProvider()" class="btn" @click="toProvider">Prestador de Serviço</button>
                </div>
            </div>   
            
            <div class=" justify-between flex flex-col h-5/6 bg-slate-600">
                <div class="inputDiv">
                    <p class=" inputDesc">Nome Completo:*</p>
                    <input class="inputRes w-full" type="text" placeholder=""  name="username">
                </div>
                <div class="inputDiv">
                    <p class="inputDesc ">Email:*</p>
                    <input class="inputRes w-full" type="email" placeholder=""  name="userEmail">
                </div>
                <div class="inputDiv">
                    <p class=" inputDesc">Cidade:*</p>
                    <input class="inputRes w-full" type="text" placeholder=""  name="userCity">
                </div>
                <div class="inputDiv">
                    <p class="inputDesc">Data Nascimento:*</p>
                    <input class="inputRes w-full" type="text" placeholder=''  name="userDate">
                </div>
                <div class="inputDiv" v-if="isProvider">
                    <p class=" inputDesc ">Localização:*</p>
                    <input class="inputRes w-full" type="text" placeholder=""  name="userCity">
                </div>
                <div class="inputDiv">
                    <p class="inputDesc ">Senha:*</p>
                    <input class="inputRes w-full" type="password" placeholder=""  name="userCity">
                </div>
                <div class="inputDiv">
                    <p class="inputDesc">Confirma Senha:*</p>
                    <input class="inputRes w-full" type="password" placeholder=""  name="userCity">
                </div>
            </div>
        </div>

        <button>ENVIAR</button>

    </div>

</template>

<script setup>
    const isProvider = ref(false)

    const toUser = () =>{
        isProvider.value = false;
    }

    const toProvider = () =>{
        isProvider.value = true;
    }

    const btnUser = () => {
        return{
            'border-white':!isProvider.value,
            'border-black':isProvider.value,
        };
    };

    const btnProvider = () =>{
        return{            
            'border-white':isProvider.value,
            'border-black':!isProvider.value,
        };
    }
   
</script>
<style scoped>
.btn{
    @apply w-1/2 h-full border-b-4 font-bold
}
.inputDiv{
    @apply flex-1
}
.inpuDesc{
    @apply h-1/3
}
.inputRes{
    @apply h-2/3
}
</style>