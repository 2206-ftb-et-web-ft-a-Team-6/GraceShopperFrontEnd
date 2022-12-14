import {
  addProductToCart,
  updateCartProduct,
  updateUserCartProduct,
} from "../api/apiProductIndex";
import { getUser } from "../api/userIndex";

export default function CartCount(props) {
  const [count, cartIndex, cart, refresh, setRefresh, product_id] = [
    props.count,
    props.cartIndex,
    props.cart,
    props.refresh,
    props.setRefresh,
    props.product_id,
  ];
  async function addOne() {
    const token = localStorage.getItem("token");
    if (token) {
      const user = await getUser(token);

      if (user) {
        if (cartIndex !== undefined) {
          const upd = await updateUserCartProduct({
            token,
            count: count + 1,
            user_id: user.id,
            cart_product_id: cart.products[cartIndex].cartProductId,
            product_id,
          });
        } else {
          await addProductToCart(product_id, cart.id, count + 1);
        }
      }
    } else {
      if (cartIndex !== undefined) {
        await updateCartProduct({
          count: count + 1,
          guest_cart_id: cart.guest_cart_id,
          cart_product_id: cart.products[cartIndex].cartProductId,
        });
      } else {
        await addProductToCart(product_id, cart.id, count + 1);
      }
    }
    setRefresh(!refresh);
  }
  async function minusOne() {
    const token = localStorage.getItem("token");

    if (token) {
      const user = await getUser(token);
      if (user && count >= 1) {
        await updateUserCartProduct({
          token,
          count: count - 1,
          user_id: user.id,
          cart_product_id: cart.products[cartIndex].cartProductId,
          product_id,
        });
      }
    } else {
      if (cartIndex !== undefined && count >= 1) {
        await updateCartProduct({
          count: count - 1,
          guest_cart_id: cart.guest_cart_id,
          cart_product_id: cart.products[cartIndex].cartProductId,
        });
      }
    }
    setRefresh(!refresh);
  }
  return (
    <div>
      <h5 id="ttl2">Number In Cart: {count}</h5>
      <div>
        <button
          className="inpt2"
          onClick={(event) => {
            event.preventDefault();
            addOne();
          }}
        >
          +
        </button>
        <button
          className="inpt3"
          onClick={(event) => {
            event.preventDefault();
            minusOne();
          }}
        >
          -
        </button>
      </div>
    </div>
  );
}
