import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./style.module.css";
import classNames from "classnames";
import { useNavigate } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { RootStore } from "../../services/store";
import { useSelector } from "react-redux";

export const AppHeader = () => {
  const {user }  = useSelector((state:RootStore) => state.auth);

  const navigate = useNavigate();

 const handleNavigateToFeed = () => {
      navigate('/feed');
  };

  const handleNavigateToEnter = () => {
    if (!user) {
      navigate('/enter')
    } else {
      navigate("/profile")
    }
  };

  const handleNavigateToMain = () => {
      navigate('/');
  };

  return (
    <header className={classNames(style.header, "pt-4", "pb-4")}>
      <nav className={style.nav}>
        <div className={classNames(style.header__column, style.link__wrapper)}>
          <a href="#" onClick={handleNavigateToMain} className={classNames(style.link, style.link_active)}>
            <BurgerIcon type="primary" />
            <span className="text  text_type_main-default ml-2"> 
              Конструктор
            </span>
          </a>
          <a onClick={handleNavigateToFeed} href="#" className={classNames(style.link, style.link_active)}>
            <ListIcon type="secondary" />
            <span className="text text_color_inactive text_type_main-default ml-2">
              Лента заказов
            </span>
          </a>
        </div>
        <div className={classNames(style.header__column, style.logo)}>
          <Logo />
        </div>
        <div
          className={classNames(
            style.header__column,
            style.header__column_right
          )}
        >
          <a onClick={handleNavigateToEnter} href="#" className={classNames(style.link, style.link_active)}>
            <ProfileIcon type="secondary" />
            <span className="text text_color_inactive text_type_main-default ml-2">
              Личный кабинет
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}

