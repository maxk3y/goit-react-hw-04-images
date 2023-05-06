import { useState } from 'react';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import {
  StyledSearchbarForm,
  StyledButton,
  LabelButton,
  SearchInput,
  SearchbarWrapper,
} from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleChangeInput = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    if (imageName.trim() === '' || imageName.length < 3) {
      Notiflix.Notify.warning(
        'Searching must be no empty and more than 2 letters'
      );
      resetForm();
      return;
    }
    onSubmit(imageName);
    resetForm();
  };

  const resetForm = () => setImageName('');

  return (
    <SearchbarWrapper className="searchbar">
      <StyledSearchbarForm className="form" onSubmit={handleSubmitForm}>
        <StyledButton type="submit">
          <LabelButton className="button-label">Search</LabelButton>
        </StyledButton>
        <SearchInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageName}
          onChange={handleChangeInput}
        />
      </StyledSearchbarForm>
    </SearchbarWrapper>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
