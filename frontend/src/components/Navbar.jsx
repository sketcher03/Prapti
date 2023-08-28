import React, { useState } from "react";
import { Link } from 'react-router-dom';
import praptiLogo from '../images/logo.png';
import '../css/Navbar_Footer.css'

const Navbar = () => {
    const Menus =[
        {name: "Prapti", icon:"home-outline", dis:"translate-x-0"},
        {name: "Find Talent", icon:"sunny-outline", dis:"translate-x-16"},
        {name: "Find Work", icon:"telescope-outline", dis:"translate-x-32"},
        {name: "Why Prapti", icon:"help-circle-outline", dis:"translate-x-48"},
        {name: "Customer_Reviews", icon:"chatbox-ellipses-outline", dis:"translate-x-64"},
    ];
    const [active, setActive] = useState(0);

    return(
        <div className="container">
            <Link to="/">
                <h1><img src={praptiLogo} alt="Prapti" /></h1>
            </Link>
        
            
            <div className="bg-tw-shadow-color: #f3f4f6 max-h-[6rem] px-6 rounded-t-xl">
                <ul className="flex relative">
                    
                    <span className={`bg-rose-600 duration-500 ${Menus[active].dis} border-4 border-white-900 h-16 w-16 absolute 
                    -bottom-5 rounded-full`}
                    >
                    <span className="w-3.5 h-3.5 bg-transparent absolute top-4 -left-[18px] rounded-tr-[11px]
                    shadow-myShadow1"></span>
                    

                    <span className="w-3.5 h-3.5 bg-transparent absolute top-4 -right-[18px] rounded-tl-[11px]
                    shadow-myShadow2"></span>
                    </span>

                    {Menus.map((menu, i) => (
                        <li key={i} className="w-20">
                            <a
                                className="flex flex-col text-center"
                                onClick={() => setActive(i)
                                }
                            >
                                <span
                                    className={`text-xl cursor-pointer duration-500 ${i === active && "-mt-6 text-black"}`}
                                >
                                    <ion-icon name={menu.icon}></ion-icon>
                                </span>
                                <span
                                    className={` ${
                                        active === i
                                            ? "translateY(42px) duration-700 opacity-100"
                                            : "opacity-0 translate-y-10"}`}
                                >
                                    {menu.name}
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );    
}
export default Navbar;