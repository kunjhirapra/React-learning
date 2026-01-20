import {useDispatch, useSelector} from "react-redux";
import Button from "../../ui/Button";
import {formatCurrency} from "../../utils/helpers";
import type {PizzaDataTypes} from "../../utils/types";
import {addItem, getCurrentItemQuantity} from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({pizza}: {pizza: PizzaDataTypes}) {
  const dispatch = useDispatch();
  const {id, name, unitPrice, ingredients, soldOut, imageUrl} = pizza;
  const itemQuantiy = useSelector(getCurrentItemQuantity(id));
  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    dispatch(addItem(newItem));
  }
  const currentPizzaQuantity = useSelector(getCurrentItemQuantity(id));

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium text-stone-500 uppercase">
              Sold out
            </p>
          )}
          {itemQuantiy > 0 ? (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                pizzaQuantity={currentPizzaQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          ) : (
            !soldOut && (
              <Button type="small" onClick={handleAddToCart}>
                Add to cart
              </Button>
            )
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
