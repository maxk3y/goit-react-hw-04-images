import { useState, useEffect, useRef } from 'react';
import { API } from 'services/api';
import Notiflix, { Notify } from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { BtnLoadMore } from './Button/BtnLoadMore';
import { Modal } from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { AppWrapper } from './App.styled';
import { ScrollEnabled } from 'services/scroll';

export function App() {
  const PER_PAGE = useRef(12);

  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [visibleBtn, setVisibleBtn] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [tags, setTags] = useState('');
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    Notify.info('Please start searching', {
      timeout: 4000,
      fontSize: '20px',
      position: 'center-center',
    });
  }, []);

  useEffect(() => {
    if (!imageName) {
      return;
    }

    setLoading(true);

    API.getImages(imageName, page, PER_PAGE.current)
      .then(({ hits, totalHits }) => {
        setVisibleBtn(true);
        setImages(images => (images = [...images, ...hits]));

        if (page === 1) {
          Notiflix.Notify.success(`Hooray! We found ${totalHits} images`);
          window.scroll(0, 0);
        }

        const countPages = Math.ceil(totalHits / PER_PAGE.current);
        setTotalPages(countPages);

        if (page >= countPages) {
          setVisibleBtn(false);
          Notiflix.Notify.info(
            `We're sorry, but you've reached the end of search "${imageName}". Please start a new search`
          );
        }
      })
      .catch(() =>
        Notiflix.Notify.info(
          `Sorry, there are no images "${imageName}". Please try again.`
        )
      )
      .finally(() => {
        setLoading(false);
      });
  }, [imageName, page]);

  const onSubmitForm = value => {
    if (value !== imageName) {
      setImageName(value);
      setPage(1);
      setImages([]);
    } else {
      Notiflix.Notify.info(
        'The new search must be different from the current search'
      );
    }
  };

  const onLoadMore = () => setPage(state => state + 1);

  const onSelectedImage = ({ largeImgURL, tags }) => {
    setLargeImg(largeImgURL);
    setTags(tags);
  };

  const onCloseByEsc = () => setLargeImg('');

  return (
    <AppWrapper>
      <ScrollEnabled />
      <Searchbar onSubmit={onSubmitForm} />
      {loading && <Loader />}
      <ImageGallery images={images} onSelected={onSelectedImage} />
      {visibleBtn && (
        <BtnLoadMore
          onLoadMore={onLoadMore}
          page={page}
          totalPages={totalPages}
        />
      )}
      {largeImg && (
        <Modal largeImg={largeImg} tags={tags} onCloseByEsc={onCloseByEsc} />
      )}
    </AppWrapper>
  );
}
