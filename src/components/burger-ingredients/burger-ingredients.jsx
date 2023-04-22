import style from "./style.module.css";
import classNames from "classnames";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import { useEffect, useState } from "react";
import { Category } from "../category/category";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";

export const BurgerIngredients = () => {
  const [current, setCurrent] = useState("buns");
  const dispatch = useDispatch();

  const ingredients = useSelector((state) => state.ingredientsStore.data);

  const buns = ingredients.filter((item) => item.type === "bun");

  const main = ingredients.filter((item) => item.type === "main");
  const sauce = ingredients.filter((item) => item.type === "sauce");

  function handleOnClickTab(tab) {
    setCurrent(tab);
    const title = document.getElementById(tab);
    if (title) title.scrollIntoView({ behavior: "smooth" });
  }
  const [refSauce, inViewSauce] = useInView();
  const [refMain, inViewMain] = useInView();
  const [refBuns, inViewBuns] = useInView();

  useEffect(() => {
    if (inViewBuns) {
      setCurrent("buns");
    } else if (inViewSauce) {
      setCurrent("sauce");
    } else if (inViewMain) {
      setCurrent("main");
    }
  }, [inViewBuns, inViewMain, inViewSauce]);

  return (
    <div className={style.ingredients}>
      <div className={style.menu}>
        <Tab
          value="buns"
          active={current === "buns"}
          onClick={handleOnClickTab}
        >
          Булки
        </Tab>
        <Tab
          value="main"
          active={current === "main"}
          onClick={handleOnClickTab}
        >
          Начинки
        </Tab>
        <Tab
          value="sauce"
          active={current === "sauce"}
          onClick={handleOnClickTab}
        >
          Соусы
        </Tab>
      </div>
      <div className={classNames(style.wrapper, "custom-scroll")}>
        <Category title="Булки" id="buns" ingredients={buns} ref={refBuns} />
        <Category title="Начинки" id="main" ingredients={main} ref={refMain} />
        <Category title="Соусы" id="sauce" ingredients={sauce} ref={refSauce} />
      </div>
    </div>
  );
};
