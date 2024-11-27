import React, {useState} from "react";

import { jsPDF } from "jspdf";

import { BarraSuperiorCerrar } from "./BarraSuperiorCerrar";
import { FooterPG } from "./Footer";
import "../CSS/contenedor.css";

const Fact1Page = () => {

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("La máquina Enigma y la Segunda Guerra Mundial", 10, 20);
        doc.setFontSize(12);
        doc.text(
          `Orígenes y diseño de Enigma:
La máquina Enigma fue diseñada inicialmente para propósitos comerciales por Arthur Scherbius en la década de 1920. Su potencial para proteger comunicaciones pronto llamó la atención de los militares, particularmente de Alemania, que comenzó a adaptarla y perfeccionarla para sus necesidades bélicas. La versión militar introdujo un sistema de rotores adicionales y configuraciones diarias que incrementaban exponencialmente el número de combinaciones posibles, alcanzando cifras astronómicas que hacían virtualmente imposible descifrar un mensaje sin conocer la configuración exacta.

Cómo funcionaba:
El operador configuraba los rotores de Enigma según una clave diaria proporcionada en un manual cifrado. Luego, al escribir el mensaje en el teclado, cada letra se transformaba en otra diferente según la posición de los rotores y un reflector interno. Esta complejidad hacía que cada vez que se pulsaba una tecla, el sistema generara una salida distinta. Sin embargo, la máquina también tenía una vulnerabilidad inherente: ninguna letra podía cifrarse como sí misma, un defecto que los criptógrafos aliados aprovecharon para descifrarla.

El papel de Polonia y los avances en Bletchley Park:
Antes de la guerra, los criptografos polacos Marian Rejewski, Jerzy Rozycki y Henryk Zygalski lograron avances cruciales al reconstruir una versión de Enigma basándose en inteligencia obtenida de espías y en su habilidad matemática. Compartieron este conocimiento con los británicos y los franceses en 1939, poco antes de la invasión alemana a Polonia. En Bletchley Park, Alan Turing y su equipo desarrollaron una máquina llamada "Bombe" para automatizar el proceso de descifrado.

Impacto en la guerra y la tecnología:
Descifrar Enigma permitió a los Aliados interceptar y anticipar los movimientos alemanes, incluidos los ataques de los submarinos en el Atlántico. Esta ventaja estratégica salvó miles de vidas y acortó significativamente la guerra. Además, los esfuerzos en Bletchley Park marcaron el inicio de la computación moderna, ya que las tecnologías desarrolladas para descifrar Enigma influyeron directamente en el diseño de las primeras computadoras electrónicas.`,
          10,
          30,
          { maxWidth: 180 }
        );
        doc.save("Enigma.pdf");
      };

    return(
        <div>
            <BarraSuperiorCerrar />
            <div className="mainContainer">
                <div>
                    <h1 className="titulo">La máquina Enigma y la Segunda Guerra Mundial</h1>
                </div>
                <div className="card-datos justificado">
                    <p>
                        Orígenes y diseño de Enigma:
                        La máquina Enigma fue diseñada inicialmente para propósitos comerciales por Arthur Scherbius en la década de 1920. Su potencial para proteger comunicaciones pronto llamó la atención de los militares, particularmente de Alemania, que comenzó a adaptarla y perfeccionarla para sus necesidades bélicas. La versión militar introdujo un sistema de rotores adicionales y configuraciones diarias que incrementaban exponencialmente el número de combinaciones posibles, alcanzando cifras astronómicas que hacían virtualmente imposible descifrar un mensaje sin conocer la configuración exacta.
                    </p>
                    <p>
                        Cómo funcionaba:
                        El operador configuraba los rotores de Enigma según una clave diaria proporcionada en un manual cifrado. Luego, al escribir el mensaje en el teclado, cada letra se transformaba en otra diferente según la posición de los rotores y un reflector interno. Esta complejidad hacía que cada vez que se pulsaba una tecla, el sistema generara una salida distinta. Sin embargo, la máquina también tenía una vulnerabilidad inherente: ninguna letra podía cifrarse como sí misma, un defecto que los criptógrafos aliados aprovecharon para descifrarla.
                    </p>
                    <p>
                        El papel de Polonia y los avances en Bletchley Park:
                        Antes de la guerra, los criptógrafos polacos Marian Rejewski, Jerzy Różycki y Henryk Zygalski lograron avances cruciales al reconstruir una versión de Enigma basándose en inteligencia obtenida de espías y en su habilidad matemática. Compartieron este conocimiento con los británicos y los franceses en 1939, poco antes de la invasión alemana a Polonia. En Bletchley Park, Alan Turing y su equipo desarrollaron una máquina llamada "Bombe" para automatizar el proceso de descifrado.
                    </p>
                    <p>
                        Impacto en la guerra y la tecnología:
                        Descifrar Enigma permitió a los Aliados interceptar y anticipar los movimientos alemanes, incluidos los ataques de los submarinos en el Atlántico. Esta ventaja estratégica salvó miles de vidas y acortó significativamente la guerra. Además, los esfuerzos en Bletchley Park marcaron el inicio de la computación moderna, ya que las tecnologías desarrolladas para descifrar Enigma influyeron directamente en el diseño de las primeras computadoras electrónicas.
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

export default Fact1Page
