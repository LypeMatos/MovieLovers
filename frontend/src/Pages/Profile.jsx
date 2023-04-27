import axios from "../api/api";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState();
    const { auth } = useAuth();

    useEffect(() => {

        const accessToken = auth?.accessToken;

        axios.get("/myprofile", {
            headers: {"Content-Type": "application/json", Authorization: `Bearer ${JSON.parse(accessToken)}`},
            withCredentials: true
        }).then((response) => {
            setUser(response.data);
        }).catch((error) => {
            console.log(error);
        })


    })

  return (
    user? <div>Teste</div> : <div>Não tem usuário</div>
  )
}

export default Profile