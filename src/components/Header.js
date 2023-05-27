import logo from '../image/mesto_logo.png';

export default function Header() {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип сервиса Место" />
      <hr className="header__line" />
    </header>
  )
}