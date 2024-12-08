<template>
  <div class="flex flex-col">
    <div class="w-fit">
      <!-- <span class="absolute top-3.5 rounded-full h-4 w-4 bg-sky-500 opacity-75 animate-ping cursor-pointer"></span>
      <span class="absolute top-3.5 rounded-full h-4 w-4 bg-sky-500 flex items-center justify-center text-white cursor-pointer text-xs"></span> -->
      <img
        src="/public/icons/inbox.svg"
        class="bg-neutral-100 w-10 p-2 rounded-md cursor-pointer hover:bg-neutral-200"
        @click="() => inboxAberto = !inboxAberto"
      />
    </div>
    <DropdownInbox v-if="inboxAberto"/>
  </div>
</template>

<script setup>

const inboxAberto  = ref(false)

</script>