import React, {useState} from "react";

import {Link} from "react-router-dom";

import { BarraSuperiorCerrar } from "./BarraSuperiorCerrar";
import { FooterPG } from "./Footer";
import "../CSS/contenedor.css";


const Home = () => {

    const [message, setMessage] = useState("¡Bienvenido!");

    return (
        <div>
            <BarraSuperiorCerrar />
            <div className="mainContainer">
                <div>
                    <h1 className="titulo">{message}</h1>
                </div>
                <div className="parrafoCentrar textoHome">
                    <p>Explora el fascinante mundo de la criptografia</p>
                </div>
                <section className="card-datos">
                    <h2 className="titulo2">Algunos datos curiosos sobre la criptografia:</h2>
                    <div>
                    <ul>
                        <li>
                            <Link to="/fact1" className="link-primary">
                                La máquina Enigma y la Segunda Guerra Mundial
                            </Link>
                        </li>
                        <li>
                            <Link to="/fact2" className="link-primary">
                                Criptografía de clave pública: la base de Internet
                            </Link>
                        </li>
                        <li>
                            <Link to="/fact3" className="link-primary">
                                Criptografía cuántica: el futuro de la seguridad
                            </Link>
                        </li>
                    </ul>
                    </div>
                </section>
            </div>
            <FooterPG />
        </div>
    );
};

export default Home;