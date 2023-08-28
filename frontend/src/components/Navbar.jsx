import React, { useState } from "react";
import { Link } from 'react-router-dom';
import praptiLogo from '../images/logo.png';
import '../css/Navbar_Footer.css'

const Navbar =() =>{
    const Menus =[
        {name: "Find Talent", icon:"telescope-outline", dis:"translate-x-4"},
        {name: "Requests", icon:"create-outline", dis:"translate-x-[110px]"},
        {name: "Orders", icon:"layers-outline", dis:"translate-x-[208px]"},
        {name: "Help", icon:"help-circle-outline", dis:"translate-x-[305px]"},
        {name: "Notifications", icon:"notifications-outline", dis:"translate-x-[400px]"},
        {name: "Inbox", icon:"chatbox-ellipses-outline", dis:"translate-x-[496px]"},
        ];
        const [active, setActive] = useState(0);

    return(
        <div className="container">
            <Link to="/">
                <h1><img src={praptiLogo} alt="Prapti" /></h1>
            </Link>
        
            
            <div className="bg-green-100 max-h-32 px-10 rounded-2xl mt-8">
                <ul className="flex relative items-center">
                    
                    <span className={`bg-lime-500 duration-500 ${Menus[active].dis} border-[6px] border-white h-16 w-16 absolute 
                    -bottom-7 rounded-full scale-125`}
                    >
                        <span className="w-4 h-4 bg-transparent absolute top-[14px] -left-[21.1px] rotate-90 rounded-tr-[10px]
                        shadow-myShadow1"></span>
                        

                        <span className="w-4 h-4 bg-transparent absolute top-[14px] -right-[21.1px] -rotate-90 rounded-tl-[11px]
                        shadow-myShadow2"></span>
                    </span>

                    {Menus.map((menu, i) => (
                        <li key={i} className="w-24 translate-y-1 text-center">
                            
                            <a
                                className="flex flex-col text-center mt-4 mb-5"
                                onClick={() => setActive(i)}
                            >
                                <span
                                    className={`text-base text-green-600 font-semibold ${
                                        active === i
                                            ? "translate-y-[10px] duration-700 opacity-100 "
                                            : "opacity-0 translate-y-10"}`}
                                >
                                    {menu.name}
                                </span>
                                <span
                                    className={`text-3xl font-[800] cursor-pointer mb-4 duration-500 ${i === active && "text-green-100 translate-y-12"}`}
                                >
                                    <ion-icon name={menu.icon}></ion-icon>
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