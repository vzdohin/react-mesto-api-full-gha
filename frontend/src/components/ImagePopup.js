import React from 'react';


function ImagePopup(props) {

  return (
    <div className={`popup  popup_opacity popup_zoom-image ${props.selectedCard.name ? 'popup_opened' : ''}`} onMouseDown={props.onClose}>
      <div className="popup__zoom-image-container">
        <figure className="popup__figure">
          <img className="popup__zoom-image" src={props.selectedCard.link} alt={props.selectedCard.name} />
          <figcaption className="popup__caption">{props.selectedCard.name}</figcaption>
        </figure>
        <button type="button" onClick={props.onClose} className="popup__close-button"></button>
      </div>
    </div>
  )
}

export default ImagePopup;