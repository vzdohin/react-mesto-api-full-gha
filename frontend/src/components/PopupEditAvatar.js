import React from 'react';
import PopupWithForm from './PopupWithForm ';
import CurrentUserContext from '../contexts/CurrentUserContext';

function PopupEditAvatar(props) {
  const avatarRef = React.useRef(null);
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value

    });
  }
  return (
    <PopupWithForm
      name='avatar'
      title={'Обновить аватар'}
      titleButton={'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_card_url"
            id="avatarUrlInput" name="avatarUrlInput"
            required

            ref={avatarRef} />
          <span className="input-error-style" id="avatarUrlInput-error"></span>
        </>
      }>
    </PopupWithForm>
  );
}

export default PopupEditAvatar;