import css from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export function ImageGalleryItem({ src, tags, largeImg}) {
    
    const [showModal, setShowModal] = useState(false)
    
     const toggleModal = () => setShowModal(state => !state);
     
    


    return (
        <>
        <li className={css.ImageGalleryItem} onClick={toggleModal}>
  <img className={css.ImageGalleryItemImage} src={src} alt={tags}/>
            </li>
            {showModal &&  <Modal onClose={toggleModal}>
          <img src={largeImg} alt={tags} />
            </Modal>}
       
            </>
    )
}

ImageGalleryItem.propTypes = {
    src: PropTypes.string,
    tags: PropTypes.string,
    largeImg:PropTypes.string,
}