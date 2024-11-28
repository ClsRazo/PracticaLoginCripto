import React, {useState} from "react";

import {Link, useNavigate} from "react-router-dom";

import { BarraSuperiorCerrar } from "./BarraSuperiorCerrar";
import { FooterPG } from "./Footer";
import "../CSS/contenedor.css";

import { jsPDF } from "jspdf";

const Fact2Page = () => {

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Criptografía de clave pública: la base de Internet", 105, 10, null, null, "center");
        doc.setFontSize(12);
        doc.text(
          `Los límites de la criptografía simétrica:
Antes de la invención de la criptografía de clave pública, la mayoría de los sistemas dependían de la criptografía simétrica, donde una sola clave se utilizaba tanto para cifrar como para descifrar un mensaje. Este enfoque presentaba un gran problema logístico: para garantizar la seguridad, era necesario transmitir la clave entre el remitente y el receptor a través de un canal seguro. En la práctica, esto no siempre era posible y, si la clave era interceptada, todo el sistema de comunicación quedaba comprometido.

La revolución conceptual:
En 1976, Whitfield Diffie y Martin Hellman introdujeron el concepto de la criptografía de clave pública con su protocolo de intercambio de claves, conocido como Diffie-Hellman. Poco después, en 1978, Ron Rivest, Adi Shamir y Leonard Adleman desarrollaron el algoritmo RSA, que implementó este concepto de manera práctica. La idea central era simple pero poderosa: cada usuario tendría dos claves matemáticamente relacionadas, una pública y otra privada.

    Clave pública: Se comparte abiertamente y se utiliza para cifrar mensajes.
    Clave privada: Se mantiene en secreto y se utiliza para descifrar los mensajes cifrados con la clave pública correspondiente.

Aplicaciones modernas y protocolos:
La criptografía de clave pública es fundamental para muchas tecnologías que usamos diariamente:

    HTTPS (HyperText Transfer Protocol Secure): Protege la comunicación entre navegadores y servidores web, asegurando que los datos sensibles, como contraseñas y tarjetas de crédito, estén cifrados durante las transacciones en línea.
    Cadenas de bloques y criptomonedas: Las firmas digitales, basadas en la criptografía de clave pública, garantizan que solo el propietario legítimo de una billetera puede autorizar transacciones.
    Infraestructura de clave pública (PKI): Utilizada en sistemas de autenticación, como certificados digitales, para validar la identidad de sitios web, organizaciones y personas.

Impacto social y económico:
La criptografía de clave pública no solo ha transformado la seguridad en línea, sino que también ha permitido la globalización del comercio digital, el desarrollo de tecnologías como el Internet de las cosas (IoT) y la protección de datos personales frente a amenazas cada vez más sofisticadas.`,
          10,
          30,
          { maxWidth: 180 }
        );
        doc.text("© RegiSecure. Todos los derechos reservados", 105, 280, null, null, "center");
        doc.save("PublicKey.pdf");
      };

    return(
        <div>
            <BarraSuperiorCerrar />
            <div className="mainContainer">
                <div>
                    <h1 className="titulo">Criptografía de clave pública: la base de Internet</h1>
                </div>
                <div className="card-datos justificado">
                    <p>
                        Los límites de la criptografía simétrica:
                        Antes de la invención de la criptografía de clave pública, la mayoría de los sistemas dependían de la criptografía simétrica, donde una sola clave se utilizaba tanto para cifrar como para descifrar un mensaje. Este enfoque presentaba un gran problema logístico: para garantizar la seguridad, era necesario transmitir la clave entre el remitente y el receptor a través de un canal seguro. En la práctica, esto no siempre era posible y, si la clave era interceptada, todo el sistema de comunicación quedaba comprometido.
                    </p>
                    <p>
                        La revolución conceptual:
                        En 1976, Whitfield Diffie y Martin Hellman introdujeron el concepto de la criptografía de clave pública con su protocolo de intercambio de claves, conocido como Diffie-Hellman. Poco después, en 1978, Ron Rivest, Adi Shamir y Leonard Adleman desarrollaron el algoritmo RSA, que implementó este concepto de manera práctica. La idea central era simple pero poderosa: cada usuario tendría dos claves matemáticamente relacionadas, una pública y otra privada.
                    </p>
                    <p>
                        Clave pública: Se comparte abiertamente y se utiliza para cifrar mensajes.
                    </p>
                    <p>
                        Clave privada: Se mantiene en secreto y se utiliza para descifrar los mensajes cifrados con la clave pública correspondiente.
                    </p>
                    <p>
                        Aplicaciones modernas y protocolos:
                    </p>
                    <p>
                        La criptografía de clave pública es fundamental para muchas tecnologías que usamos diariamente:

                        HTTPS (HyperText Transfer Protocol Secure): Protege la comunicación entre navegadores y servidores web, asegurando que los datos sensibles, como contraseñas y tarjetas de crédito, estén cifrados durante las transacciones en línea.
                        Cadenas de bloques y criptomonedas: Las firmas digitales, basadas en la criptografía de clave pública, garantizan que solo el propietario legítimo de una billetera puede autorizar transacciones.
                        Infraestructura de clave pública (PKI): Utilizada en sistemas de autenticación, como certificados digitales, para validar la identidad de sitios web, organizaciones y personas.
                    </p>
                    <p>
                        Impacto social y económico:
                        La criptografía de clave pública no solo ha transformado la seguridad en línea, sino que también ha permitido la globalización del comercio digital, el desarrollo de tecnologías como el Internet de las cosas (IoT) y la protección de datos personales frente a amenazas cada vez más sofisticadas.
                    </p>
                    <div className="centrar">
                        <button onClick={generatePDF} className="boton">
                            Generar PDF
                        </button>
                    </div>
                </div>
            </div>
            <FooterPG />
        </div>
    );
};

export default Fact2Page