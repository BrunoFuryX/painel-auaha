import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import ImagemUsuario from "/public/images/ImagemUsuario.svg"
import { getUserbyId, getUsersbyOrder, setUser, deleteUser, getUsersbyWhere, getUsers } from '/public/services/usuarios';
import { getStorebyId, getStoresbyOrder, setStore, deleteStore, getStoresbyWhere, getStores, getRecentStores } from '/public/services/lojas';
import { getLogbyWhere, getLogs, getLogsbyOrder, setLog, deleteLog, getLogById,getRecentLogs } from '/public/services/logs';

import $ from 'jquery'


import sair from "/public/images/sair.svg"
import { async } from '@firebase/util';

export default function Usuarios(props) {
  const user = props.user
  const [dark, setDark] = useState(props.dark)

  const [ search, setSearch] = useState("")
  const [ searchCampo, setSearchCampo] = useState(false)

  const [ msg, setMsg] = useState(false)
  const [ confirm, setConfirm] = useState(false)
  const [ preview, setPreview] = useState(false)

  const [ x, setX] = useState("waiting")

  const [ lista, setLista] = useState([])

  useEffect( ()=>{
    getLogs().then((response) => {
      setTimeout(() => {
        setLista(response)
      }, 500);
    })

  },[])

  function Buscar(){

    if(searchCampo && search){
        getLogbyWhere(searchCampo, search).then( (response) => {
        setTimeout(() => {

          setLista(response)
        }, 500);

      })
    }else{
        getLogs().then( (response) => {
        setTimeout(() => {

        setLista(response)
      }, 500);

      })
    }
  }

  const Listagem = (props) => {
    let listafeita
    if(lista){

      listafeita = lista.map((item, index) => {
      return(
        <div key={ item.id } className={ "item" } >
            <div className={ "id" }>
              <b>
                ID:
              </b>
              { item.id}
            </div>
            <div className={ "loja" }>
              <b>
                Loja:
              </b>
              { item.loja}
            </div>
            <div className={ "usuario" }>
              <b>
                Usuario:
              </b>
              { item.usuario}
            </div>

            <div className={ "info" }>
              <b>
                Info:
              </b>
              { item.info}

            </div>

            <div className={ "data" }>
              <b>
                Data:
              </b>
              { item.data}
            </div>
        </div> 
      )
    })
  }else{
    listafeita = ""
  }

    return(
      <div className={ "tabela" }>
        <div className={ "topo" }>
          <div className={ "id" }>
            <div>
              ID
            </div>
          </div>
          <div className={ "loja" }>
            <div>
              Loja
            </div>
          </div>
          <div className={ "usuario" }>
            <div>
              Usuário
            </div>
          </div>
          <div className={ "info" }>
            <div>
            Informações
            </div>
          </div>
          <div className={ "data" }>
            <div>
              Data
            </div>
          </div>
        </div>
        <div className={ "corpo" }>
          { listafeita }
        </div>
      </div>
    )
  }

  return (
    <>
      <header className="desktop">
        <h2>
          Logs
        </h2>
        <div>
          <div className={"customer"}>
            <Image src={user.foto ? user.foto : ImagemUsuario} width={49} height={49} />
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
      <div className={ "painel" }>
        <div className={ "listagem" }>
          <div className={ "listagem__header" }>
              <select name={ "searchCampo" } value={ searchCampo }  onChange={(e) => setSearchCampo(e.target.value)}>
                <option value={ "" }>Selecione</option>
                <option value={ "store" }>Loja(ID)</option>
              </select>
              <input name={ "search" } value={ search } placeholder={ "Buscar" } onChange={(e) => setSearch(e.target.value)} />
              <button className="buscar"  onClick={ (e) => Buscar() }>
                <svg id="Grupo_562" data-name="Grupo 562" xmlns="http://www.w3.org/2000/svg" width="22.301" height="22.262" viewBox="0 0 22.301 22.262">
                  <path id="Caminho_65" data-name="Caminho 65" d="M63.6,187.636h-.436a6.927,6.927,0,0,1-.673-.524q-2.125-2.1-4.235-4.221c-.054-.054-.112-.106-.167-.158-.035.025-.059.04-.082.058l-.154.12a9.668,9.668,0,0,1-7.476,1.966,9.833,9.833,0,0,1-8.209-7.891c-.068-.361-.114-.725-.17-1.088v-1.435c.014-.056.031-.11.041-.167.084-.5.132-1,.255-1.492a9.82,9.82,0,0,1,19.313,3.184,9.585,9.585,0,0,1-1.312,4.135c-.273.458-.591.888-.9,1.351.047.042.11.092.166.148q2.11,2.1,4.215,4.212a6.913,6.913,0,0,1,.525.672v.435A1.112,1.112,0,0,1,63.6,187.636ZM51.831,167.2a7.982,7.982,0,1,0,7.987,7.992A8,8,0,0,0,51.831,167.2Z" transform="translate(-42 -165.374)"/>
                </svg>
              </button>
          </div>
          <div className={ "listagem__list" }>
            <div className={ "listagem__list-header" }>Logs</div>
            <div className={ "listagem__list-body" }>
              <Listagem />
            </div>
          </div>
        </div>
      </div>
      {msg ?
      <div className={ "sombra" }>
          <div className={ "aviso" }>
            {preview 
            ?
            <div className={ "aviso__preview" }>
              <Image src={ preview } />
            </div>
            : null
            }
            
            <div className={ "aviso__msg" }>
              { msg }
            </div>
            <div className={ "aviso__actions" }>
            {!confirm 
            ?
            <button className={ "aviso__ok" } onClick={ e => setMsg(false)}>
              OK
            </button>
            :
            <>
            <button className={ "aviso__cancel" } onClick={ e => { setMsg(`Registro não foi excluido`); setConfirm(false); setX(false) }}>
              Cancelar
            </button>
            <button className={ "aviso__confirm" } onClick={ e => { setMsg(`Registro foi excluido`); deleteArquivo(x); setX(false);setConfirm(false); Buscar(); }}>
              Confirmar
            </button>
            </>
            }
            </div>
          </div>
        </div>
        : null }
    </>
  )
}
