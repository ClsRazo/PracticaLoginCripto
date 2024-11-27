import React, {useState} from "react";
//Esta biblioteca se puede usar para el hash de la contraseña, se instala con npm install crypto-browserify
//Pero me está dando problemas porque webpack 5 no lo soporta, así que lo dejo comentado
// import {createHash} from "crypto-browserify";

//Usaré la Web Crypto API mejor, es más proceso, pero funciona

//Para los links
import {Link} from "react-router-dom";

const FormsLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

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
    };

    return (
      <div>
        <h1>Iniciar sesión</h1>
          <form onSubmit={handleLogin}>
            <div>
              <label>Usuario:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <button type="submit">Iniciar sesión</button>
          </form>

          <div>
            <p>
              ¿Aún no tienes cuenta? Crea una <Link to="/registro">Aquí</Link>
            </p>
            <p>
               <Link to="/recuperar-password">Olvidé mi contraseña</Link>
            </p>
          </div>
      </div>
    );
};

export default FormsLogin;