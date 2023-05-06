import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { ModalWrapper, Backdrop } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseByEscape();
    }
  };

  render() {
    const { largeImg, tags, onCloseByClick } = this.props;
    return createPortal(
      <Backdrop id="backdrop" onClick={onCloseByClick}>
        <ModalWrapper>
          <img src={largeImg} alt={tags} />
        </ModalWrapper>
      </Backdrop>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onCloseByEscape: PropTypes.func,
  onCloseByClick: PropTypes.func,
};
