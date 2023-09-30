import '../css/Navbar_Footer.css';
import { useSelector } from 'react-redux';

const Footer = () => {

    const { isAuthenticated } = useSelector((state) => state.user);

    return (

        <div>
            {isAuthenticated && (
                <footer>
                    Copyright &copy; Prapti Inc. 2023
                </footer>
            )}
        </div>

    );
}
 
export default Footer;