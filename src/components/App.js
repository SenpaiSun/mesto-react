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
import AddPlacePopup from './AddPlacePopup'


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

  function handleAddPlaceSubmit(data) {
    api.createNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups()
    })
    .catch(err => err.status)
  }

  return (
        <Context.Provider value={currentUser}>
          <div className='root'>
            <Header />

            {currentUser && <Main onCards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />}

            <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

            <AddPlacePopup onClose={closeAllPopups} isOpen={isAddPlacePopupOpen ? "popup__opened" : ""} onAddPlace={handleAddPlaceSubmit} />

            <PopupWithForm onClose={closeAllPopups} name="delete_card" title="Вы уверены?" buttonText="Да" />

            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}  onChangeAvatar={handleUpdateAvatar}/>

            <ImagePopup onClose={closeAllPopups} card={selectedCard} />

            <Footer />
          </div>
      </Context.Provider>
  );
}

export default App;
