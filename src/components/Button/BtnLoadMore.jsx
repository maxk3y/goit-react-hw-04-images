import React from 'react';
import PropTypes from 'prop-types';
import { StyledBtnLoadMore } from './BtnLoadMore.styled';

export const BtnLoadMore = ({ onLoadMore, page, totalPages }) => {
  return (
    <StyledBtnLoadMore type="button" onClick={onLoadMore}>
      Load more: {'  '}
      <span>
        {page} / {totalPages}
      </span>
    </StyledBtnLoadMore>
  );
};

BtnLoadMore.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onLoadMore: PropTypes.func,
};
