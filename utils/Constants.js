// Constants.js

const api_urls = () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBaseUrl;
  
    return {
      login: apiUrl + '/login',
      agendamentos: apiUrl + '/agendamentos',
      atualizarStatusAgendamento: apiUrl + '/atualizarStatusAgendamento'
    };
  };
  
  export default api_urls;
  