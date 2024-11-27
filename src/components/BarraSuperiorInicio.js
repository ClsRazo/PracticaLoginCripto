import LogoInicio from "../img/LogoCentro.png";
import { Link } from 'react-router-dom';
import "../CSS/BarraSuperiorInicio.css";

export function BarraSuperiorInicio() {
    return (
        <header className="BarraSuperiorInicio">
            <nav>
                <ul>
                    <li>
                        <Link to="/home">
                            <img src={LogoInicio} alt="Logo RegiSecure" className="LogoInicio" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}