
import { Header } from '../ui/Header/Header'
import { ListTareas } from '../ListTareas/ListTareas'
import styles from "./TareasScreen.module.css"
export const TareasScreen = () => {
    return (
        <div className={styles.mainContainer} >
            <Header/>
            <ListTareas/>
        </div>
    )
}
