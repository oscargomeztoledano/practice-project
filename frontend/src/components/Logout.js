import React, {Component} from "react";
import Button from '@mui/material/Button';
import { auth} from "../inicializers/firebase";
import { signOut } from "firebase/auth";

export default class Logout extends Component {
    constructor(props) {
        super(props);
        this.logout=this.logout.bind(this);
    }
    logout() {
        signOut(auth).then(result => {
            console.log(result);
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("email");
            window.location.reload(); // Refresh de la página
        }).catch(error => {
            console.log(error);
        });
    }
    render() {
        return (
            <div>
                <Button color="primary" variant="outlined" onClick={this.logout}>
                    Cerrar sesión
                </Button>
            </div>
        );
    }
}