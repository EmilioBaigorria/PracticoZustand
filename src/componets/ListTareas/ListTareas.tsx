
import { useEffect, useState } from "react"
import { tareaStore } from "../../store/tareaStore"
import styles from "./ListTareas.module.css"
import { getAllTareas } from "../../http/tarea"
import { CardList } from "../ui/CardList/CardList"
import { Modal } from "../ui/Modal/Modal"
import { ITarea } from "../../types/ITarea"
import { useTarea } from "../../hooks/useTarea"

export const ListTareas = () => {
    const setTareaActiva=tareaStore((state)=>state.setTareaActiva)
    const{getTareas,tareas}=useTarea()
    useEffect(()=>{
      getTareas()
      
    },[])

    const [openModalTarea,setOpenModalTare]=useState(false)

    const handleOpenModalEdit=(tarea:ITarea)=>{
      setTareaActiva(tarea)
      setOpenModalTare(true)

    }
    const handleCloseModal=()=>{
      setOpenModalTare(false)
    }

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.mainContainer_buttonContainer}>
            <h2>Lista de tareas</h2>
            <button onClick={()=>setOpenModalTare(true)}>Agregar Tarea</button>
        </div>
        <div className={styles.mainContainer_listContainer}>
            
            {tareas.length>0?(
            tareas.map((el)=><CardList
            handleOpenModalEdit={handleOpenModalEdit}
             tarea={el}/>)):
            (
              <div>
                <h3>No hay tareas</h3>
              </div>
            )}
            
        </div>
      </div>
      {openModalTarea && <Modal handleCloseModal={handleCloseModal}/>}
    </>
  )
}
