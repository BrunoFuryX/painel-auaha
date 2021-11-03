import Image from 'next/image'
import Link from 'next/link'
import $ from 'jquery';
import { FaArrowUp } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import sair from "/public/images/sair.svg"

//Icones Menu
import painelInicial from "/public/images/painelInicial.svg"
import arquivos from "/public/images/arquivos.svg"
import capasPersonalizadas from "/public/images/capasPersonalizadas.svg"
import fotos from "/public/images/fotos.svg"
import lojas from "/public/images/lojas.svg"
import modelosDeCapas from "/public/images/modelosDeCapas.svg"
import tabelaDeMedidas from "/public/images/tabelaDeMedidas.svg"
import usuarios from "/public/images/usuarios.svg"

import expandir from "/public/images/expandir.svg"
import minimizar from "/public/images/minimizar.svg"



export default function HeaderMobile(props) {
    const user = props.user ? props.user : {}
    const [dark, setDark] = useState(props.darkmode)

    const [menuActive1, setMenuActive1] = useState(false)
    const [menuActive2, setMenuActive2] = useState(false)


    const LogoAuahaSvg = (props) => {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="63.12" height="24.51" viewBox="0 0 149.391 58.008" fill={"#fff"}>
                <g id="Grupo_3" data-name="Grupo 3" transform="translate(1692.57 -708.143)">
                    <path id="Caminho_1" data-name="Caminho 1" d="M-1668.573,838.961c0-3.9-1.758-6.649-8.865-6.649s-11.922,2.752-11.922,8.1a9.9,9.9,0,0,1-2.063-5.579c0-5.2,6.572-7.871,13.986-7.871,9.706,0,14.979,4.585,14.979,12.3v27.36a12.575,12.575,0,0,0-5.044-.994c-3.515,0-6.725,1.376-10.929,1.376-6.954,0-14.139-2.981-14.139-11.235C-1692.57,841.024-1671.248,846.3-1668.573,838.961Zm.229,6.037c-1.452,5.121-18.113,1.758-18.113,10.852,0,3.363,2.522,6.267,9.095,6.267a18.81,18.81,0,0,0,9.018-2.064Z" transform="translate(0 -100.858)" />
                    <path id="Caminho_2" data-name="Caminho 2" d="M-1274.025,838.961c0-3.9-1.758-6.649-8.866-6.649s-11.922,2.752-11.922,8.1a9.9,9.9,0,0,1-2.064-5.579c0-5.2,6.573-7.871,13.986-7.871,9.706,0,14.979,4.585,14.979,12.3v27.36a12.576,12.576,0,0,0-5.044-.994c-3.515,0-6.725,1.376-10.929,1.376-6.954,0-14.138-2.981-14.138-11.235C-1298.023,841.024-1276.7,846.3-1274.025,838.961Zm.229,6.037c-1.452,5.121-18.113,1.758-18.113,10.852,0,3.363,2.522,6.267,9.095,6.267a18.81,18.81,0,0,0,9.018-2.064Z" transform="translate(-334.907 -100.858)" />
                    <g id="Grupo_1" data-name="Grupo 1" transform="translate(-1663.279 726.486)">
                        <path id="Caminho_3" data-name="Caminho 3" d="M-1469.285,857.92a11.086,11.086,0,0,1,1.132-5.166V833.311c0-3.821-6.114-3.821-6.114-3.821v32.939a24.423,24.423,0,0,1-9.171,1.605c-6.8,0-9.247-2.751-9.247-7.49V833.311c0-3.745-6.114-3.821-6.114-3.821v28.2c0,9.018,7.337,11.464,14.291,11.464,4.356,0,7.719-1.605,11.387-1.605a10.551,10.551,0,0,1,4.968,1.223v-5.751A11.16,11.16,0,0,1-1469.285,857.92Z" transform="translate(1498.799 -829.49)" />
                    </g>
                    <path id="Caminho_4" data-name="Caminho 4" d="M-879.482,838.961c0-3.9-1.758-6.649-8.865-6.649s-11.923,2.752-11.923,8.1a9.9,9.9,0,0,1-2.063-5.579c0-5.2,6.572-7.871,13.986-7.871,9.706,0,14.979,4.585,14.979,12.3v27.36a12.575,12.575,0,0,0-5.044-.994c-3.515,0-6.725,1.376-10.929,1.376-6.955,0-14.139-2.981-14.139-11.235C-903.479,841.024-882.156,846.3-879.482,838.961Zm.229,6.037c-1.452,5.121-18.113,1.758-18.113,10.852,0,3.363,2.522,6.267,9.094,6.267a18.811,18.811,0,0,0,9.018-2.064Z" transform="translate(-669.812 -100.858)" />
                    <g id="Grupo_2" data-name="Grupo 2" transform="translate(-1603.639 708.143)">
                        <path id="Caminho_5" data-name="Caminho 5" d="M-1074.738,754.916a11.088,11.088,0,0,1,1.133-5.168v-11.57c0-7.566-6.191-12.075-13.375-12.075-9.247,0-11.922,4.2-11.922,4.2s.764-1.758.764-6.955V712.729c0-4.739-5.655-4.586-6.114-4.586v53.8c0,3.822,6.114,3.822,6.114,3.822V738.561c0-4.433,5.121-7.489,10.165-7.489,4.738,0,8.254,2.522,8.254,8.254v22.621c0,3.745,6.114,3.822,6.114,3.822v-5.75A11.158,11.158,0,0,1-1074.738,754.916Z" transform="translate(1104.251 -708.143)" />
                    </g>
                </g>
            </svg>

        )
    }
    const Logo = (props) => {
        return <a className={"menu__logo"} href={"/"}>
            <LogoAuahaSvg color={dark ? "#fff" : "#000"} />
        </a>;
    }

    const NavigatorItem = (props) => {

        return (
            <li className={"menu__item"}>
                <a href={props.link}>
                    <Image src={props.icon} width={props.width} height={props.height} />
                    {props.nome}
                </a>
            </li>
        )
    }
    const Navigator = (props) => {
        return <ul className={"menu__list"}>
            < NavigatorItem nome={"Painel inicial"} icon={painelInicial} link={"/"} width={18} height={18} />

            {user.lvl == "Gerente" || user.lvl == "Admin" || user.lvl == "Master" ?
                <>
                    < NavigatorItem nome={"Usuários"} icon={usuarios} link={"/usuarios"} width={18} height={18} />
                </>
                : null
            }
            {user.lvl == "Admin" || user.lvl == "Master" ?
                <>
                    < NavigatorItem nome={"Lojas"} icon={lojas} link={"/lojas"} width={18} height={18} />
                </>
                : null
            }

            < NavigatorItem nome={"Modelos de capas"} icon={modelosDeCapas} link={"/modelos"} width={18} height={18} />

            < NavigatorItem nome={"Fotos"} icon={fotos} link={"/fotos"} width={18} height={18} />

            < NavigatorItem nome={"Arquivos"} icon={arquivos} link={"/arquivos"} width={18} height={18} />

            < NavigatorItem nome={"Capas personalizadas"} icon={capasPersonalizadas} link={"/capas"} width={18} height={18} />

            < NavigatorItem nome={"Tabela de medidas"} icon={tabelaDeMedidas} link={"/tabela"} width={18} height={18} />
        </ul>;
    }
    function toggleMenu() {
        if (menuActive == true) {
            setMenuActive(false)
        } else {
            setMenuActive(true)
        }
    }
    const Expand = (props) => {

        return <button className={"menu__item"} onClick={toggleMenu}>
            <Image src={menuActive ? minimizar : expandir} width={15} height={15} />
            {!menuActive
                ? "Expandir menu"
                : "Minimizar menu"
            }
        </button>;
    }


    return (<>
        <div className={"header--mobile mobile"}>
            {
                menuActive1
                    ?
                    <>
                        <button className={"toggleMenu1"} onClick={ () => setMenuActive1(false) }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19.092" height="19.092" viewBox="0 0 19.092 19.092">
                                <g id="Grupo_459" data-name="Grupo 459" transform="translate(-16105.954 -28.454)">
                                    <rect id="Retângulo_836" data-name="Retângulo 836" width="25" height="2" rx="1" transform="translate(16107.368 28.454) rotate(45)" fill="#4cffde" />
                                    <rect id="Retângulo_838" data-name="Retângulo 838" width="25" height="2" rx="1" transform="translate(16105.954 46.132) rotate(-45)" fill="#4cffde" />
                                </g>
                            </svg>
                        </button>
                    </>
                    :
                    <>
                        <button className={"toggleMenu1"} onClick={ () =>  setMenuActive1(true) }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="18" viewBox="0 0 25 18">
                                <g id="Grupo_452" data-name="Grupo 452" transform="translate(-12 -31)">
                                    <rect id="Retângulo_836" data-name="Retângulo 836" width="25" height="2" rx="1" transform="translate(12 31)" fill="#4cffde" />
                                    <rect id="Retângulo_837" data-name="Retângulo 837" width="25" height="2" rx="1" transform="translate(12 39)" fill="#4cffde" />
                                    <rect id="Retângulo_838" data-name="Retângulo 838" width="25" height="2" rx="1" transform="translate(12 47)" fill="#4cffde" />
                                </g>
                            </svg>
                        </button>
                    </>
            }
            <Logo />
            {
                menuActive2
                    ?
                    <>
                        <button className={"toggleMenu2"} onClick={ () => setMenuActive2(false) }>
                            <svg xmlns="http://www.w3.org/2000/svg" width="19.092" height="19.092" viewBox="0 0 19.092 19.092">
                                <g id="Grupo_459" data-name="Grupo 459" transform="translate(-16105.954 -28.454)">
                                    <rect id="Retângulo_836" data-name="Retângulo 836" width="25" height="2" rx="1" transform="translate(16107.368 28.454) rotate(45)" fill="#4cffde" />
                                    <rect id="Retângulo_838" data-name="Retângulo 838" width="25" height="2" rx="1" transform="translate(16105.954 46.132) rotate(-45)" fill="#4cffde" />
                                </g>
                            </svg>
                        </button>
                    </>
                    :
                    <>
                        <button className={"toggleMenu2"} onClick={ () => setMenuActive2(true) }>
                            {user.foto ? 
                                <Image src={ user.foto ? user.foto : ImagemUsuario} width={49} height={49} />

                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="49" height="49" viewBox="0 0 49 49">
                                <g id="Grupo_453" data-name="Grupo 453" transform="translate(-305 -16)">
                                    <circle id="Elipse_1" data-name="Elipse 1" cx="24.5" cy="24.5" r="24.5" transform="translate(305 16)" fill="#1e1f23" />
                                    <g id="xOE6ET.tif" transform="translate(-913.329 -1194.384)">
                                        <g id="Grupo_5" data-name="Grupo 5" transform="translate(1232.329 1224.384)">
                                            <path id="Caminho_6" data-name="Caminho 6" d="M1243.233,1224.384c.414.079.837.129,1.242.242a5.909,5.909,0,0,1,3.411,2.5,5.8,5.8,0,0,1,1,3.486,5.971,5.971,0,0,1-2.405,4.681c-.059.046-.119.09-.214.161a10.524,10.524,0,0,1,5.113,3.846,10.376,10.376,0,0,1,1.942,6.066h-1.628a8.8,8.8,0,0,0-3.9-7.3,8.506,8.506,0,0,0-5.458-1.527,8.9,8.9,0,0,0-8.377,8.841h-1.629v-.615a1.368,1.368,0,0,0,.034-.176,9.733,9.733,0,0,1,.727-3.136,10.447,10.447,0,0,1,6.054-5.9l.236-.094c-.092-.069-.152-.113-.211-.159a5.973,5.973,0,0,1-2.406-4.681,5.8,5.8,0,0,1,1-3.487,5.907,5.907,0,0,1,3.411-2.5c.405-.113.827-.163,1.242-.242Zm4.017,6.074a4.427,4.427,0,1,0-4.444,4.42A4.44,4.44,0,0,0,1247.25,1230.458Z" transform="translate(-1232.329 -1224.384)" fill="#4cffde" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            }
                            
                        </button>


                    </>
            }
<div className={"menu1--mobile" + (menuActive1 ? " active" : "")}>

<Navigator />
</div>

<div className={"menu2--mobile" + (menuActive2 ? " active" : "")}>
<div className={ "menu2__row" }>
    Olá { user.name }
</div>
<div className={ "menu2__row" }>
    <div className={"darkmode"}>
        Modo Escuro
        <div className="onoffswitch">
        <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" defaultChecked={dark ? true : false} onChange={() => props.Darkmode()} />
        <label className="onoffswitch-label" htmlFor="myonoffswitch">
            <div className="onoffswitch-inner"></div>
            <div className="onoffswitch-switch"></div>
        </label>
        </div>
    </div>
</div>
<div className={ "menu2__row" }>
    <div className={"exit"} onClick={(e) => props.Sair()}>
        <Image src={sair} width={20} height={20} />
        Sair
    </div>
</div>
</div>

        </div>
        
    </>);
}