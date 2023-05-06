import PropTypes from 'prop-types';
import { Loader } from 'components/Loader/Loader';
import { StyledBtnLoadMore } from './BtnLoadMore.styled';

export const BtnLoadMore = ({ loading, onLoadMore, page, totalPages }) => {
  return (
    <StyledBtnLoadMore type="button" onClick={onLoadMore}>
      {loading ? (
        <Loader />
      ) : (
        <>
          Load more: {'  '}
          <span>
            {page} / {totalPages}
          </span>
        </>
      )}
    </StyledBtnLoadMore>
  );
};

BtnLoadMore.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onLoadMore: PropTypes.func,
};
