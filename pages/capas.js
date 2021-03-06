import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import ImagemUsuario from "/public/images/ImagemUsuario.svg"
import { getUserbyId, getUsersbyOrder, setUser, deleteUser, getUsersbyWhere, getUsers } from '/public/services/usuarios';
import { getStorebyId, getStoresbyOrder, setStore, deleteStore, getStoresbyWhere, getStores, getRecentStores } from '/public/services/lojas';
import { getArquivobyWhere, getArquivos, getArquivoById, getArquivosbyOrder, setArquivo, deleteArquivo } from '/public/services/capinhas';
import $ from 'jquery'

import { setLog } from '/public/services/logs';

import sair from "/public/images/sair.svg"
import { async } from '@firebase/util';

export default function Usuarios(props) {
  const user = props.user
  var dark = props.dark

  const [ search, setSearch] = useState("")
  const [ searchCampo, setSearchCampo] = useState(false)

  const [ msg, setMsg] = useState(false)
  const [ confirm, setConfirm] = useState(false)
  const [ preview, setPreview] = useState(false)

  const [ x, setX] = useState("waiting")

  const [ lista, setLista] = useState([])

  useEffect( ()=>{
    getArquivos().then((response) => {
      setTimeout(() => {
        setLista(response)
      }, 500);
    })

  },[])

  function Buscar(){
    getArquivos(user.store).then((response) => {
      setTimeout(() => {
        setLista(response)
      }, 500);
    })

    if(searchCampo && search){
        getArquivobyWhere(searchCampo, search, user.store).then( (response) => {
        setTimeout(() => {

          setLista(response)
        }, 500);

      })
    }else{
        getArquivos(user.store).then( (response) => {
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
            <div className={ "productId" }>
              <b>
                ID do Produto:
              </b>
              { item.productId}
            </div>
            <div className={ "arquivo" }>
              <b>
                Imagem:
              </b>
              <a href={ item.url} target="_blank" rel="noreferrer"> Ver a Imagem </a>

            </div>

            <div className={ "data" }>
              <b>
                Data:
              </b>
              { item.data}
            </div>
            <div className={ "acoes" }>
              <b>
                A??oes:
              </b>
              <button className="excluir" onClick={ () => Excluir(item.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15.335" height="16.675" viewBox="0 0 15.335 16.675">
                  <g id="_8EXeZC.tif" data-name="8EXeZC.tif" transform="translate(-63 -165.458)">
                    <g id="Grupo_30" data-name="Grupo 30" transform="translate(63 165.458)">
                      <path id="Caminho_35" data-name="Caminho 35" d="M75.105,182.133H66.23c-.061-.017-.122-.035-.184-.049a2.086,2.086,0,0,1-1.643-2.105q0-5.069,0-10.138v-.214H64.22c-.174,0-.348,0-.522,0-.361-.013-.55-.191-.7-.65v-.1c.171-.521.343-.643.905-.643h3.28c0-.666,0-1.306,0-1.945a.724.724,0,0,1,.825-.831h5.316a.724.724,0,0,1,.825.831q0,.879,0,1.758v.188h3.378a.7.7,0,0,1,.613.24,2.3,2.3,0,0,1,.195.4v.1c-.175.539-.331.651-.91.651h-.493v7.992c0,.808.005,1.616,0,2.425a2.081,2.081,0,0,1-1.642,2.04C75.227,182.1,75.167,182.116,75.105,182.133Zm.433-12.5H65.805c0,.057-.007.1-.007.152q0,5.088,0,10.176a.7.7,0,0,0,.791.776q4.078,0,8.156,0a1.1,1.1,0,0,0,.29-.03.7.7,0,0,0,.5-.761q0-5.072,0-10.144Zm-6.95-1.413h4.16v-1.364h-4.16Z" transform="translate(-63 -165.458)" fill="#ff4c34"/>
                      <path id="Caminho_36" data-name="Caminho 36" d="M212.682,339.772c0-1.02,0-2.04,0-3.06a.693.693,0,0,1,1.378-.143,1.8,1.8,0,0,1,.008.2q0,3.027,0,6.054a.713.713,0,0,1-.44.744.683.683,0,0,1-.939-.6c-.017-.64-.007-1.28-.008-1.92Q212.681,340.407,212.682,339.772Z" transform="translate(-207.796 -330.41)" fill="#ff4c34"/>
                      <path id="Caminho_37" data-name="Caminho 37" d="M342.122,339.71q0,1.53,0,3.06a.694.694,0,0,1-1.381.132c0-.049-.006-.1-.006-.146q0-3.043,0-6.087a.7.7,0,0,1,.469-.738.679.679,0,0,1,.91.606c.017.6.007,1.193.008,1.79Q342.123,339.019,342.122,339.71Z" transform="translate(-331.672 -330.332)" fill="#ff4c34"/>
                    </g>
                  </g>
                </svg>
              </button>
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
          <div className={ "productId" }>
            <div>
            Id do Produto
            </div>
          </div>
          <div className={ "arquivo" }>
            <div>
            Imagem
            </div>
          </div>
          <div className={ "data" }>
            <div>
              Data
            </div>
          </div>
          <div className={ "acoes" }>
            <div>
              A??oes
            </div>
          </div>
        </div>
        <div className={ "corpo" }>
          { listafeita }
        </div>
      </div>
    )
  }

  function Excluir(id){
    setMsg(`Registro ${id} ser?? excluido, deseja continuar?`)
    setConfirm(true)
    setPreview(false)
    setX(id)

    var infos = 
    { loja: user.store, 
        usuario: user.name, 
        data: Date.now().toString(), 
        info: `${ user.name } deletou capa personalizada ${ id }` 
    }
    setLog(infos)

  }

  return (
    <>
      <header className="desktop">
        <h2>
        Capas personalizadas
        </h2>
        <div>
          <div className={"customer"}>
            <Image src={user.foto ? user.foto : ImagemUsuario} width={49} height={49} />
            Ol?? {user.name}
          </div>
          <div className={"darkmode"}>
            Modo Escuro
            <div className="onoffswitch">
              <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" checked={dark ? true : false} onChange={() => props.Darkmode()} />
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
            <div className={ "listagem__list-header" }>Capas personalizadas</div>
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
            <button className={ "aviso__cancel" } onClick={ e => { setMsg(`Registro n??o foi excluido`); setConfirm(false); setX(false) }}>
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
