import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import ImagemUsuario from "/public/images/ImagemUsuario.svg"

import { getRecentUsers } from '/public/services/usuarios';
import { getRecentStores } from '/public/services/lojas';



import sair from "/public/images/sair.svg"

export default function Home(props) {
  const user = props.user
  const [dark, setDark] = useState(props.dark)

  const [usersList, setUsersList] = useState([])
  const [storesList, setStoresList] = useState([])


  useEffect(() => {
    getRecentUsers(user.store).then(response => setUsersList(response))
    getRecentStores().then(response => setStoresList(response))
  },[])


  const DashboardItem = (props) => {
    const lista = props.lista
    const listafeita = lista.map((item) => {
      return(
        <div key={item.id} >{item.info}</div> 
      )
    })
    console.log(lista)
    return(
      <div className={ "dashboard__item" }>
        <div className={ "dashboard__item-header" }>
        { props.titulo }
        </div>
        <div className={ "dashboard__item-body" }>
          { listafeita }
        </div>
        <div className={ "dashboard__item-footer" }>
          <a href={ props.link }>Ver mais</a>
        </div>
      </div>
    )
  }

  return (
    <>
      <header className="desktop">
        <h2>
          Painel do Usuário
        </h2>
        <div>
          <div className={"customer"}>
            <Image src={ user.foto ? user.foto : ImagemUsuario} width={49} height={49} />
            Olá {user.name}
          </div>
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
          <div className={"exit"} onClick={(e) => props.Sair()}>
            <Image src={sair} width={20} height={20} />
            Sair
          </div>
        </div>
      </header>
      <div className={ "dashboard" }>
        <div className={ "dashboard__list" }>

          <DashboardItem titulo={ "Últimos Usuários" } lista={ usersList } link={ "/usuarios" }/>

          <DashboardItem titulo={ "Últimas Lojas" } lista={ storesList } link={ "/lojas" }/>

          <DashboardItem titulo={ "Últimos Logs" } lista={ ["Usuário 01 modificou o arquivo x", "Login de Usuário 01", "Usuário 01 modificou o arquivo x", "Login de Usuário 01"] } link={ "/logs" }/>

        </div>
      </div>
    </>
  )
}
