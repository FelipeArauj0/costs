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
import instance from '../../Conexao-API/Axios';

function Projeto(){
    const {id} = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    
    const [message, setMessage] = useState('')
    const [type, setType] = useState()

    const storedToken = localStorage.getItem("@Auth:token")

    useEffect(()=>{

        const projetoId = async ()=>{
            try {

                const response = await instance.get(`/projeto/${id}`,{
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                const resServices = await instance.get(`/servicos/${id}`,{
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                setProject(response.data)
                setServices(resServices.data.menssagem === 'Não tem serviço cadastrado.' ? [] : resServices.data)
            } catch (error) {
                console.log(error)
            }
        }
        setTimeout(()=>{
            projetoId()
        }, 2000)
        
    }, [storedToken, id])      
        
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
            setShowServiceForm(!showServiceForm)
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

        async function editPost(project){
           // budget validação
           setMessage('')

        //    if(project[0].budget < project[0].costs){
        //         setMessage('O orçamento não pode ser menor que o custo do projeto!')
        //         setType('error')
        //         setTimeout(() => {setMessage('')}, 2010)
        //         return false
        //    }
           try {
                console.log('asd: ',project)
                // const response = await instance.patch(`/projetos/${project.id}`,{

                // },{
                //     headers: {
                //         Authorization: `Bearer ${storedToken}`
                //     }
                // })
                // setProject(data)
                // setShowProjectForm(false)
                // setMessage('Projeto Atualizado')
                // setType('sucess')
                // setTimeout(() => {setMessage('')}, 2010)
           } catch (error) {
                console.log(error)
           }
        //    fetch(`http://localhost:5000/projetos/${project.id}`,{
        //         method: 'PATCH',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(project)
        //    })
        //     .then(res=>res.json())
        //     .then((data)=>{
        //         setProject(data)
        //         setShowProjectForm(false)
        //         setMessage('Projeto Atualizado')
        //         setType('sucess')
        //         setTimeout(() => {setMessage('')}, 2010)

               

        //     })
        //     .catch(error=>console.log(error))
        }

    return (
        <>
            {project ? (
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
                                        <span>Categoria: </span> {project.categories && project.categories.nome_categoria}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento: </span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total de Utilizado: </span> R${project.cost}
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
                                {services !== null && services.length > 0 && 
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