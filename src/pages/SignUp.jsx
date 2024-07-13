import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";

function SignUp() {

    const [success, toggleSuccess] = useState(false);
    const [error, toggleError] = useState(false);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        toggleSuccess(false);
        async function registerUser() {
          try {
              await axios.post(`http://localhost:3000/register`, {
                  username: data.username,
                  email: data.email,
                  password: data.password,
              })
              toggleSuccess(true);
              navigate("/signin");
          }  catch (error) {
              toggleError(true);
              console.log(error);
          }
        }
       void registerUser();
    }

return (
    <>
        <h1>Registreren</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
            harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur
            deserunt
            doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
        {error && <p>Sorry er is iets misgegaan.</p>}
        {!success ? <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="username">Gebruikersnaam:
                <input type="text"
                       name="username"
                       {...register("username", {required: true})}
                />
            </label>
            <label htmlFor="email">Emailadres:
                <input
                    type="email"
                    name="email"
                    {...register("email", {required: true})}
                />
            </label>
            <label htmlFor="password">Wachtwoord:
                <input
                    type="password"
                    name="password"
                    {...register("password", {required: true})}
                />
            </label>
            <button type="submit">Versturen</button>
        </form> : <p>Je account is aangemaakt!</p>}

        {!success && <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>}
    </>
);
}

export default SignUp;