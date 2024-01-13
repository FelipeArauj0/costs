import style from './Login.module.css'
function Login(){
    return (
        <section className={style.splitScreen}>
            <div className={style.left}>
                <section className={style.copy}>
                    <h1>Bem vindo ao <span>costs</span></h1>
                    <p>Planeje e organize seus projetos com a gente!</p>
                </section>
            </div>
            <div className={style.right}>
                <form>
                    <section className={style.cardCenter}>
                        <section className={style.copy}>
                            <h2>Login</h2>
                        </section>
                        <div className={`${style.inputContainer} ${style.email}`}>
                            <label for="email">E-mail</label>
                            <input type="email" id="email" placeholder="Digite seu E-mail"/>
                        </div>
                        <div className={`${style.inputContainer} ${style.password}`}>
                            <label for="password">Senha</label>
                            <input type="password" id="password" placeholder="Digite sua Senha"/>
                        </div>
                        <a href='#'>Esqueci minha <span>senha</span></a>
                        <button className={style.btn}>Continuar</button>
                        <a href='#'>Ainda não sou cliente <span>inscrever-se</span></a>
                    </section>
                </form>
                {/* implementar tela de cadastrar usuario */}
            </div>
        </section>
    )
}

export default Login;