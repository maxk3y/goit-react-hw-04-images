import { Component } from 'react';
import { API } from 'services/api';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { BtnLoadMore } from './Button/BtnLoadMore';
import { Modal } from './Modal/Modal';
import { ImageGallery } from './ImageGallery/ImageGallery';

import PropTypes from 'prop-types';
import { AppWrapper } from './App.styled';

export class App extends Component {
  static defaultProps = { PER_PAGE: 12 };

  state = {
    imageName: '',
    images: [],
    loading: false,
    visibleBtn: false,
    largeImg: '',
    tags: '',
    page: 1,
    totalPages: 0,
  };

  async componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;
    const { PER_PAGE } = this.props;

    if (prevState.imageName !== imageName || prevState.page !== page) {
      this.setState({ loading: true });

      const data = await API.getImages(imageName, page, PER_PAGE).finally(() =>
        this.setState({ loading: false })
      );

      const { hits, totalHits } = data;

      this.setState(({ images }) => ({
        images: [...images, ...hits],
      }));

      if (page === 1) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images`);
        window.scroll(0, 0);
      }

      if (totalHits !== 0) {
        this.setState({ visibleBtn: true });
      }

      const countPages = Math.ceil(totalHits / PER_PAGE);
      this.setState({ totalPages: countPages });

      if (page >= countPages) {
        this.setState({ visibleBtn: false });
        Notiflix.Notify.info(
          `We're sorry, but you've reached the end of search "${imageName}". Please start a new search`
        );
      }
    }
  }

  onSubmitForm = value => {
    if (value !== this.state.imageName) {
      this.setState({
        imageName: value,
        images: [],
        visibleBtn: false,
        page: 1,
        totalPages: 0,
      });
    } else {
      Notiflix.Notify.info(
        'The new search must be different from the current search'
      );
    }
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onSelectedImage = ({ largeImgURL, tags }) => {
    this.setState({ largeImg: largeImgURL, tags });
  };

  onCloseByClick = e => {
    const clickBackdrop = e.target.id;
    if (clickBackdrop === 'backdrop') {
      this.setState({ largeImg: '' });
    }
  };

  onCloseByEsc = () => {
    this.setState({ largeImg: '' });
  };

  render() {
    const { images, loading, visibleBtn, largeImg, tags, page, totalPages } =
      this.state;

    return (
      <AppWrapper>
        <Searchbar onSubmit={this.onSubmitForm} />
        {loading && <Loader />}
        <ImageGallery images={images} onSelected={this.onSelectedImage} />
        {visibleBtn && !loading && (
          <BtnLoadMore
            loading={loading}
            onLoadMore={this.onLoadMore}
            page={page}
            totalPages={totalPages}
          />
        )}
        {largeImg && (
          <Modal
            largeImg={largeImg}
            tags={tags}
            onCloseByClick={this.onCloseByClick}
            onCloseByEsc={this.onCloseByEsc}
          />
        )}
      </AppWrapper>
    );
  }
}

App.propTypes = {
  PER_PAGE: PropTypes.number.isRequired,
};
