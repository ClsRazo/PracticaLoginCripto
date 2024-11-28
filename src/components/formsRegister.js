import React, { useState } from "react";
//Biblioteca para la validacion de contraseñas, aparte de usar regex, será zxcvbn
import zxcvbn from "zxcvbn";

import { useNavigate } from 'react-router-dom';

import { BarraSuperiorInicio } from "./BarraSuperiorInicio";
import { FooterPG } from "./Footer";
import "../CSS/contenedor.css";

//Reglas para la complejidad de la contraseña
//Minimo de caracteres: 12
//Al menos dos letras mayúsculas
//Al menos dos letras minúsculas
//Al menos dos números
//Al menos dos caracteres especiales

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [mensajeError, setMensajeError] = useState('');

    const navigate = useNavigate();

    const aBufferToHex = (buffer) => {
        return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2,"0")).join("");
    };

    //Para la validación de la contraseña con las reglas establecidas
    const regex = /^(?=.*[a-z]{2,})(?=.*[A-Z]{2,})(?=.*[0-9]{2,})(?=.*[\W_]{2,}).{12,}$/;


    const handleRegister = async (e) => {
        e.preventDefault();

        //Validamos la contraseña con las reglas establecidas
        if(!regex.test(password)){
            //Mostramos un mensaje abajo del input de la contraseña
            setMensajeError("La contraseña no cumple con las reglas establecidas");
            return;
        }

        //Checamos que las dos contraseñas sean iguales
        if(password !== passwordConfirm){
            //Mostramos un mensaje abajo del input de la confirmación de la contraseña
            setMensajeError("Las contraseñas no coinciden");
            return;
        }

        //Checamos la fortaleza de la contraseña con zxcvbn
        const resultado = zxcvbn(password);
        console.log("Fortaleza de la contraseña: ", resultado.score);

        if(resultado.score < 3){
            //Mostramos un mensaje abajo del input de la contraseña
            setMensajeError("La contraseña es muy débil");
            return;
        }

        setMensajeError("");

        const encoder = new TextEncoder(); //Para convertir la cadena a un arreglo de bytes
        const datos = encoder.encode(password); //.encode() convierte la cadena a un arreglo de bytes
        const hashBuffer = await window.crypto.subtle.digest("SHA-256", datos); //Genera el hash de la contraseña

        //Imprimimos el hash original
        console.log("Hash original: ", hashBuffer);

        //Convertimos el ArrayBuffer a hexadecimal
        const hashHex = aBufferToHex(hashBuffer);
        console.log("Hash hexadecimal: ", hashHex);

        //Enviamos al back el correo para que se mande el correo de verificacion antes de hacer el registro
        const verificacionRes = await fetch("https://practicaloginback.onrender.com/verificacion", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email
            }),
        });

        const verificacionQuery = await verificacionRes.json();

        //Checamos si no hubo error en el envio del correo con el código de verificación
        if(verificacionQuery.error){
            console.log("Error al enviar el correo de verificación: ", verificacionQuery.error);
            return;
        }

        console.log("Correo enviado correctamente, redirigiendo a la pantalla de verificación");
        //Redirigimos a la pantalla de verificacion, pero mandamos el correo, la contraseña en hash, username y el código de verificación
        navigate('/verificacion', {state: {email, hashHex, username, code: verificacionQuery.token, hora: verificacionQuery.hora, expira: verificacionQuery.expira}});
    };

    return(
        <div>
            <BarraSuperiorInicio />
            <div className="mainContainer">
                <div>
                    <h1 className="titulo">Registro</h1>
                </div>
                <div>
                    <div className="parrafoCentrar">
                        <p>Recuerda que la contraseña debe cumplir con las siguientes reglas:</p>
                    </div>
                    <div className="NoBottom">
                    <ul>
                        <li>Al menos 12 caracteres</li>
                        <li>Al menos dos letras mayúsculas</li>
                        <li>Al menos dos letras minúsculas</li>
                        <li>Al menos dos números</li>
                        <li>Al menos dos caracteres especiales</li>
                    </ul>
                    </div>
                </div>
                <div className="card-datos">
                    <form onSubmit={handleRegister}>
                        <div className="cuadroDatos">
                            <label>Nombre de Usuario*:</label>
                            <input
                                type="text"
                                className="card-input"
                                placeholder="JuanBrcs"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="cuadroDatos">
                            <label>Correo electrónico*:</label>
                            <input
                                type="email"
                                className="card-input"
                                placeholder="example@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="cuadroDatos">
                            <label>Contraseña*:</label>
                            <input
                                type="password"
                                className="card-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="cuadroDatos">
                            <label>Confirmar contraseña*:</label>
                            <input
                                type="password"
                                className="card-input"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                required
                            />
                        </div>
                        
                        <div className='parrafoCentrar'>
                            {mensajeError && <p style={{color: 'red'}}>{mensajeError}</p>}
                        </div>
                        <div className="centrar">
                            <button type="submit" className="boton">Registrarse</button>
                        </div>
                    </form>
                </div>
            </div>
            <FooterPG />
        </div>
    );
};

export default Register;