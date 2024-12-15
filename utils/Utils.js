const formataData = (data) => {
  data  = data.split('T')[0];
  data = data.split('-');
  data = data.reverse();
  return data.join('/')
}

const formataHora = (hora) => {
  
}

export default {
  formataData
}
