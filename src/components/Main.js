import React from "react"
import api from "../utils/api"
import Card from "./Card"

export default function Main(props) {

  const [userName, setUserName] = React.useState('')
  const [userDescription, setUserDescription] = React.useState('')
  const [userAvatar, setUserAvatar] = React.useState('')
  const [cards, setCards] = React.useState([])
  
  React.useEffect(() => {
    api.getUserInfo()
    .then((data) => {
      setUserName(data.name)
      setUserDescription(data.about)
      setUserAvatar(data.avatar)
    })
    .catch(error => error.status)
    api.getDefaultCards()
    .then((data) => {
      setCards(data)
    })
  }, [])

  return (
    <main>
      <section className="profile">
        <img className="profile__photo" src={userAvatar} alt="Аватар пользователя" />
        <button className="profile__button" onClick={props.onEditAvatar}></button>
        <div className="profile__info">
          <div className="profile__info-profile">
            <h1 className="profile__info-username">{userName}</h1>
            <button className="profile__info-edit" onClick={props.onEditProfile} aria-label="Редактировать профиль"></button>
          </div>
          <p className="profile__info-note">{userDescription}</p>
        </div>
        <button className="profile__added" onClick={props.onAddPlace} aria-label="Добавить публикацию"></button>
      </section>
      <div className="content">
        {cards.map((card) => <Card key={card._id} onCardClick={props.onCardClick} card={card} />)}
      </div>
    </main>
  )
}