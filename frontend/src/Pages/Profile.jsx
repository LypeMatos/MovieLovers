import axios from "../api/api";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useParams } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState();
    const {id} = useParams();
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const accessToken = auth?.accessToken;

        axios.get(`/profile/${id}`).then((response) => {
            setUser(response.data.user);
        }).catch((error) => {
            console.log(error);
        })
    }, [])

  return (
    <section>
      {user && (
        <div>
          <p>{user.username}</p>
          <ul>
            <li>{user.watching}</li>
          </ul>
        </div>        
      )}
    </section>
  )
}

export default Profile