import {useContext} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GrCart} from 'react-icons/gr'
import CartContext from '../../context/MyContext'

import './index.css'

const Header = props => {
  const {cartList, restaurantName} = useContext(CartContext)
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const onClickCartBtn = () => {
    const {history} = props
    history.push('/cart')
  }

  return (
    <div className="header-card">
      <Link to="/" className="header-link-el">
        <h1 className="header-restaurant-heading">{restaurantName}</h1>
      </Link>
      <div className="cart-name-icon-card">
        <p className="my-order-heading">My Orders</p>
        <button
          data-testid="cart"
          className="cart-button"
          onClick={onClickCartBtn}
        >
          <span className="span-count">{cartList.length}</span>
          <GrCart className="cart-icon" />
        </button>
        <button
          onClick={onClickLogout}
          type="button"
          className="header-logout-button"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
