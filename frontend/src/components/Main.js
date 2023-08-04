import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';


function Main(props) {
  const currentUser = React.useContext(CurrentUserContext)
  return (
    <div>
      <main className="content">
        <section className="profile">
          <div className="profile__card">
            <div className="profile__avatar-container" onClick={props.onEditAvatar}>
              <img className="profile__avatar" src={currentUser.avatar} alt="изображение профиля" />
            </div>
            <div className="profile__info">
              <div className="profile__container">
                <h1 className="profile__name" id="userName">{currentUser.name}</h1>
                <button type="button" className="profile__edit-button" onClick={props.onEditProfile} />
              </div>
              <p className="profile__about" id="userAbout">{currentUser.about}</p>
            </div>
          </div>
          <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
        </section>
        <section className="cards" aria-label="Карточки с красивыми местами">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike} 
              onCardDelete={props.onCardDelete}/>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Main;