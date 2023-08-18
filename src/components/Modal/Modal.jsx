
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot=document.querySelector('#modal-root')

export function Modal ({onClose,children}) {

  useEffect(() => {
  
   window.addEventListener('keydown',handleKeydown)
    return () => {
       window.removeEventListener('keydown',handleKeydown)
    }
  })
  


 const handleKeydown = (e) => {
    if (e.code === 'Escape') {
      onClose()
    }
  }

 const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }


 
         return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
       {children}
      </div>
             </div>,
             modalRoot
  );
}

 


Modal.propTypes = {
  onClose: PropTypes.func,
}
