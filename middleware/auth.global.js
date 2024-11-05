export default defineNuxtRouteMiddleware((to, from) => {
  if (typeof window !== 'undefined') {
    console.log('entrei')
    const userInfo = localStorage.getItem('user-info');
    const nuxtApp = useNuxtApp();
    
    if (!userInfo && to.path !== '/login') {
      nuxtApp.hook('page:finish', () => {
        return navigateTo('/login');
      })
    };
  }
});
