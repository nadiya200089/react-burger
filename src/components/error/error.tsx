import styles from "./style.module.css";

export const Error = () => {
    return (
      <div className={styles.wrap}>
        <div className={styles.error}>
           404 
        </div>
        <span className={styles.span}>Такой страницы не существует</span>
      </div>  
    )
}