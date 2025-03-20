import axios from "axios"
import { ITarea } from "../types/ITarea"

const API_URL="http://localhost:3000/tareas"
export const getAllTareas=async()=>{
    try {
        const response=await axios.get<ITarea[]>(API_URL)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const postNuevaTarea=async(nuevaTarea:ITarea)=>{
    try {
        const response=await axios.post<ITarea>(API_URL,{...nuevaTarea})
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const editarTarea=async(tareaActulizada:ITarea)=>{
    try {
        const response=await axios.put<ITarea>(`${API_URL}/${tareaActulizada.id}`,{...tareaActulizada})
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const eliminarTareaPorID=async(idTarea:string)=>{
    try {
        const response=await axios.delete<ITarea>(`${API_URL}/${idTarea}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}