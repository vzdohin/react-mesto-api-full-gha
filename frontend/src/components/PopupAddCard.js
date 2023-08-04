import React from 'react';
import PopupWithForm from './PopupWithForm ';

function PopupAddCard(props) {
  const [name, setTitle] = React.useState('')
  const [link, setLink] = React.useState('')
  // const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setTitle('');
    setLink('');
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name, 
      link
    });
  }
  function handleSetTitle(e){
    setTitle(e.target.value)
  }
  function handleSetLink(e){
    setLink(e.target.value)
  }
  return (
    <PopupWithForm
      name='card-add'
      title={'Новое место'}
      titleButton={'Создать'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onAddPlace={props.onAddPlace}
      onSubmit={handleSubmit}
      children={
        <>
          <input
            type="text"
            placeholder="Название"
            className="popup__input popup__input_card_name"
            id="cardNameInput"
            name="cardNameInput"
            required
            minLength="2"
            maxLength="30"
            value={name}
            onChange={handleSetTitle} />
          <span className="input-error-style" id="cardNameInput-error"></span>
          <input
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_card_url"
            id="cardUrlInput"
            name="cardUrlInput"
            required 
            value={link}
            onChange={handleSetLink}/>
          <span className="input-error-style" id="cardUrlInput-error"></span>
        </>
      }>
    </PopupWithForm>
  );
}

export default PopupAddCard;