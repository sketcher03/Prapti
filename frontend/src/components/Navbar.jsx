import React, { useState } from "react";
import { Link } from 'react-router-dom';
import praptiLogo from '../images/logo.png';
import '../css/Navbar_Footer.css'

const Navbar = () => {
    const Menus =[
        {name: "Prapti", icon:"home-outline", dis:"translate-x-0"},
        {name: "Find Talent", icon:"talent-outline", dis:"translate-x-16"},
        {name: "Find Work", icon:"work-outline", dis:"translate-x-32"},
        {name: "Why Prapti", icon:"reason-outline", dis:"translate-x-48"},
        {name: "Customer_Reviews", icon:"customer-outline", dis:"translate-x-64"},
    ];
    const [active, setActive] = useState(0)

    return(
        <div className="container">
            <Link to="/">
                <h1><img src={praptiLogo} alt="Prapti" /></h1>
            </Link>
        
    
            <div className="bg-black max-h-[4.4rem] px-6 rounded-t-x1">
                <ul className="flex relative">
                    <span className={`bg-rose-600 duration-500 ${Menus[active].dis} border-4 border-gray-900 h-16 w-16 absolute -top-5 rounded-full `}
                    >
                    <span className="='w-3.5 h-3.5 bg-red-300 absolute top-4"></span>
                    </span>
                    {Menus.map((menus, i) => (
                        <li key={i} className="w-16">
                            <a
                                className="flex flex-col text-center pt-6"
                                onclick={() => setActive(i)
                                }
                            >
                                <span
                                    className={`text-s1 cursor-pointer duration-500 ${i === active && "-mt-6"}`}
                                >
                                    <ion-icon name={menus.icon}></ion-icon>
                                </span>
                                <span
                                    className={` ${active === i
                                            ? "translate-y-4 duration-700 opacity-100"
                                            : "opacity-0 translate-y-10"}`}
                                >
                                    {menus.name}
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