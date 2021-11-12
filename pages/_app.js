import '../styles/global.css'
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Head from 'next/head'
import { Login } from '/public/services/login';
import Menu from '/public/components/Menu'
import HeaderMobile from '/public/components/HeaderMobile'


function MyApp({ Component, pageProps }) {
    const ISSERVER = typeof window === "undefined";

    const [logged, setLogged] = useState(!ISSERVER ? localStorage.getItem('logged') : false)
    const [user, setUser] = useState(!ISSERVER ? JSON.parse(localStorage.getItem('user')) : {})
    const [store, setStore] = useState(!ISSERVER ? JSON.parse(localStorage.getItem('store')) : {})

    const [darkmode, setDarkmode] = useState(!ISSERVER ? localStorage.getItem('darkmode') : true)
    const [expandir, setExpandir] = useState(!ISSERVER ? localStorage.getItem('expandir') : false)


    const [email, setEmail] = useState()
    const [senha, setSenha] = useState()
    const [msg, setMsg] = useState()

    useEffect(() => {
        if (!ISSERVER) {
            setLogged(JSON.parse(localStorage.getItem('logged')))
            setUser(JSON.parse(localStorage.getItem('user')))
            setStore(JSON.parse(localStorage.getItem('store')))
            setDarkmode(JSON.parse(localStorage.getItem('darkmode')))
            setExpandir(JSON.parse(localStorage.getItem('expandir')))

        }
    }, [])


    function Sair() {
        setLogged(false)
        setUser(false)

        localStorage.setItem('logged', false);
        localStorage.setItem('user', false);
    }

    function DarkMode() {
        var dark = darkmode ? false : true
        setDarkmode(dark)
        localStorage.setItem('darkmode', JSON.stringify(dark));

    }

    function Expandir() {
        var exp = expandir ? false : true
        setExpandir(exp)
        localStorage.setItem('expandir', JSON.stringify(exp));

    }
    const LogoAuahaSvg = (props) => {
        let color = props.color
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
                <path fill="#9BFFDE" d="M1046.41,687.21c0,0-56.95,0-56.95-35.59V150.45c4.27,0,56.95-1.42,56.95,42.71v98.95
                c0,48.41-7.12,64.78-7.12,64.78s24.92-39.15,111.06-39.15c66.92,0,124.58,42,124.58,112.48v256.99c0,0-56.95-0.71-56.95-35.59
                V440.9c0-53.39-32.75-76.88-76.88-76.88c-46.98,0-94.68,28.48-94.68,69.77V687.21z"/>
              </g>
              <g>
                <path fill="#9BFFDE" d="M1328.49,573.31c0,44.14,22.78,69.77,86.14,69.77c51.97,0,85.43-14.95,85.43-14.95V321.3
                c0,0,56.95,0,56.95,35.59v330.32c-16.37-8.54-32.03-11.39-46.27-11.39c-34.17,0-65.49,14.95-106.07,14.95
                c-64.78,0-133.12-22.78-133.12-106.78V321.3c0,0,56.95,0.71,56.95,35.59V573.31z"/>
              </g>
              <g>
                <path fill="#9BFFDE" d="M1853.66,577.58c0,71.9-51.97,113.19-149.5,113.19c-60.51,0-83.29-19.93-135.97-25.63v-514.7
                c4.98,0,56.95-0.71,56.95,42.71v98.95c0,48.41-7.12,64.78-7.12,64.78s24.92-39.15,111.06-39.15c66.92,0,124.58,42,124.58,112.48
                V577.58z M1625.14,626.7c0,0,24.2,17.8,77.6,17.8c73.33,0,93.97-25.63,93.97-77.6V440.9c0-53.39-32.75-76.88-76.88-76.88
                c-46.98,0-94.68,28.48-94.68,69.77V626.7z"/>
              </g>
            </g>
          </svg>

        )
    }

    function validarLogin(e) {
        e.preventDefault()
        Login(email, senha).then((response) => {
            setLogged(response.logged)
            setUser(response.user)
            setStore(response.store)

            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('store', JSON.stringify(response.store));
            localStorage.setItem('logged', response.logged);

            setMsg(response.msg)
        })
    }


    return (
        <>
            <Head>
                <title>Auahub</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/images/faviconAuahub.ico" />
            </Head>
            <main className={darkmode ? "dark" : "light"}>
                {logged == true
                    ? <>
                        <HeaderMobile darkmode={darkmode} Sair={Sair} Darkmode={DarkMode} user={user} store={store} />
                        <Menu darkmode={darkmode} user={user} store={store} expandir={expandir} Exp={Expandir}/>
                        <div className={"body"}>
                            <Component {...pageProps} Sair={Sair} Darkmode={DarkMode} dark={darkmode} user={user} store={store} />
                        </div>
                    </>
                    : <>
                        <div className={"login"}>
                            <div className={"login__container"}>
                                <LogoAuahaSvg color={darkmode ? "#fff" : "#000"} />
                                Seja bem vindo a Ferramenta de <br /><b>Personalização Auaha</b>
                                <form onSubmit={e => validarLogin(e)}>
                                    <input name={"email"} value={email} placeholder={"E-mail"} onChange={e => setEmail(e.target.value)} />
                                    <input name={"senha"} value={senha} placeholder={"Senha"} type={"password"} onChange={e => setSenha(e.target.value)} />
                                    {msg
                                        ? <span>{msg}</span>
                                        : null
                                    }
                                    <button type={"submit"}>Entrar</button>
                                </form>
                            </div>
                        </div>
                    </>

                }
            </ main>
        </>
    )
}

export default MyApp
