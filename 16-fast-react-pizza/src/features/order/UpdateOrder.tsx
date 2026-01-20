import {useFetcher, type ActionFunctionArgs} from "react-router-dom";
import Button from "../../ui/Button";
import {updateOrder} from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make Priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({params}: ActionFunctionArgs) {
  const orderId = params.orderId;

  if (!orderId) {
    throw new Response("orderId is required", {status: 400});
  }

  console.log(params);

  const data = {priority: true};
  await updateOrder(orderId, data);

  return null;
}
