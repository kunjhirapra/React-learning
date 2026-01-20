// Test ID: IIDSAT

import {
  useFetcher,
  useLoaderData,
  type LoaderFunctionArgs,
} from "react-router-dom";
import {getOrder} from "../../services/apiRestaurant";
import {calcMinutesLeft, formatCurrency, formatDate} from "../../utils/helpers";
import type {OrderDataTypes, PizzaTypes} from "../../utils/types";
import OrderItem from "./OrderItem";
import {useEffect} from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order: OrderDataTypes = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold tracking-wide text-red-50 uppercase">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold tracking-wide text-green-50 uppercase">
            {status} order
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="dive-stone-200 divide-y border-t border-b">
        {cart.map((item) => (
          <OrderItem
            item={item}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher.data?.find(
                (element: PizzaTypes) => element.id === item.pizzaId
              ).ingredients || []
            }
            key={item.pizzaId}
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder />}
    </div>
  );
}
export async function loader({params}: LoaderFunctionArgs) {
  const {orderId} = params;

  if (!orderId) {
    throw new Error("Missing order ID");
  }

  const order = await getOrder(orderId);
  return order;
}

export default Order;
/*
WORKING FLOW OF REACT ROUTER


User navigates to /order/123
           ↓
React Router matches route /order/:orderId
           ↓
React Router calls loader({ params: { orderId: "123" } })
           ↓
loader runs → calls getOrder("123") → receives order data
           ↓
loader returns { id, status, priority, ... }
           ↓
React Router stores this loader data
           ↓
Order component renders
           ↓
useLoaderData() gives the returned object to the component
           ↓
Component uses it as `order`




🎉 Final Summary

Your loader runs before the component renders.

It fetches the order from the server.

It returns the order object.

React Router stores this data.

When <Order /> renders, useLoaderData() retrieves that stored data.

The component receives it as order.
*/
