import { Link } from 'react-router-dom';
import praptiLogo from '../images/logo.png'

const Navbar = () => {

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1><img src={praptiLogo} alt="Prapti" /></h1>
                </Link>
            </div>
        </header>
    )
}

export default Navbar;