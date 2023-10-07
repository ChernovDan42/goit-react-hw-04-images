import css from './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import fetchImages from './servises/pixabayAPI';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    const onFirstQuery = () => {
      scrollToTop();
      setLoader(true);

      fetchImages(searchQuery, page)
        .then(({ data: { totalHits, hits } }) => {
          setTotalImages(totalHits);
          if (totalHits === 0) {
            return Notiflix.Notify.warning('We have no match');
          }

          setImages(hits);
        })
        .catch(error => console.log(error))
        .finally(() => {
          setLoader(false);
        });
    };

    const onNextPage = () => {
      setLoader(true);
      fetchImages(searchQuery, page)
        .then(({ data: { hits } }) => {
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
    const query = value.toLowerCase().trim();
    if (searchQuery === query) {
      return;
    }
    setImages([]);
    setSearchQuery(query);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
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
      <ImageGallery images={images} />
      {loader && <Loader />}
      {totalImages !== images.length && !loader && (
        <Button loadMore={onLoadMore} />
      )}
    </div>
  );
}
