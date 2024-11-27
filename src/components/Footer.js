import "../CSS/Footer.css";

export function FooterPG() {
    return (
        <footer className="PiePag">
            <div className="footer-row">
                <div className="footer-column"><p>Acerca de</p></div>
                <div className="footer-column"><p>Soporte</p></div>
                <div className="footer-column"><p>Legal</p></div>
                <div className="footer-column"><p>Seguridad</p></div>
                <div className="footer-column"><p>Redes Sociales</p></div>
            </div>
            <div className="footer-row">
                <p>&copy; 2024 RegiSecure. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
