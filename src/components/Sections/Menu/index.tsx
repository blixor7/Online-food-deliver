import { useEffect, useState } from "react";

import Container from "../../Container";
import { FilterFood } from "../../../utils/filters";
import Filters from "../../Filters";
import { Title } from "..";
import { useStateValue } from "../../../context/StateProvider";
import { foodItemData } from "../../Container/fooditem";
import { FoodItem } from "../../../../types";

const Menu = ({title}:{title?:string}) => {

  const [scrollValue, setScrollValue] = useState(0);
  const [filter, setFilter] = useState<string>("all");
  const items: FoodItem[] = foodItemData;

  return (
    <section className="w-full my-5" id="menu">
      <div className="w-full flex items-center justify-center">
        <Title title={title || "Our Hot Dishes"} center />
      </div>
      <Filters filter={filter} setFilter = {setFilter} />
      <Container
        className="bg-containerbg"
        col
        scrollOffset={scrollValue}
        items={filter === "all" ? items : items?.filter((item:FoodItem) => item.category.toLowerCase() === filter.toLowerCase())}
      />
    </section>
  );
};

export default Menu;
