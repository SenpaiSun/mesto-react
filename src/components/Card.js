export default function Card(props) {

  function handleCardClick() {
    props.onCardClick(props.card)
  }

  return (<div className="content__card">
          <img className="content__card-photo" onClick={handleCardClick} src={props.card.link} alt={props.card.name} />
          <div className="content__card-info">
            <h2 className="content__card-name">{props.card.name}</h2>
            <div className="content__like-info">
              <button className="content__card-like" aria-label="Поставить лайк"></button>
              <span className="content__like-value">{props.card.likes.length}</span>
            </div>
            <button className="content__card-delete" aria-label="Удалить карточку"></button>
          </div>
        </div>
  )
}