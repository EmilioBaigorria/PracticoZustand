import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import styles from "./Modal.module.css"
import { tareaStore } from '../../../store/tareaStore'
import { ITarea } from '../../../types/ITarea'
import { useTarea } from '../../../hooks/useTarea'
import { editarTarea } from '../../../http/tarea'
type IModal={
    handleCloseModal:()=>void
}

const initialState:ITarea={
    titulo:"",
    description:"",
    fechaLimite:""
}
export const Modal:FC<IModal> = ({handleCloseModal}) => {
    const tareaActiva=tareaStore((state)=>state.tareaActiva)
    const setTareaActiva=tareaStore((state)=>state.setTareaActiva)

    const{createTarea,putTarea}=useTarea()

    const [formValues,setFormValues]=useState<ITarea>(initialState)
    useEffect(()=>{
        if(tareaActiva) setFormValues(tareaActiva)
    },[])
    const handleChange=(e:ChangeEvent<HTMLInputElement| HTMLTextAreaElement>)=>{
        const {name, value}=e.target
        setFormValues((prev)=>({...prev,[`${name}`]:value}))
    }
    const handleSumit= (e:FormEvent)=>{
        e.preventDefault()
        if(tareaActiva){
            putTarea(formValues)
        }else{
            createTarea({...formValues,id:new Date().toDateString()})
        }
        setTareaActiva(null)
        handleCloseModal()
    }
  return (
    <div className={styles.mainContainerModal}>
        <div className={styles.mainContainerModal_modalBody}>
        <div>
            <h3>{tareaActiva?"Editar Tarea":"CrearTarea"}</h3>
        </div>
        <form onSubmit={handleSumit} className={styles.mainContainerModal_formContainer}>
            <div>
                <input placeholder='Ingresa tu titulo' type="text" onChange={handleChange} required value={formValues.titulo} autoComplete='off' name='titulo' />
                <textarea placeholder='Ingresa una descripcion' onChange={handleChange} required value={formValues.description} name='description'/>
                <input type="date" onChange={handleChange} required value={formValues.fechaLimite} autoComplete='off' name='fechaLimite' />
            </div>
            <div className={styles.formButtons}>
                <button className={styles.cancelButton} onClick={handleCloseModal}>Cancelar</button>
                <button className={styles.confirmButton} type='submit'>{tareaActiva?"Editar Tarea":"CrearTarea"}</button>
            </div>
        </form>
        </div>
    </div>
  )
}
