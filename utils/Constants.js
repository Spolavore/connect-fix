// Constants.js

const api_urls = () => {
    const config = useRuntimeConfig();
    const apiUrl = config.public.apiBaseUrl;
  
    return {
      login: apiUrl + '/login',
      agendamentos: apiUrl + '/agendamentos',
      atualizarStatusAgendamento: apiUrl + '/atualizarStatusAgendamento',
      baixarCertificado: apiUrl + '/baixarCertificado',
      servicos: apiUrl + '/servico',
      criar_servico: apiUrl + '/servico',
      agendar_servico: apiUrl + '/realizarAgendamento',
      requerir_agendamento: apiUrl + '/requerirAgendamento',
      enviarAvaliacao: apiUrl + '/avaliarUsuario',

    };
  };
  
  export default api_urls;
  