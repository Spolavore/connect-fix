// Constants.js

const api_urls = () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBaseUrl;
  
    return {
      login: apiUrl + '/login',
      agendamentosPendentes: apiUrl + '/agendamentosPendentes'
    };
  };
  
  export default api_urls;
  