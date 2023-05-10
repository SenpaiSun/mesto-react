export default function ImagePopup() {
  return (
    <div className="popup popup_open_image">
      <div className="popup__image-info popup__page-item">
        <button className="popup__close popup__close-image" aria-label="Закрытие просмотра изображения"></button>
        <img className="popup__full-image" src="#" alt="" />
        <p className="popup__text"></p>
      </div>
    </div>
  )
}