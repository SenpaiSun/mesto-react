import PopupWithForm from "./PopupWithForm"
import React from "react"

export default function AddPlacePopup(props) {

  const placeNameRef = React.useRef()
  const placeLinkRef = React.useRef()

  function handleSubmit(e) {
    e.preventDefault()
    props.onAddPlace({
      name: placeNameRef.current.value,
      link: placeLinkRef.current.value
    })
  }

  return (
    <PopupWithForm onClose={props.onClose} isOpen={props.isOpen ? "popup__opened" : ""} name="add_card" title="Новое место" buttonText="Создать" onSubmit={handleSubmit}>
      <input type="text" className="popup__name form__input" name="name" id="input-name-card" placeholder="Название" required minLength="2" maxLength="30" ref={placeNameRef} />
      <span className="popup__input-error input-name-card-error"></span>
      <input type="url" className="popup__note form__input" id="input-note-card" name="link" placeholder="Ссылка на картинку" required ref={placeLinkRef} />
      <span className="popup__input-error input-note-card-error"></span>
    </ PopupWithForm>
)
}