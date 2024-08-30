import {useContext} from 'react'

import Header from '../Header'
import CartContext from '../../context/MyContext'

import './index.css'

const Cart = () => {
  const {
    cartList,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeCartItem,
    removeAllCartItems,
  } = useContext(CartContext)

  const onClickIncreaseBtn = dishId => {
    incrementCartItemQuantity(dishId)
  }

  const onClickDecreaseBtn = dishId => {
    decrementCartItemQuantity(dishId)
  }

  const onClickRemoveCartItem = dishId => {
    removeCartItem(dishId)
  }

  const onClickRemoveAllCartItem = () => {
    removeAllCartItems()
  }

  return (
    <div className="cart-container">
      <Header />
      {cartList.length > 0 && (
        <div className="cart-heading-remove-all-btn-card">
          <h1 className="cart-heading">Cart Item</h1>
          <button
            className="cart-remove-all-btn"
            type="button"
            onClick={onClickRemoveAllCartItem}
          >
            Remove All
          </button>
        </div>
      )}
      {cartList.length === 0 ? (
        <div className="no-cart-item-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            alt="no cart item"
            className="no-cart-item-image"
          />
        </div>
      ) : (
        <ul className="cart-list">
          {cartList.map(eachCart => {
            const {
              dishId,
              dishName,
              dishPrice,
              dishCurrency,
              dishImage,
              quantity,
            } = eachCart

            return (
              <li className="cart-item" key={dishId}>
                <div className="cart-item-heading-image-card">
                  <img
                    className="cart-item-image"
                    src={dishImage}
                    alt={dishName}
                  />
                  <div className="cart-item-heading-price-card">
                    <h1 className="cart-item-heading">{dishName}</h1>
                    <p className="cart-item-price">
                      {quantity * dishPrice}
                      <span className="cart-item-currency">{dishCurrency}</span>
                    </p>
                  </div>
                </div>
                <div className="cart-item-button-remove-card">
                  <div className="cart-item-button-card">
                    <button
                      className="cart-item-increase-decrease-btn"
                      type="button"
                      onClick={() => onClickDecreaseBtn(dishId)}
                    >
                      -
                    </button>
                    <p className="cart-item-quantity">{quantity}</p>
                    <button
                      className="cart-item-increase-decrease-btn"
                      type="button"
                      onClick={() => onClickIncreaseBtn(dishId)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart-item-remove-btn"
                    type="button"
                    onClick={() => onClickRemoveCartItem(dishId)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Cart
