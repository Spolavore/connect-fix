<template>
  <div class="overflow-hidden">
    <div
      class="w-96 h-20 bg-white absolute right-0 top-5 flex border border-neutral-200 rounded-s-lg drop-shadow-md animacaoToast "
    >
      <div
        class="relative left-0 h-full w-5 rounded-s-lg"
        :class="estiloBorda"
      ></div>
      <div class="w-full flex items-center justify-center gap-2">
        <img :src="iconeToast" />
        <span class="text-neutral-600 text-center">{{ texto }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import ErrorIcon from  "~/public/icons/error.svg";
import SucessoIcon from "~/public/icons/sucesso.svg"

onMounted(() => {
  setTimeout(() => {
    emits("fecharToast");
  }, 5000);
});

const props = defineProps(["texto", "status", "visivel"]);
const emits = defineEmits(["fecharModal"]);

const estiloBorda = computed(() => {
  switch (props.status) {
    case "erro":
      return "bg-red-500";
    case "sucesso":
      return "bg-green-500";
    default:
      return "";
  }
});

const iconeToast = computed(() => {
    switch(props.status){
        case "erro":
            return ErrorIcon;
        case "sucesso":
            return SucessoIcon;
    }
})
</script>

<style scoped>
@keyframes animacaoEntrada {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

@keyframes animacaoSaida {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.animacaoToast {
  animation: animacaoEntrada 600ms ease-out forwards, animacaoSaida 600ms ease-out forwards;
  animation-delay: 0ms, 3000ms; /* Pausa de 3 segundos antes de iniciar a animação de saída */
}

</style>
