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
    
    if(userInfo)
     return userInfo.prestador;
    
    return false
}

export default {
    getUserInfo,
    userIsPrestador
}