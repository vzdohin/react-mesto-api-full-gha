import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card)
  }
  function handleCardDelete() {
    props.onCardDelete(props.card)
  }
  
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = props.card.owner._id === currentUser._id;

  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `card__button-like ${isLiked && 'card__button-like_active'}`
  );
  return (
    <section className="cards" aria-label="Карточки с красивыми местами">
      {/* {props.cards.map((card) => ( */}
      <article className="card" key={props.card.id}>
        <img className="card__image" onClick={handleClick} src={props.card.link} alt={`Изображение ${props.card.name}`} />
        <div className="card__container">
          <h2 className="card__title">{props.card.name}</h2>
          <div className="card__button-like-container">
            <button type="button" onClick={handleLikeClick} className={cardLikeButtonClassName}></button>
            <p className="card__button-like-counter">{props.card.likes.length}</p>
          </div>
        </div>
        {isOwn && <button type="button" onClick={handleCardDelete} className="card__button-delete" />}
      </article>
      {/* ))} */}
    </section>
  )
}

export default Card;