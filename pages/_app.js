import '../styles/global.css'
import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import Head from 'next/head'
import { Login } from '/public/services/login';
import Menu from '/public/components/Menu'


function MyApp({ Component, pageProps }) {
  const ISSERVER = typeof window === "undefined";

  const [logged, setLogged] = useState(!ISSERVER ? localStorage.getItem('logged') : false)
  const [user, setUser] = useState(!ISSERVER ? JSON.parse(localStorage.getItem('user')) : {})
  const [store, setStore] = useState(!ISSERVER ? JSON.parse(localStorage.getItem('store')) : {})

  const [darkmode, setDarkmode] = useState(!ISSERVER ? localStorage.getItem('darkmode') : true)

  const [email, setEmail] = useState()
  const [senha, setSenha] = useState()
  const [msg, setMsg] = useState()

  useEffect(()=> {
    if (!ISSERVER) {
      setLogged(JSON.parse(localStorage.getItem('logged')))
      setUser(JSON.parse(localStorage.getItem('user')))
      setStore(JSON.parse(localStorage.getItem('store')))
      setDarkmode(JSON.parse(localStorage.getItem('darkmode')))
    }
  }, [])


  function Sair(){
    setLogged(false)
    setUser({})

    localStorage.setItem('logged', false);
    localStorage.setItem('user',  {});
  }

  function DarkMode(){
    var dark = darkmode ? false : true
    setDarkmode(dark)
    localStorage.setItem('darkmode',  JSON.stringify(dark));

  }


  const LogoAuahaSvg = (props) => {
    let color = props.color
    return(
      <svg xmlns="http://www.w3.org/2000/svg" width="149.391" height="58.008" viewBox="0 0 149.391 58.008" fill={ color }>
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

  function validarLogin(e){
    e.preventDefault()
    Login(email, senha).then((response) => {
      setLogged(response.logged)
      setUser(response.user)
      setStore(response.store)

      localStorage.setItem('user',  JSON.stringify(response.user));
      localStorage.setItem('store',  JSON.stringify(response.store));
      localStorage.setItem('logged', response.logged);

      setMsg(response.msg)
    })
  }


  return (
    <>
    <Head>
      <title>Painel de Personalização</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="https://auaha.com.br/wp-content/themes/auahanew/img/favicon.png" />
    </Head>
    <main className={ darkmode ? "dark" : "light"}>
      {logged == true
        ? <>
          <Menu darkmode={ darkmode} user={ user } store={ store }  />
          <div className={ "body" }>
            <Component {...pageProps} Sair={ Sair } Darkmode={DarkMode} dark={ darkmode } user={ user} store={ store } />
          </div>
        </>
        : <>
          <div className={ "login" }>
            <div className={ "login__container" }>
              <LogoAuahaSvg color={ darkmode ? "#fff" : "#000"}/>
              Seja bem vindo a Ferramenta de <br/><b>Personalização Auaha</b>
              <form onSubmit={e =>  validarLogin(e) }>
                <input name={ "email" } value={ email } placeholder={ "E-mail" } onChange={e => setEmail(e.target.value)}/>
                <input name={ "senha" } value={ senha } placeholder={ "Senha" }  type={"password"} onChange={e => setSenha(e.target.value)}/>
                {msg
                ? <span>{ msg }</span>
                : null
                }
                <button type={ "submit" }>Entrar</button>
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
