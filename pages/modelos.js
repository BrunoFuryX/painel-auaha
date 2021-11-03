import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import ImagemUsuario from "/public/images/ImagemUsuario.svg"
import { getUserbyId, getUsersbyOrder, setUser, deleteUser, getUsersbyWhere, getUsers } from '/public/services/usuarios';
import { setCase, getCasebyWhere , deleteCase, getCasebyId, getCases, getCasesbyOrder } from '/public/services/capas';
import { getStorebyId, getStoresbyOrder, setStore, deleteStore, getStoresbyWhere, getStores, getRecentStores } from '/public/services/lojas';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import app from "/public/services/firebase"
import storage from "/public/services/storage"

import sair from "/public/images/sair.svg"
import { async } from '@firebase/util';


export default function Modelos(props) {
  const user = props.user
  const [dark, setDark] = useState(props.dark)
  const [edit, setEdit] = useState(false)

  const [form, setForm] = useState({
    "id": "",
    "image1": "",
    "image1caminho": "",
    "image2": "",
    "image2caminho": "",
    "loja": "",
    "productId": "",
  })

  const [lojas, setLojas] = useState([])

  const [ search, setSearch] = useState("")
  const [ searchCampo, setSearchCampo] = useState(false)

  const [ button, setButton] = useState("Adicionar")

  const [ msg, setMsg] = useState(false)
  const [ confirm, setConfirm] = useState(false)
  const [ preview, setPreview] = useState(false)

  const [ x, setX] = useState("waiting")

  const [ lista, setLista] = useState([])

  useEffect( ()=>{
    getCases().then((response) => {
      setTimeout(() => {
        setLista(response)
      }, 500);
    })

    getStores().then((response) => {
      setTimeout(() => {
        setLojas(response)
        console.log(lojas)

      }, 500);
    })

  },[])

  function Buscar(){
    getStores().then((response) => {
      setTimeout(() => {
        setLojas(response)

      }, 500);
    })
    if(searchCampo && search){
      getCasebyWhere(searchCampo, search).then( (response) => {
        setTimeout(() => {

          setLista(response)
          console.log(response)
        }, 500);

      })
    }else{
      getCases().then( (response) => {
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
              Id do Produto:
              </b>
              {item.productId}
            </div>
            <div className={ "image1" }>
              <b>
              Imagem da capa:
              </b>
              <a href={ item.image1} target="_blank" rel="noreferrer"> Ver a imagem </a>

            </div>
            <div className={ "image2" }>
              <b>
                Imagem do Mockup:
              </b>
              <a href={ item.image2} target="_blank" rel="noreferrer"> Ver a imagem </a>

            </div>
            <div className={ "acoes" }>
              <b>
                Açoes:
              </b>
              <button className="editar" onClick={ () => Editar(item.id)}>Editar</button>
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
          <div className={ "image1" }>
            <div>
            Imagem da capa
            </div>
          </div>
          <div className={ "image2" }>
            <div>
            Imagem do Mockup
            </div>
          </div>
          <div className={ "acoes" }>
            <div>
            Ações
            </div>
          </div>
        </div>
        <div className={ "corpo" }>
          { listafeita }
        </div>
      </div>
    )
  }
  function Editar(id){

    setForm({
      "id": "",
      "image1": "",
      "image1caminho": "",
      "image2": "",
      "image2caminho": "",
      "loja": "",
      "productId": "",
    })

    getCasebyId(id).then(response => {
      let resposta = response
      setForm({
          ...resposta,
          id: id
      })
      setButton("Salvar")
      setEdit(true)

    })
  }
  async function Excluir(id){
    var data = await getCasebyId(id)
    console.log(data)

    setMsg(`Registro ${id} será excluido, deseja continuar?`)
    setConfirm(true)
    setPreview(data.image1)
    setX(id)
    console.log("foi")
  }
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setForm(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  function enviarForm(e) {
    e.preventDefault();

    const data = form

    if(data.id){
      setMsg(`Registro ${data.id} editado com sucesso`)
      setConfirm(false)
      setPreview( data.image1 )

    }else{
      setMsg(`Novo registro criado com sucesso`)
      setConfirm(false)
      setPreview(data.image1)

    }
    setCase(data)

    setForm({
      "id": "",
      "image1": "",
      "image1caminho": "",
      "image2": "",
      "image2caminho": "",
      "loja": "",
      "productId": "",
    })
    setEdit(false)

    Buscar()
  }


  function enviarCapa(e){
    const refImg = ref(storage, (form.store ? form.store : "Auaha" ) +'/images/' + ( form.productId != "" ? form.productId : "teste") + '/capa.png')
    
    console.log(e.target.files[0])

    var uploadTask = uploadBytesResumable(refImg, e.target.files[0])
    uploadTask.on('state_changed', 
    (snapshot) =>{
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },(error) => {
      console.log(error)
    }, function() {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        var caminho = (form.store ? form.store : "Auaha" ) +'/images/' + ( form.productId != "" ? form.productId : "teste") + '/capa.png'
        var image = downloadURL
        console.log(caminho, image)
        setForm(prevState => ({
          ...prevState,
          image1: image,
          image1caminho: caminho,

      }));
        
      });
    });
  }

  function enviarMockup(e){
    const refImg = ref(storage, (form.store ? form.store : "Auaha" ) +'/images/' + ( form.productId != "" ? form.productId : "teste") + '/mockup.png')
    
    console.log(e.target.files[0])

    var uploadTask = uploadBytesResumable(refImg, e.target.files[0])
    uploadTask.on('state_changed', 
    (snapshot) =>{
      //task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },(error) => {
      console.log(error)
    }, function() {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        var caminho = (form.store ? form.store : "Auaha" ) +'/images/' + ( form.productId != "" ? form.productId : "teste") + '/mockup.png'
        var image = downloadURL
        console.log(caminho, image)
        setForm(prevState => ({
          ...prevState,
          image2: image,
          image2caminho: caminho,

      }));
      });
    });
  }

  return (
    <>
      <header className="desktop">
        <h2>
         Modelos de capas
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
        <div className={ "cadastro" }>
          <div className={ "cadastro__container " + (edit ? "editar" : "" ) }>
              <h3>
                Adicionar novas capas
              </h3>
              <form onSubmit={ e => enviarForm(e) }>
                  <input type="hidden" name={ "id" } value={ form.id }/>
                  <select name={ "loja" } value={ user.store ? user.store : form.loja } readOnly={ user.store ? true : false }  onChange={handleChange}>
                    <option value={ "" }>Auaha</option>
                    {lojas.map(element => {

                      return( <option key={element.id} value={ element.id }> {element.StoreName} </option> )
                    })}
                  </select>
                  <input name={ "productId" } value={ form.productId }  placeholder={ "Id do Produto" }  onChange={handleChange}/>
                  <input name={ "image1" } type="hidden" value={ form.image1 } onChange={handleChange}/>
                  <input name={ "image2" } type="hidden" value={ form.image2 } onChange={handleChange}/>
                  <input name={ "image1caminho" } type="hidden" value={ form.image1caminho } onChange={handleChange}/>
                  <input name={ "image2caminho" } type="hidden" value={ form.image2caminho } onChange={handleChange}/>
                  <div className="file">
                    <input name={ "capa" } type="file" onChange={enviarCapa}/>
                    <label htmlFor="capa" className={ form.image1? "active" : ""}>
                      {form.image1 ? 
                      <> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="20.121" height="17.303" viewBox="0 0 20.121 17.303">
                          <g id="_8Ot0Al.tif" data-name="8Ot0Al.tif" transform="translate(-1232.329 -1260.092)">
                            <g id="Grupo_7" data-name="Grupo 7" transform="translate(1232.329 1260.092)">
                              <path id="Caminho_9" data-name="Caminho 9" d="M1232.329,1275.345v-13.2c.01-.016.028-.031.03-.047a2.385,2.385,0,0,1,2.457-2.007c1.839.027,3.68.007,5.52.007q4.842,0,9.685,0a2.343,2.343,0,0,1,2.424,2.352q.011,6.294-.007,12.588a2.387,2.387,0,0,1-.222.982,2.288,2.288,0,0,1-2.235,1.371q-6.335,0-12.671,0c-.9,0-1.794.01-2.691-.006a2.276,2.276,0,0,1-1.829-.954A2.939,2.939,0,0,1,1232.329,1275.345Zm1.572-7.011.035.02,3.22-4.7,2.611,3.259,1.181-1.7c.064.081.117.146.168.213q2.85,3.7,5.7,7.408a.341.341,0,0,0,.306.156c1.185-.006,2.37,0,3.556,0,.063,0,.126-.006.194-.01,0-.048.006-.08.006-.112q0-5.185,0-10.369a.782.782,0,0,0-.846-.827q-7.642,0-15.283,0a.785.785,0,0,0-.843.849q0,2.376,0,4.753Zm16.971,6.228h-.252c-1.414,0-2.828,0-4.243,0a.4.4,0,0,1-.357-.177q-2.436-3.178-4.882-6.35c-.038-.049-.081-.094-.133-.154l-4.863,6.987-1.289-.9c.063-.093.114-.167.165-.241q1.85-2.658,3.7-5.314a.216.216,0,0,0-.012-.316c-.453-.551-.894-1.112-1.34-1.668-.035-.043-.074-.082-.116-.129-.026.032-.044.051-.059.072q-1.613,2.356-3.223,4.715a.478.478,0,0,0-.069.254q-.006,1.8,0,3.593a1.2,1.2,0,0,0,.02.253.8.8,0,0,0,.892.625h15.124c.059,0,.118,0,.177,0a.778.778,0,0,0,.755-.735C1250.881,1274.92,1250.872,1274.757,1250.872,1274.563Z" transform="translate(-1232.329 -1260.092)"/>
                              <path id="Caminho_10" data-name="Caminho 10" d="M1549.621,1334.525a2.358,2.358,0,1,1,2.359,2.361A2.354,2.354,0,0,1,1549.621,1334.525Zm2.353-.781a.784.784,0,0,0,0,1.569.784.784,0,1,0,0-1.569Z" transform="translate(-1537.129 -1329.334)"/>
                            </g>
                          </g>
                        </svg>
                        Trocar Imagem
                      </> 
                      :
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16.666" height="16.665" viewBox="0 0 16.666 16.665">
                          <g id="Grupo_82" data-name="Grupo 82" transform="translate(-318.786 -412.166)">
                            <path id="Caminho_49" data-name="Caminho 49" d="M319.426,419.861h0a.628.628,0,0,0-.456.184.668.668,0,0,0-.183.474V427.6a1.215,1.215,0,0,0,1.226,1.229h14.22a1.209,1.209,0,0,0,1.16-.844l.06-.17v-7.453a.168.168,0,0,1-.017-.031.65.65,0,0,0-.741-.466.688.688,0,0,0-.524.714c.01,1.587.009,3.174.007,4.762V427.3a.251.251,0,0,1-.25.25H320.312a.25.25,0,0,1-.25-.25v-6.774A.63.63,0,0,0,319.426,419.861Z"/>
                            <path id="Caminho_50" data-name="Caminho 50" d="M331.106,416.216a.663.663,0,0,0-.245-.582l-1-1c-.664-.666-1.328-1.332-2-1.991a3.974,3.974,0,0,0-.443-.358l-.164-.121h-.275c-.053.041-.108.081-.163.121a3.869,3.869,0,0,0-.443.359c-.752.739-1.5,1.486-2.241,2.233l-.716.717a1.634,1.634,0,0,0-.164.179.645.645,0,0,0,.441,1.02.682.682,0,0,0,.56-.219c.362-.356.721-.716,1.079-1.076l.556-.556c.032-.031.065-.061.106-.1l.067-.06a.249.249,0,0,1,.168-.066.236.236,0,0,1,.1.022.248.248,0,0,1,.149.228v2.113q0,3.75,0,7.5a.886.886,0,0,0,.043.294.636.636,0,0,0,1.23-.24V415a.249.249,0,0,1,.142-.226.333.333,0,0,1,.369.05c.067.078,1.173,1.218,1.729,1.767a.6.6,0,0,0,.675.17A.608.608,0,0,0,331.106,416.216Z"/>
                          </g>
                        </svg>

                        Escolher arquivo para a capa
                      </>
                      }
                      
                    </label>
                  </div>
                  <div className="file">
                    <input name={ "mockup" } type="file" onChange={enviarMockup}/>
                    <label htmlFor="mockup" className={ form.image2 ? "active" : ""}>
                      {form.image2 ? 
                      <> 
                        <svg xmlns="http://www.w3.org/2000/svg" width="20.121" height="17.303" viewBox="0 0 20.121 17.303">
                          <g id="_8Ot0Al.tif" data-name="8Ot0Al.tif" transform="translate(-1232.329 -1260.092)">
                            <g id="Grupo_7" data-name="Grupo 7" transform="translate(1232.329 1260.092)">
                              <path id="Caminho_9" data-name="Caminho 9" d="M1232.329,1275.345v-13.2c.01-.016.028-.031.03-.047a2.385,2.385,0,0,1,2.457-2.007c1.839.027,3.68.007,5.52.007q4.842,0,9.685,0a2.343,2.343,0,0,1,2.424,2.352q.011,6.294-.007,12.588a2.387,2.387,0,0,1-.222.982,2.288,2.288,0,0,1-2.235,1.371q-6.335,0-12.671,0c-.9,0-1.794.01-2.691-.006a2.276,2.276,0,0,1-1.829-.954A2.939,2.939,0,0,1,1232.329,1275.345Zm1.572-7.011.035.02,3.22-4.7,2.611,3.259,1.181-1.7c.064.081.117.146.168.213q2.85,3.7,5.7,7.408a.341.341,0,0,0,.306.156c1.185-.006,2.37,0,3.556,0,.063,0,.126-.006.194-.01,0-.048.006-.08.006-.112q0-5.185,0-10.369a.782.782,0,0,0-.846-.827q-7.642,0-15.283,0a.785.785,0,0,0-.843.849q0,2.376,0,4.753Zm16.971,6.228h-.252c-1.414,0-2.828,0-4.243,0a.4.4,0,0,1-.357-.177q-2.436-3.178-4.882-6.35c-.038-.049-.081-.094-.133-.154l-4.863,6.987-1.289-.9c.063-.093.114-.167.165-.241q1.85-2.658,3.7-5.314a.216.216,0,0,0-.012-.316c-.453-.551-.894-1.112-1.34-1.668-.035-.043-.074-.082-.116-.129-.026.032-.044.051-.059.072q-1.613,2.356-3.223,4.715a.478.478,0,0,0-.069.254q-.006,1.8,0,3.593a1.2,1.2,0,0,0,.02.253.8.8,0,0,0,.892.625h15.124c.059,0,.118,0,.177,0a.778.778,0,0,0,.755-.735C1250.881,1274.92,1250.872,1274.757,1250.872,1274.563Z" transform="translate(-1232.329 -1260.092)"/>
                              <path id="Caminho_10" data-name="Caminho 10" d="M1549.621,1334.525a2.358,2.358,0,1,1,2.359,2.361A2.354,2.354,0,0,1,1549.621,1334.525Zm2.353-.781a.784.784,0,0,0,0,1.569.784.784,0,1,0,0-1.569Z" transform="translate(-1537.129 -1329.334)"/>
                            </g>
                          </g>
                        </svg>
                        Trocar Imagem
                      </> 
                      :
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16.666" height="16.665" viewBox="0 0 16.666 16.665">
                          <g id="Grupo_82" data-name="Grupo 82" transform="translate(-318.786 -412.166)">
                            <path id="Caminho_49" data-name="Caminho 49" d="M319.426,419.861h0a.628.628,0,0,0-.456.184.668.668,0,0,0-.183.474V427.6a1.215,1.215,0,0,0,1.226,1.229h14.22a1.209,1.209,0,0,0,1.16-.844l.06-.17v-7.453a.168.168,0,0,1-.017-.031.65.65,0,0,0-.741-.466.688.688,0,0,0-.524.714c.01,1.587.009,3.174.007,4.762V427.3a.251.251,0,0,1-.25.25H320.312a.25.25,0,0,1-.25-.25v-6.774A.63.63,0,0,0,319.426,419.861Z"/>
                            <path id="Caminho_50" data-name="Caminho 50" d="M331.106,416.216a.663.663,0,0,0-.245-.582l-1-1c-.664-.666-1.328-1.332-2-1.991a3.974,3.974,0,0,0-.443-.358l-.164-.121h-.275c-.053.041-.108.081-.163.121a3.869,3.869,0,0,0-.443.359c-.752.739-1.5,1.486-2.241,2.233l-.716.717a1.634,1.634,0,0,0-.164.179.645.645,0,0,0,.441,1.02.682.682,0,0,0,.56-.219c.362-.356.721-.716,1.079-1.076l.556-.556c.032-.031.065-.061.106-.1l.067-.06a.249.249,0,0,1,.168-.066.236.236,0,0,1,.1.022.248.248,0,0,1,.149.228v2.113q0,3.75,0,7.5a.886.886,0,0,0,.043.294.636.636,0,0,0,1.23-.24V415a.249.249,0,0,1,.142-.226.333.333,0,0,1,.369.05c.067.078,1.173,1.218,1.729,1.767a.6.6,0,0,0,.675.17A.608.608,0,0,0,331.106,416.216Z"/>
                          </g>
                        </svg>

                        Escolher arquivo para o mockup
                      </>
                      }
                      
                    </label>
                  </div>
                  <button type="submit">{ button }</button>
              </form>
          </div>
        </div>
        <div className={ "listagem" }>
          <div className={ "listagem__header" }>
              <select name={ "searchCampo" } value={ searchCampo }  onChange={(e) => setSearchCampo(e.target.value)}>
                <option value={ "" }>Selecione</option>
                <option value={ "loja" }>Loja(ID)</option>
                <option value={ "productId" }>Id do Produto</option>
              </select>
              <input name={ "search" } value={ search } placeholder={ "Buscar" } onChange={(e) => setSearch(e.target.value)} />
              <button className="buscar"  onClick={ (e) => Buscar() }>
                <svg id="Grupo_562" data-name="Grupo 562" xmlns="http://www.w3.org/2000/svg" width="22.301" height="22.262" viewBox="0 0 22.301 22.262">
                  <path id="Caminho_65" data-name="Caminho 65" d="M63.6,187.636h-.436a6.927,6.927,0,0,1-.673-.524q-2.125-2.1-4.235-4.221c-.054-.054-.112-.106-.167-.158-.035.025-.059.04-.082.058l-.154.12a9.668,9.668,0,0,1-7.476,1.966,9.833,9.833,0,0,1-8.209-7.891c-.068-.361-.114-.725-.17-1.088v-1.435c.014-.056.031-.11.041-.167.084-.5.132-1,.255-1.492a9.82,9.82,0,0,1,19.313,3.184,9.585,9.585,0,0,1-1.312,4.135c-.273.458-.591.888-.9,1.351.047.042.11.092.166.148q2.11,2.1,4.215,4.212a6.913,6.913,0,0,1,.525.672v.435A1.112,1.112,0,0,1,63.6,187.636ZM51.831,167.2a7.982,7.982,0,1,0,7.987,7.992A8,8,0,0,0,51.831,167.2Z" transform="translate(-42 -165.374)"/>
                </svg>
              </button>
          </div>
          <div className={ "listagem__list" }>
            <div className={ "listagem__list-header" }>Modelos de capas</div>
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
              <Image src={ preview } layout="fill"/>
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
            <button className={ "aviso__confirm" } onClick={ e => { setMsg(`Registro excluido`); deleteCase(x); setX(false);setConfirm(false); Buscar(); }}>
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
