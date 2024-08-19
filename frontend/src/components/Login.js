import React, {Component} from "react";
import Button from '@mui/material/Button';
import { auth, GoogleAuthProvider, signInWithPopup } from "../inicializers/firebase";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.login=this.login.bind(this);
    }
    login() {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).then(function(result) {
            const user = result.user;
            sessionStorage.setItem("name", user.displayName);
            sessionStorage.setItem("email", user.email);
            window.location.reload(); // Refresh de la página
        }).catch(function(error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div>
                <Button color="primary" variant="outlined" onClick={this.login}>
                    Iniciar sesión
                </Button>
            </div>
        );
    }
}
