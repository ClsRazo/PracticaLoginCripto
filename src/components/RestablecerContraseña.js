import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import zxcvbn from 'zxcvbn'; 

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
                    <form onSubmit={manejarSolicitudRestablecimiento}>
                        <h2>Restablecer Contraseña</h2>
                        <div>
                            <label>Nombre de Usuario:</label>
                            <input
                                type="text"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Solicitar Restablecimiento</button>
                        {mensajeError && <p style={{color: 'red'}}>{mensajeError}</p>}
                    </form>
                );
            
            case 'introducirTokenRestablecimiento':
                return (
                    <form onSubmit={manejarVerificacionTokenRestablecimiento}>
                        <h2>Verificar Código de Restablecimiento</h2>
                        <p>Hemos enviado un código de restablecimiento a tu correo electrónico.</p>
                        <div>
                            <label>Código de Restablecimiento:</label>
                            <input
                                type="text"
                                value={tokenRestablecimiento}
                                onChange={(e) => setTokenRestablecimiento(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Verificar Código</button>
                        {mensajeError && <p style={{color: 'red'}}>{mensajeError}</p>}
                    </form>
                );
            
            case 'restablecerContraseña':
                return (
                    <form onSubmit={manejarRestablecimientoContraseña}>
                        <h2>Restablecer Contraseña</h2>
                        <div>
                            <label>Nueva Contraseña:</label>
                            <input
                                type="password"
                                value={nuevaContraseña}
                                onChange={(e) => setNuevaContraseña(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Confirmar Nueva Contraseña:</label>
                            <input
                                type="password"
                                value={confirmarContraseña}
                                onChange={(e) => setConfirmarContraseña(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Restablecer Contraseña</button>
                        {mensajeError && <p style={{color: 'red'}}>{mensajeError}</p>}
                    </form>
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