import React from 'react';
import { Link } from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '/src/context/AuthContext';

function SignIn() {

    const {logIn} = useContext(AuthContext);

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

      <form>
        <p>*invoervelden*</p>
        <button onClick={() => logIn()}>Inloggen</button>
      </form>
      <p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>
    </>
  );
}

export default SignIn;