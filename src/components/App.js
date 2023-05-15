import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard,setSelectedCard] = React.useState(null)

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard(null)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

  return (
        <div className="root">
          <Header />

          <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />

          <PopupWithForm onClose={closeAllPopups} isOpen={isEditProfilePopupOpen ? "popup__opened" : ""} name="edit_profile" title="Редактировать профиль" buttonText="Сохранить">
            <input type="text" name="nameValue" className="popup__name form__input" id="input-name-profile" required minLength="2" maxLength="40" />
            <span className="popup__input-error input-name-profile-error"></span>
            <input type="text" name="noteValue" className="popup__note form__input" id="input-note-profile" required minLength="2" maxLength="200" />
            <span className="popup__input-error input-note-profile-error"></span>
          </ PopupWithForm>

          <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen ? "popup__opened" : ""} name="add_card" title="Новое место" buttonText="Создать">
            <input type="text" className="popup__name form__input" name="name" id="input-name-card" placeholder="Название" required minLength="2" maxLength="30" />
            <span className="popup__input-error input-name-card-error"></span>
            <input type="url" className="popup__note form__input" id="input-note-card" name="link" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error input-note-card-error"></span>
          </ PopupWithForm>

          <PopupWithForm onClose={closeAllPopups} name="delete_card" title="Вы уверены?" buttonText="Да" />

          <PopupWithForm onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen ? "popup__opened" : ""} name="update_avatar" title="Обновить аватар" buttonText="Сохранить">
            <input type="url" className="popup__note form__input" id="update-avatar-input" name="link" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error update-avatar-input-error"></span>
          </ PopupWithForm>

          <ImagePopup onClose={closeAllPopups} card={selectedCard} />

          <Footer />
      </div>
  );
}

export default App;
