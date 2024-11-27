import React, {useState} from "react";

import {Link, useNavigate} from "react-router-dom";


const Home = () => {

    const [message, setMessage] = useState("Bienvenido!");

    const navigate = useNavigate();


    const redirectFact1 = () => {
        navigate("/fact1");
    };

    const redirectFact2 = () => {
        navigate("/fact2");
    };

    const redirectFact3 = () => {
        navigate("/fact3");
    };


    return (
        <div>
            <header>
                <h1>{message}</h1>
                <p>Explora el fascinante mundo de la criptografia</p>
            </header>
            <section>
                <h2>Algunos datos curiosos sobre la criptografia:</h2>
                <ul>
                    <li>
                        <a onClick={redirectFact1}>
                            Dato 1: La máquina Enigma y la Segunda Guerra Mundial
                        </a>
                    </li>
                    <li>
                        <a onClick={redirectFact2}>
                            Dato 2: Criptografía de clave pública: la base de Internet
                        </a>
                    </li>
                    <li>
                        <a onClick={redirectFact3}>
                            Dato 3: Criptografía cuántica: el futuro de la seguridad
                        </a>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Home;