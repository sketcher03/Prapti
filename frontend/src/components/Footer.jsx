import '../css/Navbar_Footer.css';
import { useAuthContext } from "../hooks/useAuthContext";

const Footer = () => {

    const { user } = useAuthContext();

    return (

        <div>
            {user && (
                <footer>
                    Copyright &copy; Prapti Inc. 2023
                </footer>
            )}
        </div>

    );
}
 
export default Footer;