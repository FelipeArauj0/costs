import {useEffect, useState} from 'react'
import style from './ProjetoForm.module.css'
import Input from "../form/Input";
import Select from "../form/Select";
import SubmitButton from "../form/SubmitButton";
import instance from '../../Conexao-API/Axios';

function ProjetoForm({handleSubmit, btntext, dadosProjeto}){
    const [categories, setCategories] = useState([])
    const [ projeto, setProjeto] = useState(dadosProjeto || {})

    
    useEffect(()=>{
        async function categorias(){
            try {
                const response = await instance.get('categorias')
                setCategories(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        categorias()
    })
    const submit = (e)=>{
        e.preventDefault()
        handleSubmit(projeto)
    }

    function handleChange(e){
        setProjeto({...projeto, [e.target.name]: e.target.value})
        
    }
    function handleCategory(e){
        setProjeto({...projeto, categories: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text
        }})
    }

    return (
        <form onSubmit={submit} className={style.form}>
            <Input 
                type="text"
                text="Nome do projeto"
                name="name"
                placeholder="Insira o nome do projeto"
                handleOnChange={handleChange}
                value={projeto.name ? projeto.name : ''}
            />
            <Input 
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="Insira o orçamento total"
                handleOnChange={handleChange}
                value={projeto.budget ? projeto.budget : ''}
            />
            <Select 
                name="category_id" 
                text="Selecione uma categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={projeto.categories ? projeto.categories.id : ''}
            />
            <SubmitButton text={btntext}/>
        </form>
    )
}

export default ProjetoForm;