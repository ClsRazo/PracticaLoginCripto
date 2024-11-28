import React, {useState} from "react";
//Esta biblioteca se puede usar para el hash de la contraseña, se instala con npm install crypto-browserify
//Pero me está dando problemas porque webpack 5 no lo soporta, así que lo dejo comentado
// import {createHash} from "crypto-browserify";

//Usaré la Web Crypto API mejor, es más proceso, pero funciona

//Para los links
import {Link, useNavigate} from "react-router-dom";

import { BarraSuperiorInicio } from "./BarraSuperiorInicio";
import { FooterPG } from "./Footer";
import "../CSS/contenedor.css";

const FormsLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    //
    const navigate = useNavigate();

    //Para convertir el ArrayBuffer a hexadecimal
    const aBufferToHex = (buffer) => {
      //Uint8Array recibe un ArrayBuffer y devuelve un array de enteros sin signo de 8 bits
      //El método map() crea un nuevo array con los resultados de la llamada a la función indicada aplicados a cada uno de sus elementos
      //El método toString(16) convierte un número a una cadena, representando el número en base 16
      //El método padStart() rellena la cadena actual con una cadena dada (repetida, si es necesario) de modo que la cadena resultante alcance una longitud dada (2)
      return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2,"0")).join("");
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        //Con la biblioteca crypto-browserify
        // const hash = createHash("sha3-256").update(password).digest("hex");
        // console.log("Hash generado: ", hash);

        //Con la Web Crypto API
        const encoder = new TextEncoder(); //Para convertir la cadena a un arreglo de bytes
        const datos = encoder.encode(password); //.encode() convierte la cadena a un arreglo de bytes
        const hashBuffer = await window.crypto.subtle.digest("SHA-256", datos); //Genera el hash de la contraseña
        //.digest() recibe el nombre de la función hash a utilizar y los datos en forma de: ArrayBuffer, TypedArray, DataView o Buffer
        //Además, regresa una promesa que resuelve en un ArrayBuffer que contiene el hash
        //Imprimimos el hash original
        console.log("Hash original: ", hashBuffer);

        //Convertimos el ArrayBuffer a hexadecimal
        const hashHex = aBufferToHex(hashBuffer);
        console.log("Hash hexadecimal: ", hashHex);

        //Enviamos el hash y usuario al servidor
        const respuesta = await fetch("https://practicaloginback.onrender.com/login",{
            method: "POST",
            headers:{
                "content-type": "application/json",
            },
            body: JSON.stringify({
                username,
                password: hashHex
            }),
        });

        const respuesta2 = await respuesta.json();
        console.log("Datos recibidos: ", respuesta2);

        //-----------------------Redirigir a Home Page----------------------------
        if(respuesta2.message == "Login exitoso"){
          console.log("Redirigiendo a Home");
          navigate("/home", {state: {username: username}});
        }
    };

    return (
      <div>
        <BarraSuperiorInicio />
        <div className="mainContainer">
          <div>
            <h1 className="titulo">Iniciar Sesión</h1>
          </div>
          <div className="card-datos">
            <div className="">
              <form onSubmit={handleLogin}>
                <div className="cuadroDatos">
                  <label>Usuario*:</label>
                  <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="card-input"
                    required
                  />
                </div>
                <div className="cuadroDatos">
                  <label>Contraseña*:</label>
                  <input
                    type="password"
                    // placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="card-input"
                    required
                  />
                </div>
                <div className="centrar">
                  <button type="submit" className="boton">
                    Iniciar sesión
                  </button>
                </div>
              </form>
              <div className="parrafoCentrar">
                <p>
                  ¿Aún no tienes cuenta?{" "}
                  <Link to="/registro" className="link-primary">
                    Crea una aquí
                  </Link>
                </p>
                <p>
                  <Link to="/recuperar-password" className="link-primary">
                    Olvidé mi contraseña
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <FooterPG />
      </div>
    );
};

export default FormsLogin;