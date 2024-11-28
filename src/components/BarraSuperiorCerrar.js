import LogoInicio from "../img/LogoCentro.png";
import { Link } from 'react-router-dom';
import "../CSS/BarraSuperiorCerrar.css";

//Barra superior con la opción de cerrar sesión

export function BarraSuperiorCerrar() {
    return (
        <header className="BarraSuperiorCerrar">
            <div className="ContenedorLogo">
                <Link to="/">
                    <img src={LogoInicio} alt="Logo RegiSecure" className="LogoInicioCerrar" />
                </Link>
            </div>
            <Link to="/" className="CerrarSesion">
                Cerrar sesión
            </Link>
        </header>
    );
}
