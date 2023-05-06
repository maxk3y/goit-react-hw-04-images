import PropTypes from 'prop-types';
import { StyledGalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const GalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onSelected,
}) => {
  return (
    <StyledGalleryItem className="gallery-item">
      <GalleryImage
        src={webformatURL}
        alt={tags}
        onClick={() => onSelected({ largeImgURL: largeImageURL, tags })}
      />
    </StyledGalleryItem>
  );
};

GalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onSelected: PropTypes.func,
};
