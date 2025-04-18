import style from '../projetos/ProjetoForm.module.css'

import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton';

import { useState } from 'react';


function ServiceForm({handleSubmit, btnText, projectData}){
    const [service, setService] = useState([])
    function submit(e){
        e.preventDefault()
        handleSubmit(service)
    }

    function handleChange(e){
        setService({...service, [e.target.name]: e.target.value})
        
        
    }
    
    return (
        <form onSubmit={submit} className={style.form}>
            <Input 
                type='text'
                text='Nome do Serviço'
                name='name'
                placeholder='Insira o nome do serviço'
                handleOnChange={handleChange}
            />
            <Input 
                type='number'
                text='Custo do Serviço'
                name='cost'
                placeholder='Insira o valor total'
                handleOnChange={handleChange}
            />
            <Input 
                type='text'
                text='Descrição do Serviço'
                name='description'
                placeholder='Descreva o serviço'
                handleOnChange={handleChange}
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ServiceForm