import React, {useContext} from 'react';
import logo from '../assets/banana-01.png';
import {useNavigate, Link} from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function NavBar() {

    const authentication = useContext(AuthContext);
    const {logOut} = useContext(AuthContext);
    console.log(authentication.isAuthenticated);

    const navigate = useNavigate();

    return (
        <nav>
            <Link to="/">
          <span className="logo-container">
            <img src={logo} alt="logo"/>
            <h3>
              Banana Security
            </h3>
          </span>
            </Link>


            {!authentication.isAuthenticated ? <div>
                    <button
                        type="button"
                        onClick={() => navigate('/signin')}
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/signup')}
                    >
                        Registreren
                    </button>
                </div>
                :
                <button
                    type="button" onClick={() => logOut()}
                >
                    Sign out
                </button>
            }
        </nav>
    );
}

export default NavBar;