import React, {useState} from "react";

import {Link, useNavigate} from "react-router-dom";

import { jsPDF } from "jspdf";

const Fact3Page = () => {

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Criptografía cuántica: el futuro de la seguridad", 10, 20);
        doc.setFontSize(12);
        doc.text(
          `La mecánica cuántica aplicada a la criptografía:
La criptografía cuántica se basa en las propiedades únicas de las partículas cuánticas. Por ejemplo:

    Superposición: Una partícula cuántica puede estar en múltiples estados al mismo tiempo, lo que permite codificar información de formas que son imposibles con sistemas clásicos.
    Entrelazamiento: Dos partículas pueden estar correlacionadas de tal manera que el estado de una afecta instantáneamente al estado de la otra, sin importar la distancia que las separa.
    Principio de incertidumbre: La simple observación de una partícula cuántica altera su estado, lo que hace que cualquier intento de espionaje sea detectable.

Quantum Key Distribution (QKD):
Uno de los métodos más prometedores de la criptografía cuántica es la Distribución de Claves Cuánticas. En un sistema QKD, dos partes (tradicionalmente llamados Alice y Bob) utilizan fotones para generar una clave compartida. Si un tercero (Eve) intenta interceptar los fotones, su presencia es detectada debido a las perturbaciones que introduce en los estados cuánticos. Esto garantiza una seguridad inquebrantable para la clave compartida.

La amenaza de las computadoras cuánticas:
Aunque las computadoras cuánticas aún están en sus primeras etapas, su potencial para romper algoritmos clásicos como RSA, ECC y AES está generando preocupación. Estas computadoras utilizan la capacidad de procesar grandes cantidades de información simultáneamente, lo que podría hacer obsoletos los sistemas criptográficos actuales.

Avances en redes cuánticas:
Varios países están invirtiendo en la investigación de redes cuánticas para proteger sus infraestructuras críticas. Por ejemplo, China ya ha construido un enlace de comunicación cuántica entre Beijing y Shanghái, mientras que la Unión Europea y Estados Unidos están explorando redes cuánticas para fines militares y civiles.

El futuro de la seguridad global:
La criptografía cuántica no solo protegerá datos sensibles contra amenazas futuras, sino que también abrirá nuevas posibilidades para la computación distribuida, la inteligencia artificial y la ciberseguridad en un mundo hiperconectado.`,
          10,
          30,
          { maxWidth: 180 }
        );
        doc.save("Quantum_Crypto.pdf");
      };

    return(
        <div>
            <h1>Criptografía cuántica: el futuro de la seguridad</h1>
            <p>
                La mecánica cuántica aplicada a la criptografía:
            </p>
            <p>
                La criptografía cuántica se basa en las propiedades únicas de las partículas cuánticas. Por ejemplo:
            </p>
            <p>
                Superposición: Una partícula cuántica puede estar en múltiples estados al mismo tiempo, lo que permite codificar información de formas que son imposibles con sistemas clásicos.
            </p>
            <p>
                Entrelazamiento: Dos partículas pueden estar correlacionadas de tal manera que el estado de una afecta instantáneamente al estado de la otra, sin importar la distancia que las separa.
            </p>
            <p>
                Principio de incertidumbre: La simple observación de una partícula cuántica altera su estado, lo que hace que cualquier intento de espionaje sea detectable.
            </p>
            <p>
                Quantum Key Distribution (QKD):
                Uno de los métodos más prometedores de la criptografía cuántica es la Distribución de Claves Cuánticas. En un sistema QKD, dos partes (tradicionalmente llamados Alice y Bob) utilizan fotones para generar una clave compartida. Si un tercero (Eve) intenta interceptar los fotones, su presencia es detectada debido a las perturbaciones que introduce en los estados cuánticos. Esto garantiza una seguridad inquebrantable para la clave compartida.
            </p>
            <p>
                La amenaza de las computadoras cuánticas:
                Aunque las computadoras cuánticas aún están en sus primeras etapas, su potencial para romper algoritmos clásicos como RSA, ECC y AES está generando preocupación. Estas computadoras utilizan la capacidad de procesar grandes cantidades de información simultáneamente, lo que podría hacer obsoletos los sistemas criptográficos actuales.
            </p>
            <p>
                Avances en redes cuánticas:
                Varios países están invirtiendo en la investigación de redes cuánticas para proteger sus infraestructuras críticas. Por ejemplo, China ya ha construido un enlace de comunicación cuántica entre Beijing y Shanghái, mientras que la Unión Europea y Estados Unidos están explorando redes cuánticas para fines militares y civiles.
            </p>
            <p>
                El futuro de la seguridad global:
                La criptografía cuántica no solo protegerá datos sensibles contra amenazas futuras, sino que también abrirá nuevas posibilidades para la computación distribuida, la inteligencia artificial y la ciberseguridad en un mundo hiperconectado.
            </p>
            <button onClick={generatePDF}>
                Generar PDF
            </button>
        </div>
    );
};

export default Fact3Page