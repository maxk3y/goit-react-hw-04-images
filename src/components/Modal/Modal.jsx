import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { ModalWrapper, Backdrop } from './Modal.styled';
import { ScrollDisabled } from '../../services/scroll';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ largeImg, tags, onCloseByEsc }) {
  const onClickBackdrop = e => {
    console.log(e);
    if (e.target === e.currentTarget) {
      onCloseByEsc();
    }
  };

  useEffect(() => {
    const isPushEsc = e => {
      if (e.code === 'Escape') {
        onCloseByEsc();
      }
    };

    window.addEventListener('keydown', isPushEsc);
    return () => window.removeEventListener('keydown', isPushEsc);
  }, [onCloseByEsc]);

  return createPortal(
    <Backdrop id="backdrop" onClick={onClickBackdrop}>
      <ModalWrapper>
        <img src={largeImg} alt={tags} />
      </ModalWrapper>
      <ScrollDisabled />
    </Backdrop>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onCloseByEsc: PropTypes.func,
};
