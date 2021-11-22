import Image from 'next/image'
import Link from 'next/link'
import $ from 'jquery';
import { FaArrowUp } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';

//Icones Menu
import painelInicial from "/public/images/painelInicial.svg"
import arquivos from "/public/images/arquivos.svg"
import capasPersonalizadas from "/public/images/capasPersonalizadas.svg"
import fotos from "/public/images/fotos.svg"
import lojas from "/public/images/lojas.svg"
import modelosDeCapas from "/public/images/modelosDeCapas.svg"
import tabelaDeMedidas from "/public/images/tabelaDeMedidas.svg"
import usuarios from "/public/images/usuarios.svg"
import gestorbanners from "/public/images/gestorbanners.svg"

import mais from "/public/images/expandir.svg"
import menos from "/public/images/minimizar.svg"






export default function Menu(props) {
  const user = props.user ? props.user : {}
  var darkmode = props.darkmode
  var store = props.store
  var expandir = props.expandir
  const [menu, setMenu] = useState("close")
  const [menuActive, setMenuActive] = useState(false)

  const LogoAuahaSvg = (props) => {
    return (
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
            viewBox="0 0 2000 872.39" >
            <g>
              <g>
                <path fill="#fff" d="M369.88,429.51c0-36.31-16.37-61.94-82.58-61.94s-111.06,25.63-111.06,75.46c-13.53-19.22-19.22-37.02-19.22-51.97
                c0-48.41,61.22-73.33,130.28-73.33c90.41,0,139.53,42.71,139.53,114.61v254.86c-17.08-7.12-32.03-9.25-46.98-9.25
                c-32.75,0-62.65,12.81-101.8,12.81c-64.78,0-131.7-27.76-131.7-104.65C146.34,448.73,344.96,497.85,369.88,429.51z M372.01,485.75
                c-13.53,47.7-168.72,16.37-168.72,101.09c0,31.32,23.49,58.38,84.71,58.38c51.97,0,84-19.22,84-19.22V485.75z"/>
              </g>
              <g>
                <path fill="#fff" d="M703.1,356.9c0-35.59-56.95-35.59-56.95-35.59v306.81c0,0-33.47,14.96-85.44,14.96c-63.36,0-86.13-25.64-86.13-69.77
                V356.9c0-34.88-56.95-35.59-56.95-35.59v262.69c0,84,68.33,106.77,133.12,106.77c40.57,0,71.89-14.94,106.07-14.94
                c14.24,0,29.89,2.85,46.27,11.39v-56.95c-5.83-12.45-9.13-27.09-9.13-44.14c0-17.72,3.3-32.35,9.13-44.52V356.9z"/>
              </g>
              <g>
                <path fill="#fff" d="M923.65,429.51c0-36.31-16.37-61.94-82.58-61.94s-111.06,25.63-111.06,75.46c-13.53-19.22-19.22-37.02-19.22-51.97
                c0-48.41,61.22-73.33,130.28-73.33c90.41,0,139.53,42.71,139.53,114.61v254.86c-17.08-7.12-32.03-9.25-46.98-9.25
                c-32.75,0-62.65,12.81-101.8,12.81c-64.78,0-131.7-27.76-131.7-104.65C700.11,448.73,898.73,497.85,923.65,429.51z M925.78,485.75
                c-13.53,47.7-168.72,16.37-168.72,101.09c0,31.32,23.49,58.38,84.71,58.38c51.97,0,84-19.22,84-19.22V485.75z"/>
              </g>
              <g>
                <path fill="#4CFFDE" d="M1046.41,687.21c0,0-56.95,0-56.95-35.59V150.45c4.27,0,56.95-1.42,56.95,42.71v98.95
                c0,48.41-7.12,64.78-7.12,64.78s24.92-39.15,111.06-39.15c66.92,0,124.58,42,124.58,112.48v256.99c0,0-56.95-0.71-56.95-35.59
                V440.9c0-53.39-32.75-76.88-76.88-76.88c-46.98,0-94.68,28.48-94.68,69.77V687.21z"/>
              </g>
              <g>
                <path fill="#4CFFDE" d="M1328.49,573.31c0,44.14,22.78,69.77,86.14,69.77c51.97,0,85.43-14.95,85.43-14.95V321.3
                c0,0,56.95,0,56.95,35.59v330.32c-16.37-8.54-32.03-11.39-46.27-11.39c-34.17,0-65.49,14.95-106.07,14.95
                c-64.78,0-133.12-22.78-133.12-106.78V321.3c0,0,56.95,0.71,56.95,35.59V573.31z"/>
              </g>
              <g>
                <path fill="#4CFFDE" d="M1853.66,577.58c0,71.9-51.97,113.19-149.5,113.19c-60.51,0-83.29-19.93-135.97-25.63v-514.7
                c4.98,0,56.95-0.71,56.95,42.71v98.95c0,48.41-7.12,64.78-7.12,64.78s24.92-39.15,111.06-39.15c66.92,0,124.58,42,124.58,112.48
                V577.58z M1625.14,626.7c0,0,24.2,17.8,77.6,17.8c73.33,0,93.97-25.63,93.97-77.6V440.9c0-53.39-32.75-76.88-76.88-76.88
                c-46.98,0-94.68,28.48-94.68,69.77V626.7z"/>
              </g>
            </g>
          </svg>


    )
  }
  const Logo = (props) => {
    return <a className={"menu__logo"} href={"/"}>
      <LogoAuahaSvg color={darkmode ? "#fff" : "#000"} />
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
      {store.CustomCase  || user.lvl == "Admin" || user.lvl == "Master" ?
        <>
          < NavigatorItem nome={"Modelos de capas"} icon={modelosDeCapas} link={"/modelos"} width={18} height={18} />
        </>
        : null}
      {store.UploadPhotos || user.lvl == "Admin" || user.lvl == "Master" ?
        <>
          < NavigatorItem nome={"Fotos"} icon={fotos} link={"/fotos"} width={18} height={18} />
        </>
        : null}
      {store.UploadFiles  || user.lvl == "Admin" || user.lvl == "Master" ?
        <>
          < NavigatorItem nome={"Arquivos"} icon={arquivos} link={"/arquivos"} width={18} height={18} />
        </>
        : null}
      {store.CustomCase  || user.lvl == "Admin" || user.lvl == "Master" ?
        <>
          < NavigatorItem nome={"Capas personalizadas"} icon={capasPersonalizadas} link={"/capas"} width={18} height={18} />
        </>
        : null}
      {store.MeasurementChart|| user.lvl == "Admin" || user.lvl == "Master" ?
        <>
          < NavigatorItem nome={"Tabela de medidas"} icon={tabelaDeMedidas} link={"/tabela"} width={18} height={18} />
        </>
        : null}

        {store.BannersMercado > 0  || user.lvl == "Admin" || user.lvl == "Master" ?
        <>
          < NavigatorItem nome={"Gestor de Banners"} icon={gestorbanners} link={"/gestorbanners"} width={18} height={18} />
        </>
        : null}
    </ul>;
  }
  function toggleMenu() {
    if (expandir == true) {
      setMenuActive(false)
      props.Exp()
    } else {
      setMenuActive(true)
      props.Exp()
    }
  }
  const Expand = (props) => {

    return <button className={"menu__item"} onClick={() => { toggleMenu(); }}>
      <Image src={expandir ? mais : menos} width={15} height={15} />
      {!expandir
        ? "Expandir menu"
        : "Minimizar menu"
      }
    </button>;
  }


  return (<>
    <div className={"menu desktop " + (menu) + (expandir ? " active" : "")}>
      <div className={"menu__container"}>

        <Logo />
        <Navigator />
        <Expand />
      </div>

    </div>
  </>);
}