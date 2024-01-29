import { useContext, useEffect, useState } from 'react';
import style from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthContext';
import Message from '../layout/Message';
import Alert from '@mui/material/Alert';
function Login(){
    const navigate = useNavigate()

    const [message, setMessage] = useState('')
    const [type, setType] = useState()

    const [ dados, setDados] = useState({})       
    const authContext = useContext(AuthContext)
    
    if (!authContext) {
        console.error("AuthContext não foi fornecido corretamente.");
        return null;
    }

    const { signed, signin} = authContext
    const handleSigninIn = async (e)=>{
        e.preventDefault()
        const resp = await signin({
            email: dados.email,
            senha: dados.password
        })

        setMessage(resp.menssagem)
        setType(resp.type)
        setTimeout(() => { setMessage('') }, 4010);

    }

    
        if(signed){
            return navigate("/projetos")
        }
    
        function handleChange(e){
            setDados({...dados, [e.target.name]: e.target.value})
        }

    return (
        <section className={style.splitScreen}>
            <div className={style.left}>
                <Alert className={style.alert} variant="filled" severity="info">
                    Aplicativo está em faze de testes!{<br/>} O E-mail ainda não está sendo validado pelo nosso sistema por esse motivo a <span>esqueci minha senha</span> ainda não esta funcionando.{<br/>}
                    Caso tenha esquecido sua senha entre em <span>contato com nossos desenvolvedores</span> e receberá ajuda para acessar sua conta.
                </Alert>
                <section className={style.copy}>
                    <h1>Bem vindo ao <span>costs</span></h1>
                    <p>Planeje e organize seus projetos com a gente!</p>
                </section>
                
            </div>
            <div className={style.right}>
                
                {message && <Message type={type} msg={message} />}
                <form onSubmit={handleSigninIn}>
                    <section className={style.cardCenter}>
                        <section className={style.copy}>
                            <h2>Login</h2>
                        </section>
                        <div className={`${style.inputContainer} ${style.email}`}>
                            <label for="email">E-mail</label>
                            <input 
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Digite seu E-mail"
                                onChange={handleChange}
                                value={dados.email ? dados.email : ''}
                            />
                        </div>
                        <div className={`${style.inputContainer} ${style.password}`}>
                            <label for="password">Senha</label>
                            <input 
                                 type="password"
                                 id="password"
                                 name="password"
                                 placeholder="Digite sua senha"
                                 onChange={handleChange}
                                 value={dados.password ? dados.password : ''}
                                />
                        </div>
                        <a href='http://localhost:3000/Login'>Esqueci minha <span>senha</span></a>
                        <button className={style.btn} type='submit'>Continuar</button>
                        <a href='http://localhost:3000/Cadastrar'>Ainda não sou cliente <span>inscrever-se</span></a>
                    </section>
                </form>
                
            </div>
        </section>
    )
}

export default Login;