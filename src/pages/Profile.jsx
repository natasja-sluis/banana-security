import React, {useEffect, useState} from 'react';
import {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from '/src/context/AuthContext';
import axios from "axios";

function Profile() {

    const [privateContent, setPrivateContent] = useState('');
    const {user} = useContext(AuthContext);

    useEffect(() => {
        const token = localStorage.getItem('token');

        async function getPrivateContent() {
            try {
                const response = await axios.get(`http://localhost:3000/660/private-content`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
                setPrivateContent(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getPrivateContent();
    }, []);

    return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong>{user.username}</p>
        <p><strong>Email:</strong>{user.email}</p>
      </section>
        {privateContent && <section>
            <h2>{privateContent.title}</h2>
            <p>{privateContent.content}</p>
        </section>}
        <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
    );
}

export default Profile;