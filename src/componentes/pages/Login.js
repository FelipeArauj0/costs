import { useContext, useState } from 'react';
import style from './Login.module.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthContext';
function Login(){
    const navigate = useNavigate()

    const [ dados, setDados] = useState({})       
    const authContext = useContext(AuthContext)
    
    if (!authContext) {
        console.error("AuthContext não foi fornecido corretamente.");
        return null;
    }

    const { signed, signin} = authContext
    

    const handleSigninIn = async (e)=>{
        e.preventDefault()
        await signin({
            email: dados.email,
            senha: dados.password
        })
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
                <section className={style.copy}>
                    <h1>Bem vindo ao <span>costs</span></h1>
                    <p>Planeje e organize seus projetos com a gente!</p>
                </section>
            </div>
            <div className={style.right}>
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
                        <a href='#'>Esqueci minha <span>senha</span></a>
                        <button className={style.btn} type='submit'>Continuar</button>
                        <a href='http://localhost:3000/Cadastrar'>Ainda não sou cliente <span>inscrever-se</span></a>
                    </section>
                </form>
            </div>
        </section>
    )
}

export default Login;