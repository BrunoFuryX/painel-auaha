import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react';
import ImagemUsuario from "/public/images/ImagemUsuario.svg"
import { getUserbyId, getUsersbyOrder, setUser, deleteUser, getUsersbyWhere, getUsers } from '/public/services/usuarios';
import { getStorebyId, getStoresbyOrder, setStore, deleteStore, getStoresbyWhere, getStores, getRecentStores,getStoresbyWherewithCondition } from '/public/services/lojas';
import { getArquivobyWhere, getArquivos, getArquivoById, getArquivosbyOrder, setArquivo, deleteArquivo } from '/public/services/banners';
import { getStorage, ref, uploadBytesResumable, getDownloadURL,deleteObject  } from 'firebase/storage';
import $ from 'jquery'
import { FaAngleDown, FaAngleUp, FaRegTimesCircle } from "react-icons/fa";

import { setLog } from '/public/services/logs';


import app from "/public/services/firebase"
import storage from "/public/services/storage"

import sair from "/public/images/sair.svg"
import { async } from '@firebase/util';


export default function Modelos(props) {
    const user = props.user
    var dark = props.dark ? props.dark : true
    const [edit, setEdit] = useState(false)

    const [formExpand, setFormExpand] = useState(false)
    const [form, setForm] = useState({
        "id": "",
        "image": [{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },{ caminho: "", url: "",title: "" },],
        "loja": "",
    })

    const [lojas, setLojas] = useState([])

    const [search, setSearch] = useState("")
    const [searchCampo, setSearchCampo] = useState(false)

    const [button, setButton] = useState("Adicionar")

    const [msg, setMsg] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [preview, setPreview] = useState(false)

    const [x, setX] = useState("waiting")
    const [rows, setRows] = useState([])



    useEffect(() => {

        getStoresbyWherewithCondition("BannersMercado",">" ,"0").then((response) => {
            setTimeout(() => {
                setLojas(response)

            }, 500);
        })
        if(user.store != ""){
            const value = user.store;
            const name = "loja";
    
            setForm(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
        
    }, [])

    useEffect(() => {

        var loja = form.loja
        setRows([])

        if (loja != "") {
            getStorebyId(loja).then(data => {
                for (var i = 0; i < data.BannersMercado; i++) {
                    setRows(prev => [...prev, i])
                }
            })
            getArquivoById(loja).then(response => {
                let resposta = response
                console.log(loja)
                console.log(resposta)
                if(response){
                    setForm({
                        ...resposta,
                    })
                    setButton("Salvar")
                    setEdit(true)
                }
            })
        }
    }, [form.loja, user.store])


    function fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Avoid scrolling to bottom
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
      
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
      
        try {
          var successful = document.execCommand('copy');
          var msg = successful ? 'successful' : 'unsuccessful';
          console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
          console.error('Fallback: Oops, unable to copy', err);
        }
      
        document.body.removeChild(textArea);
    }
    function copyTextToClipboard(e, text) {
        e.preventDefault();
        if (!navigator.clipboard) {
            fallbackCopyTextToClipboard(text);
            return;
        }
        navigator.clipboard.writeText(text).then(function() {
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    const handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    function ExcIMG(index){
        var aux = form
        // Create a reference to the file to delete
        const desertRef = ref(storage, aux.image[index].caminho);
        deleteObject(desertRef).then(() => {
            aux.image[index] = {
                caminho: "",
                url: "",
                title: ""
            }
            setForm(aux);
            enviarForm()
        }).catch((error) => {
            aux.image[index] = {
                caminho: "",
                url: "",
                title: ""
            }
            setForm(aux);
            enviarForm()
        });
    }
    function RemoveBanner(e, index){
        e.preventDefault()

        setMsg(`Deseja excluir o Banner ${index + 1}?`)
        setConfirm(true)
        setPreview(form.image[index].url)
        setX(index)
    }
    const BannerItem = (props) => {
        var i = props.i
        return (
            <div className="banner__item" key={"banner" + i}>
                <div className="name">
                    <h3>Banner {i + 1}</h3>
                    <button onClick={(e) => RemoveBanner(e, props.i) }>
                        {form.image[i].url ? <FaRegTimesCircle /> : null }
                    </button>
                </div>
                <input name={`image[${i}].caminho`} type="hidden" value={form.image[i].caminho} onChange={handleChange} />
                <div className="file">
                    <input id={`image[${i}]`} name={`image[${i}]`} type="file" onChange={async (e) => {await enviarImagem(e, i);}} accept=".png " />
                    <label htmlFor={`image[${i}]`} className={form.image[i].url ? "active" : ""}>
                        {form.image[i].url ?
                            <>
                            <Image src={ form.image[i].url } width={ 270 } height={ 270 }/>
                            <div className='trocar'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20.121" height="17.303" viewBox="0 0 20.121 17.303">
                                    <g id="_8Ot0Al.tif" data-name="8Ot0Al.tif" transform="translate(-1232.329 -1260.092)">
                                        <g id="Grupo_7" data-name="Grupo 7" transform="translate(1232.329 1260.092)">
                                            <path id="Caminho_9" data-name="Caminho 9" d="M1232.329,1275.345v-13.2c.01-.016.028-.031.03-.047a2.385,2.385,0,0,1,2.457-2.007c1.839.027,3.68.007,5.52.007q4.842,0,9.685,0a2.343,2.343,0,0,1,2.424,2.352q.011,6.294-.007,12.588a2.387,2.387,0,0,1-.222.982,2.288,2.288,0,0,1-2.235,1.371q-6.335,0-12.671,0c-.9,0-1.794.01-2.691-.006a2.276,2.276,0,0,1-1.829-.954A2.939,2.939,0,0,1,1232.329,1275.345Zm1.572-7.011.035.02,3.22-4.7,2.611,3.259,1.181-1.7c.064.081.117.146.168.213q2.85,3.7,5.7,7.408a.341.341,0,0,0,.306.156c1.185-.006,2.37,0,3.556,0,.063,0,.126-.006.194-.01,0-.048.006-.08.006-.112q0-5.185,0-10.369a.782.782,0,0,0-.846-.827q-7.642,0-15.283,0a.785.785,0,0,0-.843.849q0,2.376,0,4.753Zm16.971,6.228h-.252c-1.414,0-2.828,0-4.243,0a.4.4,0,0,1-.357-.177q-2.436-3.178-4.882-6.35c-.038-.049-.081-.094-.133-.154l-4.863,6.987-1.289-.9c.063-.093.114-.167.165-.241q1.85-2.658,3.7-5.314a.216.216,0,0,0-.012-.316c-.453-.551-.894-1.112-1.34-1.668-.035-.043-.074-.082-.116-.129-.026.032-.044.051-.059.072q-1.613,2.356-3.223,4.715a.478.478,0,0,0-.069.254q-.006,1.8,0,3.593a1.2,1.2,0,0,0,.02.253.8.8,0,0,0,.892.625h15.124c.059,0,.118,0,.177,0a.778.778,0,0,0,.755-.735C1250.881,1274.92,1250.872,1274.757,1250.872,1274.563Z" transform="translate(-1232.329 -1260.092)" />
                                            <path id="Caminho_10" data-name="Caminho 10" d="M1549.621,1334.525a2.358,2.358,0,1,1,2.359,2.361A2.354,2.354,0,0,1,1549.621,1334.525Zm2.353-.781a.784.784,0,0,0,0,1.569.784.784,0,1,0,0-1.569Z" transform="translate(-1537.129 -1329.334)" />
                                        </g>
                                    </g>
                                </svg>
                                Trocar Imagem
                            </div>
                            </>
                            :
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16.666" height="16.665" viewBox="0 0 16.666 16.665">
                                    <g id="Grupo_82" data-name="Grupo 82" transform="translate(-318.786 -412.166)">
                                        <path id="Caminho_49" data-name="Caminho 49" d="M319.426,419.861h0a.628.628,0,0,0-.456.184.668.668,0,0,0-.183.474V427.6a1.215,1.215,0,0,0,1.226,1.229h14.22a1.209,1.209,0,0,0,1.16-.844l.06-.17v-7.453a.168.168,0,0,1-.017-.031.65.65,0,0,0-.741-.466.688.688,0,0,0-.524.714c.01,1.587.009,3.174.007,4.762V427.3a.251.251,0,0,1-.25.25H320.312a.25.25,0,0,1-.25-.25v-6.774A.63.63,0,0,0,319.426,419.861Z" />
                                        <path id="Caminho_50" data-name="Caminho 50" d="M331.106,416.216a.663.663,0,0,0-.245-.582l-1-1c-.664-.666-1.328-1.332-2-1.991a3.974,3.974,0,0,0-.443-.358l-.164-.121h-.275c-.053.041-.108.081-.163.121a3.869,3.869,0,0,0-.443.359c-.752.739-1.5,1.486-2.241,2.233l-.716.717a1.634,1.634,0,0,0-.164.179.645.645,0,0,0,.441,1.02.682.682,0,0,0,.56-.219c.362-.356.721-.716,1.079-1.076l.556-.556c.032-.031.065-.061.106-.1l.067-.06a.249.249,0,0,1,.168-.066.236.236,0,0,1,.1.022.248.248,0,0,1,.149.228v2.113q0,3.75,0,7.5a.886.886,0,0,0,.043.294.636.636,0,0,0,1.23-.24V415a.249.249,0,0,1,.142-.226.333.333,0,0,1,.369.05c.067.078,1.173,1.218,1.729,1.767a.6.6,0,0,0,.675.17A.608.608,0,0,0,331.106,416.216Z" />
                                    </g>
                                </svg>

                                Selecionar Imagem
                            </>
                        }

                    </label>
                </div>
                <div className="paste">
                    <input name={`image[${i}].url`} type="text" placeholder="Link do banner" readOnly={true} value={form.image[i].url} onChange={handleChange} />
                    <button onClick={ (e) => copyTextToClipboard(e, form.image[i].url )}>
                        <svg xmlns="http://www.w3.org/2000/svg"  width="21.173" height="24.937" viewBox="0 0 21.173 24.937">
                            <defs>
                                <clipPath id="clip-path">
                                <rect id="Retângulo_852" data-name="Retângulo 852" width="21.173" height="24.937" transform="translate(0 0)"/>
                                </clipPath>
                            </defs>
                            <g id="Grupo_572" data-name="Grupo 572" transform="translate(0 0)">
                                <g id="Grupo_571" data-name="Grupo 571" clipPath="url(#clip-path)">
                                    <path id="Caminho_67" data-name="Caminho 67" d="M8.543,19.75c-1.081,0-2.163,0-3.244,0a.765.765,0,0,1-.763-.417.744.744,0,0,1,.609-1.074c.039,0,.077,0,.116,0q3.279,0,6.558,0a.747.747,0,0,1,.711,1.115.779.779,0,0,1-.743.378c-1.08-.005-2.163,0-3.244,0" fill="#4cffde"/>
                                    <path id="Caminho_68" data-name="Caminho 68" d="M8.542,16.041c-1.081,0-2.163,0-3.244,0a.75.75,0,1,1-.034-1.493c.8-.005,1.607,0,2.41,0q2.063,0,4.124,0a.753.753,0,0,1,.827.768.706.706,0,0,1-.654.711c-.455.023-.911.014-1.367.016H8.542" fill="#4cffde"/>
                                    <path id="Caminho_69" data-name="Caminho 69" d="M21.166,6.146a.616.616,0,0,0-.145-.364Q18.582,2.971,16.131.17A1.365,1.365,0,0,1,16.022,0H6.7A6.63,6.63,0,0,0,5.632.419a3,3,0,0,0-1.538,2.49V4.145H2.6a6.671,6.671,0,0,0-1.064.42A3,3,0,0,0,0,7.054V8.6H0v.3c0,3.565.006,7.131,0,10.7v2.334a3.169,3.169,0,0,0,2.664,3,1.4,1.4,0,0,0,.171.01H14.1a3.072,3.072,0,0,0,2.975-2.977c0-.389,0-.779,0-1.168H18.2a3.072,3.072,0,0,0,2.975-2.977q0-5.835,0-11.669M15.975,1.517l3.7,4.424H18.642c-.31,0-.62-.019-.928.005a1.192,1.192,0,0,1-1.1-.558,3.1,3.1,0,0,1-.637-1.92c.008-.626,0-1.252,0-1.951m-.38,10.34v9.907A1.574,1.574,0,0,1,13.9,23.453H3.185a1.574,1.574,0,0,1-1.7-1.688V7.312A1.574,1.574,0,0,1,3.168,5.63H10.4V5.9c0,.912,0,1.825,0,2.737a3.048,3.048,0,0,0,2.922,2.932c.749.005,1.5,0,2.274,0Zm-3.712-6.2c1.252,1.5,2.46,2.938,3.7,4.424H14.549c-.309,0-.62-.019-.928,0a1.19,1.19,0,0,1-1.1-.558,3.093,3.093,0,0,1-.638-1.919c.008-.627,0-1.253,0-1.952m7.8,2.05v9.906a1.575,1.575,0,0,1-1.695,1.69h-.916q0-4.508,0-9.016a.611.611,0,0,0-.145-.364q-2.439-2.812-4.89-5.613a1.3,1.3,0,0,1-.109-.17H5.582V3.166A1.572,1.572,0,0,1,7.261,1.485h7.23v.27c0,.913,0,1.825,0,2.738a3.049,3.049,0,0,0,2.922,2.932c.749,0,1.5,0,2.274,0Z" fill="#4cffde"/>
                                </g>
                            </g>
                        </svg>

                    </button>
                </div>

            </div>
        )
    }

    function enviarForm(e) {

        const data = form

        console.log(form)

        if (data.id) {
            setMsg(`Registro ${data.id} editado com sucesso`)
            setConfirm(false)
            var infos =
            {
                loja: user.store,
                usuario: user.name,
                data: Date.now().toString(),
                info: `${user.name} alterou os banners para a loja ${form.loja}`
            }
            setLog(infos)

        } else {
            setMsg(`Editado com sucesso`)
            setConfirm(false)
            var infos =
            {
                loja: user.store,
                usuario: user.name,
                data: Date.now().toString(),
                info: `${user.name} alterou os banners para a loja ${form.loja}`
            }
            setLog(infos)

        }
        setArquivo(data)

    }


    function enviarImagem(e, i) {
        const refImg = ref(storage, (form.loja ? form.loja : "Auaha") + '/banners/banner' + i + '.png')


        var uploadTask = uploadBytesResumable(refImg, e.target.files[0])
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress)
                switch (snapshot.state) {
                    case 'paused':
                        break;
                    case 'running':
                        break;
                }
            }, (error) => {
            }, function () {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    var caminho = (form.loja ? form.loja : "Auaha") + '/banners/banner' + i + '.png'
                    var image = downloadURL
                    var images = form.image
                    images[i] = {url: image, caminho: caminho}
                    setForm(prevState => ({
                        ...prevState,
                        image: images
                    }));

                    var e = document.querySelector('form')
                    enviarForm(e)

                });
            });
    }

    function ExpadirForm() {
        if (formExpand) {
            setFormExpand(false)

        } else {
            setFormExpand(true)

        }
    }



    return (
        <>
            <header className="desktop">
                <h2>
                    Gestor de Banners para MercadoShop
                </h2>
                <div>
                    <div className={"customer"}>
                        <Image src={user.foto ? user.foto : ImagemUsuario} width={49} height={49} />
                        Olá {user.name}
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
            <div className={"painel"}>
                <div className={"banner__cadastro"}>
                    <div className={"banners " + (edit ? "editar" : "") + (formExpand ? " explode " : " implode ")}>
                        <form onSubmit={e => enviarForm(e)}>
                            <input type="hidden" name={"id"} value={user.store ? user.store : form.loja} readOnly={user.store ? true : false} onChange={handleChange}/>
                            <select name={"loja"} value={user.store ? user.store : form.loja} readOnly={user.store ? true : false} type={user.store ? "hidden" : "text"} onChange={handleChange}>
                                <option value={""} disabled={true}>Selecione a Loja</option>
                                {lojas.map(element => {
                                    if(user.store){
                                        if(user.store == element.id){
                                            return (<option key={element.id} value={element.id}> {element.StoreName} </option>)
                                        }
                                    }else{
                                        return (<option key={element.id} value={element.id}> {element.StoreName} </option>)
                                    }
                                })}
                            </select>
                            <div className="banners__list">
                            {rows.map((i) => {
                                return   <BannerItem i={i} key={ 'banner'+i }/>
                            })}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {msg ?
                <div className={"sombra"}>
                    <div className={"aviso"}>
                        {preview
                            ?
                            <div className={"aviso__preview"}>
                                <Image src={preview} layout="fill" />
                            </div>
                            : null
                        }

                        <div className={"aviso__msg"}>
                            {msg}
                        </div>
                        <div className={"aviso__actions"}>
                            {!confirm
                                ?
                                <button className={"aviso__ok"} onClick={e => setMsg(false)}>
                                    OK
                                </button>
                                :
                                <>
                                    <button className={"aviso__cancel"} onClick={e => { setMsg(`Registro não foi excluido`); setConfirm(false); setX(false) }}>
                                        Cancelar
                                    </button>
                                    <button className={"aviso__confirm"} onClick={e => { setMsg(`Registro excluido`); ExcIMG(x); setX(false); setConfirm(false); }}>
                                        Confirmar
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                </div>
                : null}
        </>
    )
}
