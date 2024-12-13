<template>
  <NavBar />
  <div v-if="ehSolicitador">
    <div>
      <CatalogProfessionalSwitch 
        @toggle-services="toggleServiceCards" 
        @search="handleSearch"
        :is-primary-state="isPrimaryServiceState" 
      />
      <div class="flex justify-center w-full">
        <div class="w-3/4 grid grid-cols-3 gap-4">
          <ServiceCard 
            v-if="isPrimaryServiceState"
            v-for="service in filteredPrimaryServices"
            :key="service.id"
            :serviceTitle="service.titulo"
            :professionalName="service.nome"
            :serviceDescription="service.descricao"
          />

          <ProfessionalCard 
            v-else
            v-for="professional in filteredProfessionals"
            :key="professional.id"
            :professionalName="professional.nome"
            :profession="professional.profissao"
            :description="professional.descricao"
            :rating="professional.nota"
          />
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <h1>aqui ficarão as coisas do prestador</h1>
  </div>
</template>

<script setup>
import { jwtDecode } from 'jwt-decode'
import { ref, computed } from 'vue'

// Estado dos serviços
const isPrimaryServiceState = ref(true)

// dados catálogo (tomar cuidado para que cada serviço/prestador tenha um id unico!!!)
const primaryServices = [
  {
    id: 1,
    titulo: "Remendar encanamento",
    nome: "Mario Filho",
    descricao: "Descrição simples do problema, pra não confundir, só isso mesmo."
  },
  {
    id: 2,
    titulo: "Outro Serviço",
    nome: "Outro Profissional",
    descricao: "Outra descrição de serviço para teste de layout."
  },
  {
    id: 3,
    titulo: "Mais um Serviço",
    nome: "Mais um Profissional",
    descricao: "Mais uma descrição para garantir o layout correto."
  },
  {
    id: 4,
    titulo: "Outro Serviço",
    nome: "Outro Profissional",
    descricao: "Outra descrição de serviço para teste de layout."
  },
  {
    id: 5,
    titulo: "Mais um Serviço",
    nome: "Mais um Profissional",
    descricao: "Mais uma descrição para garantir o layout correto."
  },
]

// dados prestadores ]
const professionals = [
  {
    id: 1,
    nome: "Miguel Ohara",
    profissao: "eletricista",
    descricao: "Você deveria me contratar porque eu sou um cara mui-to legal com muitos anos de experiência no mer-cado de trabalho e eu sou extremamente compe-tente e nunca falhei na vida",
    nota: 4.2
  },
  {
    id: 2,
    nome: "João Silva",
    profissao: "encanador",
    descricao: "Especialista em resolução de problemas hidráulicos, com mais de 15 anos de experiência. Garantia de serviço de qualidade e atendimento rápido.",
    nota: 3.7
  },
  {
    id: 3,
    nome: "Pedro Santos",
    profissao: "eletricista",
    descricao: "Técnico especializado em instalações elétricas residenciais e comerciais. Segurança e eficiência em primeiro lugar.",
    nota: 5
  },
  {
    id: 4,
    nome: "Guilherme Santos",
    profissao: "encanador",
    descricao: "Especialista em resolução de problemas hidráulicos, com mais de 15 anos de experiência. Garantia de serviço de qualidade e atendimento rápido.",
    nota: 4.7
  },  
  {
    id: 5,
    nome: "Leonardo Young",
    profissao: "encanador",
    descricao: "Especialista em resolução de problemas hidráulicos, com mais de 15 anos de experiência. Garantia de serviço de qualidade e atendimento rápido.",
    nota: 4
  },
]

// estado de pesquisa
const searchQuery = ref('')

// método para alternar os serviços
const toggleServiceCards = () => {
  isPrimaryServiceState.value = !isPrimaryServiceState.value
}

// método de manipulação da pesquisa
const handleSearch = (searchData) => {
  searchQuery.value = searchData.query.toLowerCase()
}

// filtro de serviços
const filteredPrimaryServices = computed(() => {
  if (!searchQuery.value) return primaryServices
  
  return primaryServices.filter(service => 
    service.title.toLowerCase().includes(searchQuery.value)
  )
})

// filtro de profissionais
const filteredProfessionals = computed(() => {
  if (!searchQuery.value) return professionals
  
  if (searchQuery.value) {
    return professionals
      .filter(professional => 
        professional.profession.toLowerCase().includes(searchQuery.value)
      )
      // Ordena por nota em ordem decrescente quando na tela de profissionais
      .sort((a, b) => b.rating - a.rating)
  }
  
  return professionals
})

// verificar se é um solicitador, usando o localstorage
const ehSolicitador = computed(() => {
  if (isClientSide()) {
    const userInfo = localStorage.getItem('user-info')
    if (userInfo) {
      try {
        const decodedToken = jwtDecode(userInfo)
        return !decodedToken.prestador 
      } catch (error) {
        console.error('Erro ao decodificar token', error)
        return false
      }
    }
  }
  return false
})
</script>

<style scoped>
span {
  @apply text-3xl
}
</style>