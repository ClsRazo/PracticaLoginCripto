import React, { useState } from "react";
//Biblioteca para la validacion de contraseñas, aparte de usar regex, será zxcvbn
import zxcvbn from "zxcvbn";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const aBufferToHex = (buffer) => {
        return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2,"0")).join("");
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        //Checamos que las dos contraseñas sean iguales
        if(password !== passwordConfirm){
            alert("Las contraseñas no coinciden");
            return;
        }

        //Checamos la fortaleza de la contraseña
        const resultado = zxcvbn(password);
        console.log("Fortaleza de la contraseña: ", resultado.score);

        if(resultado.score < 3){
            alert("La contraseña es muy débil");
            return;
        }

        const encoder = new TextEncoder(); //Para convertir la cadena a un arreglo de bytes
        const datos = encoder.encode(password); //.encode() convierte la cadena a un arreglo de bytes
        const hashBuffer = await window.crypto.subtle.digest("SHA-256", datos); //Genera el hash de la contraseña

        //Imprimimos el hash original
        console.log("Hash original: ", hashBuffer);

        //Convertimos el ArrayBuffer a hexadecimal
        const hashHex = aBufferToHex(hashBuffer);
        console.log("Hash hexadecimal: ", hashHex);

        const respuesta = await fetch("http://localhost:5000/register", {
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
        }else{
            console.log("Error al registrar el usuario: ", query.error);
        }
    };

    return(
        <div>
            <h1>Registro</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Nombre de Usuario:</label>
                    <input
                        type="text"
                        placeholder="JuanBrcs"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Correo electrónico:</label>
                    <input
                        type="email"
                        placeholder="example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Confirmar contraseña:</label>
                    <input
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;