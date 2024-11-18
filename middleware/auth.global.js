import {jwtDecode} from 'jwt-decode';

// Verifica se o usuario esta logado
export default defineNuxtRouteMiddleware((to, from) => {
  if (isClientSide()) {
    const userInfo = localStorage.getItem('user-info');
    if (!userInfo && to.path !== '/login' && to.path !== '/cadastrar') {
       // Utilizar o window.location pq forca o recarregamento da pagina e nao buga o estilo
       window.location.href = '/login'
    } else if (userInfo) {
      const decodedToken = jwtDecode(userInfo);
      const data = Date.now()/1000;
      // Se o token tiver expirado manda logar dnv
      if(decodedToken.exp - data <= 0)  window.location.href = '/login'
      
    }
  }
});
