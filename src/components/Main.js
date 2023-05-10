export default function Main() {

  function handleEditProfileClick() {
    document.querySelector('.popup_edit_profile').classList.add('popup__opened');
    document.querySelector('.popup__close-profile').addEventListener('click', () => {
      document.querySelector('.popup_edit_profile').classList.remove('popup__opened');
    })
  }

  function handleAddPlaceClick() {
    document.querySelector('.popup_add_card').classList.add('popup__opened');
    document.querySelector('.popup__close-place').addEventListener('click', () => {
      document.querySelector('.popup_add_card').classList.remove('popup__opened');
    })
  }

  function handleEditAvatarClick() {
    document.querySelector('.popup_update_avatar').classList.add('popup__opened');
    document.querySelector('.popup__close-avatar').addEventListener('click', () => {
      document.querySelector('.popup_update_avatar').classList.remove('popup__opened');
    })
  }

  return (
    <main>
      <section className="profile">
        <img className="profile__photo" src="#" alt="Аватар пользователя" />
        <button className="profile__button" onClick={handleEditAvatarClick}></button>
        <div className="profile__info">
          <div className="profile__info-profile">
            <h1 className="profile__info-username"></h1>
            <button className="profile__info-edit" onClick={handleEditProfileClick} aria-label="Редактировать профиль"></button>
          </div>
          <p className="profile__info-note"></p>
        </div>
        <button className="profile__added" onClick={handleAddPlaceClick} aria-label="Добавить публикацию"></button>
      </section>
      <div className="content">
      </div>
    </main>
  )
}