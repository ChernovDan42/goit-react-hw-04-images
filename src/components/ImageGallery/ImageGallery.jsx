import { ImageGalleryItem } from "components/ImageGalleryItem/ImageGalleryItem"
import css from './ImageGallery.module.css'
import PropTypes from 'prop-types';


export function ImageGallery({ images}) {

    return (
        <ul className={css.ImageGallery}>
            {images.map(img => {
                
                return <ImageGalleryItem key={img.id} src={img.webformatURL} tags={img.tags} largeImg={img.largeImageURL}  />
            })}

        </ul>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
}