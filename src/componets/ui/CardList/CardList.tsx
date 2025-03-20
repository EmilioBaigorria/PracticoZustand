
import { FC } from "react"
import { ITarea } from "../../../types/ITarea"
import styles from "./CardList.module.css"
import { useTarea } from "../../../hooks/useTarea"

type ICardList={
    tarea:ITarea
    handleOpenModalEdit:(tarea:ITarea)=>void
}
export const CardList:FC<ICardList> = ({tarea,handleOpenModalEdit}) => {
    const {eliminarTarea}=useTarea()
    const eliminarTareaByID=()=>{
        eliminarTarea(tarea.id!)
    }
    const editarTarea=()=>{
        handleOpenModalEdit(tarea)
    }
    
  return (
    <div className={styles.mainCominerCard}>
        <div >
        <h3>{tarea.titulo}</h3>
        <p>Descripcion:{tarea.description}</p>
        <p><b>Fehcha Limite: {tarea.fechaLimite}</b></p>
        </div>
        <div className={styles.mainCominerCard_Actions}>
            <button onClick={eliminarTareaByID}>Eliminar</button>
            <button onClick={editarTarea}>Editar</button>
        </div>
    </div>
  )
}
