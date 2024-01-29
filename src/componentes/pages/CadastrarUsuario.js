import style from './CadastrarUsuario.module.css';
import instance from '../../Conexao-API/Axios';

import { useState } from 'react';
import Message from '../layout/Message';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Loading from '../layout/Loading';
function Cadastrar(){
    const navigate = useNavigate()

    const [ dados, setDados] = useState({})

    const [message, setMessage] = useState('')
    const [type, setType] = useState()

    const cadastrarUsuario = async ()=>{
        

        await instance.post("/cadastrar",{
            email: dados.email,
            senha: dados.password
        })
          .then((response) => {
            setMessage(`${response.data.menssagem}`)
            setType('sucess')
            setTimeout(() => {setMessage('')}, 8010)
            setTimeout(()=>{
                <Loading/>
            } ,5000)
            navigate('/login',{state: {menssagem: 'Cadastro feito com sucesso.'}})    
        })
          .then(()=>{
            console.log('cadastrado com sucesso...');
          })
          .catch((err) => {
            if(err.request.status === 400){
                setMessage(`${err.response.data.menssagem}`)
                setType('error')
                setTimeout(() => {setMessage('')}, 8010)
            }
            if(err.request.status === 500){
                return console.log(err.response.data)

             }
          });
      }
        function handleChange(e){
            setDados({...dados, [e.target.name]: e.target.value})
        }

        const submit = (e)=>{
            e.preventDefault()
            cadastrarUsuario(dados)
        }
        
    return (
        <>
        
        <section className={style.splitScreen}>
        
                <div className={style.left}>
                    <section className={style.copy}>
                        <h1>Bem vindo ao <span>costs</span></h1>
                        <p>Planeje e organize seus projetos com a gente!</p>
                    </section>
                    
                </div>
                <div className={style.right}>
                    <div className={style.right}>
                    
                        {message && <Message type={type} msg={message} />}
                        <form>
                            <section className={style.cardCenter}>
                                <section className={style.copy}>
                                    <h2>Cadastrar</h2>
                                </section>
                                <div className={`${style.inputContainer} ${style.email}`}>
                                    <label for="email">E-mail</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="Digite seu E-mail"
                                        onChange={handleChange}
                                        value={dados.email ? dados.email : ''} />
                                </div>
                                <div className={`${style.inputContainer} ${style.password}`}>
                                    <label for="password">Senha</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder="Digite sua senha"
                                        onChange={handleChange}
                                        value={dados.password ? dados.password : ''} />
                                </div>
                                <button className={style.btn} onClick={submit}>Cadastrar</button>
                                <a href='http://localhost:3000/Login'>Já sou cliente <span>Fazer login</span></a>
                            </section>
                        </form>
                    </div>
                    {/* implementar tela de cadastrar usuario */}
                </div>
            </section></>
    )
}

export default Cadastrar;