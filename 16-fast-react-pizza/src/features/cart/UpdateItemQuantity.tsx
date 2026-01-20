import {useDispatch} from "react-redux";
import Button from "../../ui/Button";
import {DecreaseItemQuantity, IncreaseItemQuantity} from "./cartSlice";

function UpdateItemQuantity({
  pizzaId,
  pizzaQuantity,
}: {
  pizzaId: number;
  pizzaQuantity: number;
}) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-1 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(DecreaseItemQuantity(pizzaId))}>
        -
      </Button>
      <p className="text-sm font-medium">{pizzaQuantity}</p>
      <Button
        type="round"
        onClick={() => dispatch(IncreaseItemQuantity(pizzaId))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
