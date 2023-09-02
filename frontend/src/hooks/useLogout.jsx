import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    
    const logout = () => {

        const { dispatch } = useAuthContext();
        
        //remove user from local storage of browser
        localStorage.removeItem('user');

        //dispatch a logout action
        dispatch({type: 'LOGOUT'});
    }

    return {logout}
} 