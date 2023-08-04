import React from 'react';
import PopupWithForm from './PopupWithForm ';

function PopupConfirm(props) {
  return (
    <PopupWithForm
      name='card-add'
      title={'Вы уверены?'}
      titleButton={'Да'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      children={
        <>
        </>
      }>
    </PopupWithForm>
  );
}

export default PopupConfirm;