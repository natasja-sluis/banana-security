import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useContext} from 'react';
import {useForm} from 'react-hook-form';
import {AuthContext} from '/src/context/AuthContext';
import axios from "axios";

function SignIn() {

    const [error, toggleError] = useState(false);
    const {logIn} = useContext(AuthContext);

    const {
        register,
        handleSubmit,
    } = useForm();

    const onSubmit = (data) => {
        async function loginUser() {
            toggleError(false);
            try {
                const response = await axios.post(`http://localhost:3000/login`, {
                    email: data.email,
                    password: data.password,
                });
                logIn(response.data.accessToken);
            } catch (error) {
                toggleError(true);
            }
        }

        void loginUser();
    }

    return (
        <>
            <h1>Inloggen</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id
                molestias qui quo unde?</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Emailadres:
                    <input
                        type="email"
                        name="email"
                        {...register("email", {required: true})}
                    />
                </label>
                <label htmlFor="password">Wachtwoord:
                    <input type="password"
                           name="password"
                           {...register("password", {required: true})}
                    />
                </label>
                <button type="submit">Inloggen</button>
            </form>
            {error && <p>Het inloggen is mislukt. Probeer het nogmaals.</p>}
            <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
        </>
    );
}

export default SignIn;