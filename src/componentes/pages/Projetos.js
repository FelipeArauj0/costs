import style from './Projetos.module.css';
import Message from "../layout/Message";

import LinkButton from '../layout/LinkButton';
import Container from '../layout/Container';
import loading from '../layout/Loading';

import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import ProjetoCard from '../projetos/ProjetoCard';
import Loading from '../layout/Loading';

function Projetos(){
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    const location = useLocation();

    let message = ''
    if(location.state){
        message = location.state.menssagem;
    }

    useEffect(()=>{
        setTimeout(()=>{
            fetch('http://localhost:5000/projetos',{
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res=> res.json())
            .then((data) => {
                setProjects(data)
                setRemoveLoading(true)
            })
        .catch(error => console.log(error))
        }, 2000)
    },[])

    function removeProject(id){
        fetch(`http://localhost:5000/projetos/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(res=>res.json)
        .then(()=>{
            setTimeout(() => {setProjectMessage('')}, 2010)

            setProjects(projects.filter((project)=> project.id !== id))
            setProjectMessage('Projeto removido com sucesso')
            
        })
        .catch((error)=>console.log(error))
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
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados</p>
                )}
            </Container>
        </div>
    )
}

export default Projetos;