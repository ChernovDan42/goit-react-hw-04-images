import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import fetchImages from './servises/pixabayAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    const onFirstQuery = () => {
      scrollToTop();
      setLoader(true);

      fetchImages(searchQuery.trim(), page)
        .then(({ data: { totalHits, hits } }) => {
          const maxPage = Math.ceil(totalHits / hits.length);

          if (totalHits === 0) {
            return Notiflix.Notify.warning('We have no match');
          }

          if (maxPage === page) {
            setShowBtn(false);
          } else {
            setShowBtn(true);
          }

          setImages(prevState => [...prevState, ...hits]);
        })
        .catch(error => console.log(error))
        .finally(() => {
          setLoader(false);
        });
    };

    const onNextPage = () => {
      setLoader(true);
      fetchImages(searchQuery, page)
        .then(({ data: { hits, totalHits } }) => {
          if (hits.length < 12) {
            setShowBtn(false);
          }

          setImages(prevState => [...prevState, ...hits]);
        })
        .catch(error => {
          console.log(error.message);
        })
        .finally(() => setLoader(false));
    };

    if (searchQuery === '') {
      return;
    }

    if (page === 1) {
      onFirstQuery();
    } else {
      onNextPage();
    }
  }, [searchQuery, page]);


  const onFormSubmit = value => {
    setImages([]);

    setSearchQuery(value);
    setPage(1);
    setShowBtn(false);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = () => {
    setShowModal(state => !state);
  };

  const onPhotoClick = url => {
    setSelectedPhoto(url);
    setShowModal(true);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={onFormSubmit} />
      <ImageGallery images={images} onPhotoClick={onPhotoClick} />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={selectedPhoto} alt="" />
        </Modal>
      )}
      {loader && <Loader />}
      {showBtn && <Button loadMore={onLoadMore} />}
    </div>
  );
}
