import {useNavigate} from 'react-router-dom'

import ProjetoForm from '../projetos/ProjetoForm';
import style from './NovoProjeto.module.css'
function NovoProjeto(){
    const navigate = useNavigate()
    
    function criarPOST(projeto){
        projeto.costs = 0
        projeto.servicos = []
        fetch('http://localhost:5000/projetos',{
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(projeto)
        })
        .then((res) => res.json())
        .then((data)=>{
            console.log(data)
            //redirect
            navigate('/projetos', {state: {menssagem: 'Projeto criado com sucesso.'}})
        })
        .catch((err) => console.log(`Erro: ${err}`))
        
    }
    return (
        <div className={style.novoprojeto_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu primeiro projeto para depois adicionar serviços</p>
            <ProjetoForm handleSubmit={criarPOST} btntext="Criar projeto"/>
        </div>
    )
}

export default NovoProjeto;