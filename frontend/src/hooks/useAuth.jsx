import api from "../api/api";

import { useState } from "react";

export default function useAuth() {
    const [authenticated, setAuthenticated] = useState(false);
    
    async function login(user){
        try {
            const data = await api.post('/auth/login', user).then(response => {
                return response.data;
            })

            const accessToken = data?.accessToken;
            if(accessToken){
                api.defaults.headers.Authorization = `Bearer ${accessToken}`;
            }

            setAuthenticated(true);
        } catch (error) {
            console.log(error);
        }
    }

    async function isAuthenticated(){
        console.log(api.defaults.headers.Authorization)
        if(api.defaults.headers.Authorization){
            setAuthenticated(true);
        }else {
            setAuthenticated(false);
        }

        return authenticated;
    }

    return { login, authenticated, isAuthenticated };
}