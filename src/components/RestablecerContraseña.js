import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import zxcvbn from 'zxcvbn'; 

import { BarraSuperiorInicio } from "./BarraSuperiorInicio";
import { FooterPG } from "./Footer";
import "../CSS/contenedor.css";

//Reglas para la complejidad de la contraseña
//Minimo de caracteres: 12
//Al menos dos letras mayúsculas
//Al menos dos letras minúsculas
//Al menos dos números
//Al menos dos caracteres especiales

const RestablecerContraseña = () => {
    const [usuario, setUsuario] = useState('');
    const [paso, setPaso] = useState('solicitarRestablecimiento');
    const [tokenRestablecimiento, setTokenRestablecimiento] = useState('');
    const [nuevaContraseña, setNuevaContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [mensajeError, setMensajeError] = useState('');

    const navegacion = useNavigate();

    const aBufferToHex = (buffer) => {
        return [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");
    };

    //Para la validación de la contraseña con las reglas establecidas
    const regex = /^(?=.*[a-z]{2,})(?=.*[A-Z]{2,})(?=.*[0-9]{2,})(?=.*[\W_]{2,}).{12,}$/;

    const manejarSolicitudRestablecimiento = async (e) => {
        e.preventDefault();
        setMensajeError('');

        try {
            const respuesta = await fetch('https://practicaloginback.onrender.com/solicitar-restablecimiento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: usuario
                }),
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                setPaso('introducirTokenRestablecimiento');
            } else {
                setMensajeError(datos.error || 'Error en la solicitud de restablecimiento');
            }
        } catch (error) {
            setMensajeError('Error de conexión');
            console.error('Error:', error);
        }
    };

    const manejarVerificacionTokenRestablecimiento = async (e) => {
        e.preventDefault();
        setMensajeError('');

        try {
            const respuesta = await fetch('https://practicaloginback.onrender.com/verificar-token-restablecimiento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: usuario,
                    tokenRestablecimiento 
                }),
            });

            const datos = await respuesta.json();

            if (respuesta.ok) {
                setPaso('restablecerContraseña');
            } else {
                setMensajeError(datos.error || 'Token inválido');
            }
        } catch (error) {
            setMensajeError('Error de conexión');
            console.error('Error:', error);
        }
    };

    const manejarRestablecimientoContraseña = async (e) => {
        e.preventDefault();
        setMensajeError('');

        const fortalezaContraseña = zxcvbn(nuevaContraseña);
        if (fortalezaContraseña.score < 3) {
            setMensajeError('La contraseña es muy débil');
            return;
        }

        if (nuevaContraseña !== confirmarContraseña) {
            setMensajeError('Las contraseñas no coinciden');
            return;
        }

        //Validamos la contraseña con las reglas establecidas
        if(!regex.test(nuevaContraseña)){
            //Mostramos un mensaje abajo del input de la contraseña
            setMensajeError("La contraseña no cumple con las reglas establecidas");
            return;
        }

        try {
            const codificador = new TextEncoder();
            const datos = codificador.encode(nuevaContraseña);
            const bufferHash = await window.crypto.subtle.digest("SHA-256", datos);
            const hashHex = aBufferToHex(bufferHash);

            const respuesta = await fetch('https://practicaloginback.onrender.com/restablecer-contrasena', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: usuario,
                    tokenRestablecimiento,
                    nuevaContraseña: hashHex 
                }),
            });

            const respuestaDatos = await respuesta.json();

            if (respuesta.ok) {
                navegacion('/');
            } else {
                setMensajeError(respuestaDatos.error || 'Error al restablecer la contraseña');
            }
        } catch (error) {
            setMensajeError('Error de conexión');
            console.error('Error:', error);
        }
    };

    const renderizarPaso = () => {
        switch(paso) {
            case 'solicitarRestablecimiento':
                return (
                    <div>
                        <BarraSuperiorInicio />
                        <div className='mainContainer'>
                            <div>
                                <h1 className="titulo">Restablecer Contraseña</h1>
                            </div>
                            <div className='card-datos'>
                                <form onSubmit={manejarSolicitudRestablecimiento}>
                                    <div className="cuadroDatos">
                                        <label>Nombre de Usuario*:</label>
                                        <input
                                            type="text"
                                            value={usuario}
                                            onChange={(e) => setUsuario(e.target.value)}
                                            className="card-input"
                                            required
                                        />
                                    </div>
                                    <div className='centrar'>
                                        <button type="submit" className='boton'>Solicitar Restablecimiento</button>
                                    </div>
                                    <div className='parrafoCentrar'>
                                        {mensajeError && <p style={{color: 'red'}}>{mensajeError}</p>}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <FooterPG />
                    </div>
                );
            
            case 'introducirTokenRestablecimiento':
                return (
                    <div>
                        <BarraSuperiorInicio />
                        <div className='mainContainer'>
                            <div>
                                <h2 className="titulo">Verificar Código de Restablecimiento</h2>
                            </div>
                            <div className='card-datos'>
                                <form onSubmit={manejarVerificacionTokenRestablecimiento}>
                                    <div className='parrafoCentrar'>
                                        <p>Hemos enviado un código de restablecimiento a tu correo electrónico.</p>
                                    </div>
                                    <div className="cuadroDatos">
                                        <label>Código de Restablecimiento*:</label>
                                        <input
                                            type="text"
                                            value={tokenRestablecimiento}
                                            onChange={(e) => setTokenRestablecimiento(e.target.value)}
                                            className="card-input"
                                            required
                                        />
                                    </div>
                                    <div className='centrar'>
                                        <button type="submit" className='boton'>Verificar Código</button>
                                    </div>
                                    <div className='parrafoCentrar'>
                                        {mensajeError && <p style={{color: 'red'}}>{mensajeError}</p>}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <FooterPG />
                    </div>
                );
            
            case 'restablecerContraseña':
                return (
                    <div>
                        <BarraSuperiorInicio />
                        <div className='mainContainer'>
                            <div>
                                <h2 className='titulo'>Restablecer Contraseña</h2>
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
                            <div className='card-datos'>
                                <form onSubmit={manejarRestablecimientoContraseña}>
                                    <div className="cuadroDatos">
                                        <label>Nueva Contraseña:</label>
                                        <input
                                            type="password"
                                            value={nuevaContraseña}
                                            onChange={(e) => setNuevaContraseña(e.target.value)}
                                            className="card-input"
                                            required
                                        />
                                    </div>
                                    <div className="cuadroDatos">
                                        <label>Confirmar Nueva Contraseña:</label>
                                        <input
                                            type="password"
                                            value={confirmarContraseña}
                                            onChange={(e) => setConfirmarContraseña(e.target.value)}
                                            className="card-input"
                                            required
                                        />
                                    </div>
                                    <div className='centrar'>
                                        <button type="submit" className='boton'>Restablecer Contraseña</button>
                                    </div>
                                    <div className='parrafoCentrar'>
                                        {mensajeError && <p style={{color: 'red'}}>{mensajeError}</p>}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <FooterPG />
                    </div>
                );
            
            default:
                return null;
        }
    };

    return (
        <div>
            {renderizarPaso()}
        </div>
    );
};

export default RestablecerContraseña;