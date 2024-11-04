import requestService from "./requestService";

export function mascaraCPF(cpf) {
    if(cpf === null)return;
    // Remove qualquer caractere que não seja número
    cpf = cpf.replace(/\D/g, "");

    // Aplica a máscara: XXX.XXX.XXX-XX
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    // Atualiza o valor do campo de input
    return cpf;
}
export function mascaraCEP(cep) {
    if(cep === null)return;
    // Remove qualquer caractere que não seja número
    cep = cep.replace(/\D/g, "");

    // Aplica a máscara: XXXXX-XXX
    cep = cep.replace(/(\d{5})(\d)/, "$1-$2");

    // Retorna o valor formatado
    return cep;
}
function formatarCEPSemPontuacao(cep) {
    return cep.replace(/\D/g, "");
}

export async function buscaPorCEP(cep){
    cep = formatarCEPSemPontuacao(cep)
    console.log(cep)
    const urka = `https://viacep.com.br/ws/${cep}/json/`
    const options = {
        url: urka
    }
    const resposta = await requestService.getRequest(options)
    return resposta
}

export function validarCPF(cpf) {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
    return cpfRegex.test(cpf);
}

export function validarCEP(cep) {
    const cepRegex = /^\d{5}-\d{3}$|^\d{8}$/;
    return cepRegex.test(cep);
}
