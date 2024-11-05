export const isClientSide = () => {
  const clientSide = ref(typeof window !== 'undefined');
  return clientSide.value
}
