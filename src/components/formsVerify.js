import React, { useState } from "react";

import { useNavigate, useLocation } from 'react-router-dom';

import { BarraSuperiorInicio } from "./BarraSuperiorInicio";
import { FooterPG } from "./Footer";
import "../CSS/contenedor.css";

const FormsVerify = () => {
    const [mensajeError, setMensajeError] = useState('');
    const [code, setCode] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const {email, hashHex, username, code: initialCode, hora, expira} = location.state || {};


    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("Email:", email); // Usa los datos como prefieras
        console.log("HashHex:", hashHex);
        console.log("Username:", username);
        console.log("Code:", initialCode);
        console.log("Hora:", hora);
        console.log("Expira:", expira);

        if(code !== initialCode){
            setMensajeError("El código es incorrecto");
            console.log("El código es incorrecto");
            return;
        }

        setMensajeError("");

        if(code === initialCode){
            //Checamos las horas
            const horaActual = new Date().getTime();
            const horaExpiracion = new Date(expira).getTime();

            if(horaActual > horaExpiracion){
                setMensajeError("El código ha expirado");
                return;
            }

            //Si sí es válido, hacemos el registro en la BD
            const respuesta = await fetch("https://practicaloginback.onrender.com/register", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password: hashHex
                }),
            });
    
            const query = await respuesta.json();
            if(respuesta.ok){
                console.log("Usuario registrado correctamente");
                navigate('/');
            }else{
                console.log("Error al registrar el usuario: ", query.error);
            }
        }
    };

    return(
        <div>
            <BarraSuperiorInicio />
            <div className="mainContainer">
                <div>
                    <h1 className="titulo">Verificación de Correo Electrónico</h1>
                </div>
                <div className="card-datos">
                    <div className="parrafoCentrar">
                        <p>Se te ha enviado un correo a la dirección que proporcionaste con el código de verificación.</p>
                        <p>Por favor, introdúcelo a continuación:</p>
                    </div>
                    <form onSubmit={handleRegister}>
                        <div className="cuadroDatos">
                            <label>Código*:</label>
                            <input
                                type="text"
                                className="card-input"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                required
                            />
                        </div>
                        <div className='parrafoCentrar'>
                            {mensajeError && <p style={{color: 'red'}}>{mensajeError}</p>}
                        </div>
                        <div className="centrar">
                            <button type="submit" className="boton">Verificar</button>
                        </div>
                    </form>
                </div>
            </div>
            <FooterPG />
        </div>
    );
};

export default FormsVerify;