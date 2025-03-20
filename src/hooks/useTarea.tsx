import React from 'react'
import { tareaStore } from '../store/tareaStore'
import { useShallow } from 'zustand/shallow'
import { editarTarea, eliminarTareaPorID, getAllTareas, postNuevaTarea } from '../http/tarea'
import { ITarea } from '../types/ITarea'
import Swal from 'sweetalert2'

export const useTarea = () => {
    const {tareas,setArrayTareas,agregarNuevaTarea,eliminarUnaTarea,editarUnaTarea}=tareaStore(useShallow((state)=>({
        tareas:state.tareas,
        setArrayTareas:state.setArrayTareas,
        agregarNuevaTarea:state.agregarNuevaTarea,
        eliminarUnaTarea:state.eliminarTarea,
        editarUnaTarea:state.editarTarea
    })))
        const getTareas=async  ()=>{
            const data=await getAllTareas()
            if(data) setArrayTareas(data)
    
        }
        const createTarea=async(nuevaTarea:ITarea)=>{
            agregarNuevaTarea(nuevaTarea)
            try {
                await postNuevaTarea(nuevaTarea)
                Swal.fire("Exito","Tarea creada exitosamente","success")
            } catch (error) {
                eliminarUnaTarea(nuevaTarea.id!)
                console.log("Algo salio mal al crear una tarea: "+error)
            }
        }
        const putTarea=async(tareaEditada:ITarea)=>{
            const prevState=tareas.find((el)=>el.id===tareaEditada.id)
            editarUnaTarea(tareaEditada)
            try {
                await editarTarea(tareaEditada)
                Swal.fire("Exito","Tarea editada exitosamente","success")
            } catch (error) {
                if(prevState) editarUnaTarea(prevState)
                console.log("Algo salio mal al editar: "+error)
            }
        }
        const eliminarTarea=async(idTarea:string)=>{
            const prevState=tareas.find((el)=>el.id===idTarea)
            const confirm=await Swal.fire({
                title:"¿Esta seguro?",
                text:"Esta accicon no se puede deshacer",
                icon:"warning",
                showCancelButton:true,
                confirmButtonText:"Si,Eliminar",
                cancelButtonText:"Cancelar"
            })
            if(!confirm.isConfirmed) return
            eliminarUnaTarea(idTarea)
            try {
                await eliminarTareaPorID(idTarea)
            } catch (error) {
                if(prevState) agregarNuevaTarea(prevState)
                console.log("Algo salio mal eliminando una tarea")
            }
        }
  return {
    getTareas,
    createTarea,
    putTarea,
    eliminarTarea,
    tareas
  }
}
