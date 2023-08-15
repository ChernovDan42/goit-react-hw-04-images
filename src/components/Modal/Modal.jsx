import { Component } from 'react';
import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot=document.querySelector('#modal-root')

export class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown',this.handleKeydown)
  }

  componentWillUnmount() {
     window.removeEventListener('keydown',this.handleKeydown)
  }


  handleKeydown = (e) => {
    if (e.code === 'Escape') {

      this.props.onClose()
    }
  }

  handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose()
    }
  }


    render() {
         return createPortal(
    <div className={css.Overlay} onClick={this.handleBackdropClick}>
      <div className={css.modal}>
       {this.props.children}
      </div>
             </div>,
             modalRoot
  );
}

 
}

Modal.propTypes = {
  onClose: PropTypes.func,
}
