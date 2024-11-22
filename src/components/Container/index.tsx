import { useLayoutEffect, useRef } from "react";
import { FoodItem } from "../../../types"; // Updated type as shown above
import Loader from "../Loader";
import { SingleFoodItem } from "../FoodItem";
import { motion } from "framer-motion";
import NotFound from "../NotFound";
import { isAdmin } from "../../utils/functions";
import { useStateValue } from "../../context/StateProvider";

// Import food item data directly

const Container = ({ scrollOffset, col, className, items }: { scrollOffset: number, col?: boolean, className?: string, items: FoodItem[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += scrollOffset;
    }
  }, [scrollOffset]);

  const [{ user }] = useStateValue(); // Assuming you're getting user data from context

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className={`${className} w-full my-12 flex items-center ${(!items || col) && "justify-center"} min-h-[200px] gap-4 px-2 ${
        !col ? "overflow-x-scroll scrollbar-hidden scroll-smooth" : "overflow-x-hidden flex-wrap"
      }`}
    >
      {/* Display the list of food items */}
      {items && items.length > 0 ? (
        items.map((item: FoodItem) => (
          <SingleFoodItem key={item.id} item={item} col={col} admin={isAdmin(user)} />
        ))
      ) : (
        // If no items exist, show a loader or NotFound message
        !items ? (
          !col ? <Loader progress={"Fetching Food Items....."} /> : <NotFound text="Fetching Food Items..." />
        ) : (
          <NotFound text="No Food Items Available" />
        )
      )}
    </motion.div>
  );
};

export default Container;
