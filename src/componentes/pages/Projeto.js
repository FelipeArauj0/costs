import style from './Projeto.module.css'
import {useParams} from 'react-router-dom'
import { useState, useEffect } from 'react';

import { v4 as uuiudv4} from 'uuid'

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import ProjetoForm from '../projetos/ProjetoForm';
import Message from '../layout/Message';

import ServiceForm from '../services/ServiceForm';
import ServiceCard from '../services/ServiceCard';

function Projeto(){
    const {id} = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState()
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)


    const [message, setMessage] = useState('')
    const [type, setType] = useState()

    useEffect(()=>{
        setTimeout(()=>{
            fetch(`http://localhost:5000/projetos/${id}`,{
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(res=>res.json())
            .then((data)=>{
                setProject(data)
                setServices(data.servicos)
            })
            .catch((error)=>console.log(error))
        }, 300)        
        }, [id])
        function removeService( id, cost ){
            const servicesUpdate = project.servicos.filter((e)=> e.id !== id)
        
            const projectUpdated = project
            
            projectUpdated.servicos = servicesUpdate
        
            projectUpdated.costs = parseFloat(projectUpdated.costs) - parseFloat(cost) 

            fetch(`http://localhost:5000/projetos/${projectUpdated.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(projectUpdated)
            })
                .then(res=>res.json)
                .then((data)=>{
                    setTimeout(() => {setMessage('')}, 2010)

                    setProject(projectUpdated)
                    setServices(servicesUpdate)
                    setMessage('Serviço removido com sucesso.')
                    setType('sucess')
                })
                .catch(error=>console.log(error))
        }
        function toggleProjectForm(){
            setShowProjectForm(!showProjectForm)
        }
        function toggleServiceForm(){
            setShowServiceForm(!showProjectForm)
        }

        function createService(project){
            const lastService = project.servicos[project.servicos.length - 1]

            lastService.id = uuiudv4()

            const lastServiceCost = Number(lastService.cost)
            const newCost = Number(project.costs) + lastServiceCost
            
            if(newCost > parseFloat(project.budget) || newCost < 0){
                setMessage('Orçamento inválido, verifique o valor do serviço')
                setType('error')
                setTimeout(() => {setMessage('')}, 2010)

                project.servicos.pop()
                return false
            }
            
            project.costs = newCost

            fetch(`http://localhost:5000/projetos/${project.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(project)
           })
            .then(res=>res.json())
            .then((data)=>{
                setShowServiceForm(false)
                setMessage('Serviço Adicionado')
                setType('sucess')
                setTimeout(() => {setMessage('')}, 2010)
            })
            .catch(error=>console.log(error))
        }

        function editPost(project){
           // budget validação
           setMessage('')

           if(project.budget < project.costs){
                setMessage('O orçamento não pode ser menor que o custo do projeto!')
                setType('error')
                setTimeout(() => {setMessage('')}, 2010)
                return false
           }

           fetch(`http://localhost:5000/projetos/${project.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(project)
           })
            .then(res=>res.json())
            .then((data)=>{
                setProject(data)
                setShowProjectForm(false)
                setMessage('Projeto Atualizado')
                setType('sucess')
                setTimeout(() => {setMessage('')}, 2010)

               

            })
            .catch(error=>console.log(error))
        }

    return (
        <>
            {project.name ? (
                <div className={style.project_details}>
                    <Container customClass='column'>
                        {message && <Message type={type} msg={message} />}
                        <div className={style.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={style.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto':'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={style.project_info}>
                                    <p>
                                        <span>Categoria: </span> {project.categories.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento: </span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total de Utilizado: </span> R${project.costs}
                                    </p>
                                </div>
                            ) : (
                                <div className={style.project_info}>
                                    <ProjetoForm 
                                        handleSubmit={editPost}
                                        btntext='Concluir edição'
                                        dadosProjeto={project}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={style.service_form_container}>
                            <h1>Adicione um Serviço:</h1>
                            <button className={style.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço':'Fechar'}
                            </button>
                            <div className={style.project_info}>
                                {showServiceForm && (
                                    <ServiceForm 
                                        handleSubmit={createService}
                                        btnText='Adicionar Serviço'
                                        projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                            <h2>Serviços</h2>
                            <Container customClass='start'>
                                {services.length > 0 && 
                                    services.map((service)=>(
                                        <ServiceCard
                                            id={service.id}
                                            name={service.name}
                                            cost={service.cost}
                                            description={service.description}
                                            key={service.id}
                                            handleRemove={removeService}
                                        />
                                    ))
                                }
                                {services.length === 0 && <p>Não há serviços cadastrados.</p>}
                            </Container>
                    </Container>
                </div>
            ) : (
                <Loading/>
            )}
        </>
    )
}

export default Projeto;