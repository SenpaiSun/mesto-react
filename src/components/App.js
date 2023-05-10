import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'

function App() {

  return (
    <>
      <html lang="ru">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Mesto</title>
        </head>
        <body className="root">
          <Header />
          <Main />
          <Footer />
          <PopupWithForm name="edit_profile" title="Редактировать профиль" buttonText="Сохранить">
            <input type="text" name="nameValue" className="popup__name form__input" id="input-name-profile" required minlength="2" maxlength="40" />
            <span className="popup__input-error input-name-profile-error"></span>
            <input type="text" name="noteValue" className="popup__note form__input" id="input-note-profile" required minlength="2" maxlength="200" />
            <span className="popup__input-error input-note-profile-error"></span>
          </ PopupWithForm>

          <PopupWithForm name="add_card" title="Новое место" buttonText="Создать">
            <input type="text" className="popup__name form__input" name="name" id="input-name-card" placeholder="Название" required minlength="2" maxlength="30" />
            <span className="popup__input-error input-name-card-error"></span>
            <input type="url" className="popup__note form__input" id="input-note-card" name="link" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error input-note-card-error"></span>
          </ PopupWithForm>

          <ImagePopup />

          <PopupWithForm name="delete_card" title="Вы уверены?" buttonText="Да" />

          <PopupWithForm name="update_avatar" title="Обновить аватар" buttonText="Сохранить">
            <input type="url" className="popup__note form__input" id="update-avatar-input" name="link" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error update-avatar-input-error"></span>
          </ PopupWithForm>

          <template className="card-temlate">
            <div className="content__card">
              <img className="content__card-photo" src="#" alt="" />
              <div className="content__card-info">
              <h2 className="content__card-name"></h2>
                <div className="content__like-info">
                <button className="content__card-like" aria-label="Поставить лайк"></button>
                <span className="content__like-value">0</span>
              </div>
              <button className="content__card-delete" aria-label="Удалить карточку"></button>
            </div>
          </div>
          </template>

      </body>
    </html>
  </>
  );
}

export default App;