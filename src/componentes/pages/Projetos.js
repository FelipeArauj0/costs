import style from './Projetos.module.css';
import Message from "../layout/Message";

import LinkButton from '../layout/LinkButton';
import Container from '../layout/Container';
import loading from '../layout/Loading';

import { useState, useEffect, useContext } from 'react';


import ProjetoCard from '../projetos/ProjetoCard';
import Loading from '../layout/Loading';
import instance from '../../Conexao-API/Axios';


function Projetos(){
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')
    
    const storedToken = localStorage.getItem("@Auth:token")
    
    

    // console.log('token: projetos:  ', storedToken)
    let message = ''
    

    const carregarProjetos = async () => {
        try {
          const response = await instance.get('/projetos', {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });
                    
          setProjects(response.data);
          setRemoveLoading(true);
        } catch (error) {
          console.log('Erro ao carregar projetos:', error);
        }
      };

    useEffect(() => {
        carregarProjetos();
      }, []);
    
    const removeProject = async (id)=>{
        try {
            const response = await instance.delete(`/projetos/${id}`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
            setTimeout(() => {setProjectMessage('')}, 2010)
            setProjects(projects.filter((project)=> project.id !== id))
            
            setProjectMessage('Projeto removido com sucesso')
        } catch (error) {
          console.log('Erro ao carregar projetos:', error);
            
        }
    }

    return (
        <div className={style.project_container}>
            <div className={style.title_container}> 
                <h1>Meus Projetos</h1>
                <LinkButton to="/NovoProjeto" text="Criar projeto"/>
            </div>
            {message && <Message msg={message} type="sucess"/>}
            {projectMessage && <Message msg={projectMessage} type="sucess"/>}
            <Container customClass='start'>
                {projects.length > 0 &&
                    projects.map((projeto)=>(
                        <ProjetoCard
                            id={projeto.id}
                            name={projeto.name} 
                            budget={projeto.budget} 
                            categories={projeto.categories.name}
                            key={projeto.id}
                            handleRemove={removeProject}
                        />
                    ))
                }
                {!removeLoading && <Loading/>}
                {removeLoading && projects.length === 0 || projects.length === undefined && (
                    <p>Não há projetos cadastrados</p>
                )}
            </Container>
        </div>
    )
}

export default Projetos;