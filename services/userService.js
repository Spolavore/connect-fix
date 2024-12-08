import {jwtDecode} from 'jwt-decode';

const getUserInfo = () => {
    if(isClientSide()){
        const userInfo = localStorage.getItem('user-info');
        if(userInfo){
            return jwtDecode(userInfo);
        }
        else {
            return navigateTo('/login');
        }
    } 
}


const userIsPrestador = () => {
    const userInfo = getUserInfo();
    return userInfo.prestador;
}

export default {
    getUserInfo,
    userIsPrestador
}