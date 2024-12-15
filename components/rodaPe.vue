<template>
  <footer class="py-6 px-4 mt-10">
    <div class="container mx-auto flex flex-col items-center text-center">
      <div class="text-sm text-gray-600 mb-4">
        <a href="/termos-de-uso" class="hover:underline mr-4">
          Termos de Uso
        </a>
        <a href="/politica-privacidade" class="hover:underline">
          Política de Privacidade
        </a>
      </div>
      
      <p class="text-sm text-gray-500">
        © {{ currentYear }} Todos os Direitos Reservados
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SimpleFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear();
    }
  }
};
</script>

