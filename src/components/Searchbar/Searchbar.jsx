import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import { Component } from 'react';
import {
  StyledSearchbarForm,
  StyledButton,
  LabelButton,
  SearchInput,
  SearchbarWrapper,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = { imageName: '' };

  handleChangeInput = e => {
    this.setState({ imageName: e.currentTarget.value.toLowerCase() });
  };

  handleSubmitForm = e => {
    const { imageName } = this.state;

    e.preventDefault();

    if (imageName.trim() === '' || imageName.length < 3) {
      Notiflix.Notify.warning(
        'Searching must be no empty and more than 2 letters'
      );
      this.resetForm();
      return;
    }
    this.props.onSubmit(imageName);
    this.resetForm();
  };

  resetForm = () => this.setState({ imageName: '' });

  render() {
    return (
      <SearchbarWrapper className="searchbar">
        <StyledSearchbarForm className="form" onSubmit={this.handleSubmitForm}>
          <StyledButton type="submit">
            <LabelButton className="button-label">Search</LabelButton>
          </StyledButton>
          <SearchInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.imageName}
            onChange={this.handleChangeInput}
          />
        </StyledSearchbarForm>
      </SearchbarWrapper>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
