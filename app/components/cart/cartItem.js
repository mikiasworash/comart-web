import { useState } from "react";
import Link from "next/link";

function CartItem({ cartItem }) {
  const [amount, setAmount] = useState(cartItem.amount);

  return (
    <li key={cartItem.product._id} className="flex py-6 lg:w-[32rem]">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Link href={`/products/${cartItem.product._id}`}>
          <img
            src={cartItem.product.photo}
            alt={cartItem.product.name}
            className="h-full w-full object-cover object-center"
          />{" "}
        </Link>
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`/products/${cartItem.product._id}`}>
                {cartItem.product.name}
              </Link>
            </h3>
            <p className="ml-4">{cartItem.product.price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {cartItem.product.category.name}
          </p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex gap-2 items-center">
            <p className="text-gray-500">Qty </p>
            <input
              type="number"
              className="w-14 text-center rounded-lg border-none font-semibold text-gray-700 placeholder-gray-700 bg-gray-100 outline-none focus:outline-none text-md hover:text-black"
              placeholder="1"
              value={amount}
              min="1"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
