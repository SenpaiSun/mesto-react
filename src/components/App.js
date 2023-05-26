import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import api from "../utils/api"
import {Context} from '../contexts/CurrentUserContext'


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState()

  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getDefaultCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => {
        err = err.status;
      })
  }, []);

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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
        setCards((state) => state.map((cards) => cards._id === card._id ? newCard : cards));
    })
    .catch(err => err.status)
}

  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
    .then(() => {
      setCards((cards) => cards.filter(card => card._id !== cardId))
    })
    .catch(err => err.status)
  }

  function handleUpdateUser(data) {
    api.updateUserProfile(data)
    .then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    })
    .catch(err => err.status)
  }

  function handleUpdateAvatar(data) {
    api.changeAvatar(data)
    .then((data) => {
      setCurrentUser(data)
      closeAllPopups()
    })
    .catch(err => err.status)
  }


  return (
        <Context.Provider value={currentUser}>
          <div className='root'>
            <Header />
            {currentUser && <Main onCards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>}

            <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}></EditProfilePopup>

            <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen ? "popup__opened" : ""} name="add_card" title="Новое место" buttonText="Создать">
              <input type="text" className="popup__name form__input" name="name" id="input-name-card" placeholder="Название" required minLength="2" maxLength="30" />
              <span className="popup__input-error input-name-card-error"></span>
              <input type="url" className="popup__note form__input" id="input-note-card" name="link" placeholder="Ссылка на картинку" required />
              <span className="popup__input-error input-note-card-error"></span>
            </ PopupWithForm>

            <PopupWithForm onClose={closeAllPopups} name="delete_card" title="Вы уверены?" buttonText="Да" />
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}  onChangeAvatar={handleUpdateAvatar}/>
            <ImagePopup onClose={closeAllPopups} card={selectedCard} />

            <Footer />
          </div>
      </Context.Provider>
  );
}

export default App;
