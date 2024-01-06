import { Link } from 'react-router-dom';
import style from './ProjetoCard.module.css'
import {BsPencil, BsFillTrashFill} from 'react-icons/bs'
function ProjetoCard({id, name, budget, categories, handleRemove}){
    const remove = (e)=>{
        e.preventDefault()
        handleRemove(id)
    }
    return (
        <div className={style.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Orçamento: </span> R${budget}
            </p>
            <p className={style.category_text}>
                <span className={style[categories?.toLowerCase()]}>{/*bolinha*/}</span> {categories}
                {/* {console.log(categories?.toLowerCase())} */}
            </p>
            <div className={style.project_card_actions}>
                <Link to={`/projeto/${id}`}>
                    <BsPencil/>Editar
                </Link>
                <button onClick={remove}>
                    <BsFillTrashFill/> Remover
                </button>
            </div>
        </div>
    )
}

export default ProjetoCard;