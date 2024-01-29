import {useLocation, useNavigate} from 'react-router-dom'

import ProjetoForm from '../projetos/ProjetoForm';
import style from './NovoProjeto.module.css'
import instance from '../../Conexao-API/Axios';
function NovoProjeto(){
    const navigate = useNavigate()
    
    const storedToken = localStorage.getItem("@Auth:token")
    // console.log('token informado? : ', storedToken)
    
    const criarProjeto = async (projeto)=>{
        // console.log("projeto: ", projeto)
        try {
            const response = await instance.post('projetos',{
                name: projeto.name,
                budget: projeto.budget,
                id_categoria: projeto.categories.id
            },{
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
            console.log(response)
            //redirect
            navigate('/projetos', {state: {menssagem: 'Projeto criado com sucesso.'}})
        } catch (error) {
            console.log('erro interno do servidor: ',error)
        }
    }
    // function criarPOST(projeto){
    //     projeto.costs = 0
    //     projeto.servicos = []
    //     fetch('http://localhost:5000/projetos',{
    //         method: 'POST',
    //         headers: {
    //             "Content-type": "application/json"
    //         },
    //         body: JSON.stringify(projeto)
    //     })
    //     .then((res) => res.json())
    //     .then((data)=>{
    //         console.log(data)
    //         //redirect
    //         navigate('/projetos', {state: {menssagem: 'Projeto criado com sucesso.'}})
    //     })
    //     .catch((err) => console.log(`Erro: ${err}`))   
    // }
    return (
        <div className={style.novoprojeto_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu primeiro projeto para depois adicionar serviços</p>
            <ProjetoForm handleSubmit={criarProjeto} btntext="Criar projeto"/>
        </div>
    )
}

export default NovoProjeto;