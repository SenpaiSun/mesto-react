import React from "react"
import PopupWithForm from "./PopupWithForm"
import {Context} from '../contexts/CurrentUserContext'

export default function EditProfilePopup(props) {

  const currentUser = React.useContext(Context)

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')

  React.useEffect(() => {
    if(currentUser) {
      setName(currentUser.name)
      setDescription(currentUser.about)
    }
  }, [currentUser])

  function onChangeName(e) {
    setName(e.target.value)
  }

  function onChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description
    })
  }

  return (
      <PopupWithForm onClose={props.onClose} isOpen={props.isOpen ? "popup__opened" : ""} name="edit_profile" title="Редактировать профиль" buttonText="Сохранить" onSubmit={handleSubmit}>
        <input type="text" name="nameValue" className="popup__name form__input" id="input-name-profile" required minLength="2" maxLength="40" onChange={onChangeName} value={name}/>
        <span className="popup__input-error input-name-profile-error"></span>
        <input type="text" name="noteValue" className="popup__note form__input" id="input-note-profile" required minLength="2" maxLength="200" onChange={onChangeDescription} value={description}/>
        <span className="popup__input-error input-note-profile-error"></span>
      </ PopupWithForm>
  )
}