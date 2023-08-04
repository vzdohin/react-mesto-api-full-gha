import React from 'react';
import PopupWithForm from './PopupWithForm ';
import CurrentUserContext from '../contexts/CurrentUserContext';

function PopupEditProfile(props) {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  function handleSetName(e){
    setName(e.target.value)
  }
  function handleSetDescription(e){
    setDescription(e.target.value)
  }
  return (
    <PopupWithForm
      name='card-add'
      title={'Редактировать профиль'}
      titleButton={'Сохранить'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            type="text"
            className="popup__input popup__input_data_name"
            id="userNameInput"
            name="userNameInput"
            required
            minLength="2"
            maxLength="40"
            value={name || ''}
            onChange={handleSetName} />
          <span className="input-error-style" id="userNameInput-error"></span>
          <input
            type="text"
            className="popup__input popup__input_data_about"
            id="userAboutInput"
            name="userAboutInput"
            required
            minLength="2"
            maxLength="200"
            value={description || ''}
            onChange={handleSetDescription} />
          <span className="input-error-style" id="userAboutInput-error"></span>
        </>
      }>
    </PopupWithForm>
  );
}

export default PopupEditProfile;