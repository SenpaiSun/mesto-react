export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen}`}>
      <div className="popup__page popup__page-item">
        <button onClick={props.onClose} className="popup__close popup__close-profile" aria-label="Закрытие редактирования профиля"></button>
        <p className="popup__title">{props.title}</p>
        <form className="popup__form form" name={`form-${props.name}`} id="form-profile" novalidate>
          {props.children}
          <button className="popup__save popup__save-profile" aria-label="Сабмит формы">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}

//name={`form-${props.name}`} проверить этот момент