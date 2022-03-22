import ReactDOM from 'react-dom'
import classes from './ErrorModal.module.css'

const Backdrop = (props) => {
    return (<div className={classes.backdrop} onClick={props.onClick}></div>)
}

const ModalOverlay = (props) => {
    return (
    <section className={classes.modal}>
        <div className={classes.wrapper}>
        <h2>{props.header}</h2>
        
        </div>
    </section>)
}

export const ErrorModal = props => {
  return (
    <>
        {ReactDOM.createPortal(<Backdrop onClick={props.onClose}/>, document.getElementById('backdrop-root'))}
        {ReactDOM.createPortal(<ModalOverlay header={props.header}/>, document.getElementById('overlay-root'))}
    </>
  )
}

