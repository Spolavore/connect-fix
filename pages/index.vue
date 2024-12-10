<template>
  <NavBar />
  <div>
    <CatalogProfessionalSwitch @toggle-services="toggleServiceCards" :is-primary-state="isPrimaryServiceState" />
    <div class="flex justify-center w-full">
      <div class="w-3/4 grid grid-cols-3 gap-4">
        <ServiceCard 
          v-if="isPrimaryServiceState"
          v-for="service in primaryServices"
          :key="service.id"
          :serviceTitle="service.title"
          :professionalName="service.professional"
          :serviceDescription="service.description"
        />

        <ProfessionalCard 
          v-else
          v-for="professional in professionals"
          :key="professional.id"
          :professionalName="professional.name"
          :profession="professional.profession"
          :description="professional.description"
          :rating="professional.rating"
        />
      </div>
    </div>
  </div>
</template>

<script setup>

// Estado dos serviços
const isPrimaryServiceState = ref(true)

// dados catálogo, faremos com um .map depois (?)
const primaryServices = [
  {
    id: 1,
    title: "Remendar encanamento",
    professional: "Mario Filho",
    description: "Descrição simples do problema, pra não confundir, só isso mesmo."
  },
  {
    id: 2,
    title: "Outro Serviço",
    professional: "Outro Profissional",
    description: "Outra descrição de serviço para teste de layout."
  },
  {
    id: 3,
    title: "Mais um Serviço",
    professional: "Mais um Profissional",
    description: "Mais uma descrição para garantir o layout correto."
  },
  {
    id: 2,
    title: "Outro Serviço",
    professional: "Outro Profissional",
    description: "Outra descrição de serviço para teste de layout."
  },
  {
    id: 3,
    title: "Mais um Serviço",
    professional: "Mais um Profissional",
    description: "Mais uma descrição para garantir o layout correto."
  },
]

// dados prestadores
const professionals = [
  {
    id: 1,
    name: "Miguel Ohara",
    profession: "eletricista",
    description: "Você deveria me contratar porque eu sou um cara mui-to legal com muitos anos de experiência no mer-cado de trabalho e eu sou extremamente compe-tente e nunca falhei na vida",
    rating: 9.2
  },
  {
    id: 2,
    name: "João Silva",
    profession: "encanador",
    description: "Especialista em resolução de problemas hidráulicos, com mais de 15 anos de experiência. Garantia de serviço de qualidade e atendimento rápido.",
    rating: 8.7
  },
  {
    id: 3,
    name: "Pedro Santos",
    profession: "eletricista",
    description: "Técnico especializado em instalações elétricas residenciais e comerciais. Segurança e eficiência em primeiro lugar.",
    rating: 9.5
  },
  {
    id: 2,
    name: "Guilherme Santos",
    profession: "encanador",
    description: "Especialista em resolução de problemas hidráulicos, com mais de 15 anos de experiência. Garantia de serviço de qualidade e atendimento rápido.",
    rating: 8.7
  },
]

// metodo para alternar os serviços
const toggleServiceCards = () => {
  isPrimaryServiceState.value = !isPrimaryServiceState.value
}

</script>

<style scoped>
span {
  @apply text-3xl
}
</style>