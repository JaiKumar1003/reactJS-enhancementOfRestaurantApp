import {useState} from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import './App.css'

import Login from './components/Login'
import RestoApp from './components/RestoApp'
import Cart from './components/Cart'
import CartContext from './context/MyContext'

const App = () => {
  const [restaurantName, setRestaurantName] = useState('')
  const [currentDishCategory, setCurrentDishCategory] = useState('')
  const [currentDishList, setCurrentDishList] = useState({})
  const [restaurantData, setRestaurantData] = useState([])
  const [cartList, setCartList] = useState([])

  const addCartItem = eachItem => {
    const findCartItem = cartList.find(
      eachCart => eachCart.dishId === eachItem.dishId,
    )
    if (findCartItem) {
      setCartList(
        cartList.map(eachCart => {
          if (eachCart.dishId === eachItem.dishId) {
            return {
              ...eachCart,
              quantity: eachCart.quantity + eachItem.quantity,
            }
          }

          return eachCart
        }),
      )
    } else {
      setCartList([...cartList, eachItem])
    }
  }

  const updateCurrentDishList = currentList => {
    setCurrentDishList(currentList)
  }

  const updateRestaurantName = resName => {
    setRestaurantName(resName)
  }

  const increaseItemQuantity = dishId => {
    const quantityUpdate = restaurantData.map(eachItem => {
      if (eachItem.menuCategoryId === currentDishCategory) {
        return {
          ...eachItem,
          categoryDishes: eachItem.categoryDishes.map(eachDish => {
            if (eachDish.dishId === dishId) {
              return {...eachDish, quantity: eachDish.quantity + 1}
            }
            return eachDish
          }),
        }
      }

      return eachItem
    })

    setRestaurantData(quantityUpdate)
  }

  const incrementCartItemQuantity = dishId => {
    const cartQuantityUpdate = cartList.map(eachCart => {
      if (eachCart.dishId === dishId) {
        return {...eachCart, quantity: eachCart.quantity + 1}
      }

      return eachCart
    })

    setCartList(cartQuantityUpdate)
  }

  const decreaseItemQuantity = dishId => {
    const quantityUpdate = restaurantData.map(eachItem => {
      if (eachItem.menuCategoryId === currentDishCategory) {
        return {
          ...eachItem,
          categoryDishes: eachItem.categoryDishes.map(eachDish => {
            if (eachDish.dishId === dishId) {
              return {...eachDish, quantity: eachDish.quantity - 1}
            }
            return eachDish
          }),
        }
      }

      return eachItem
    })

    setRestaurantData(quantityUpdate)
  }

  const decrementCartItemQuantity = dishId => {
    const currentCartItem = cartList.filter(
      eachCart => eachCart.dishId === dishId,
    )[0]

    if (currentCartItem.quantity === 1) {
      const updateCartList = cartList.filter(
        eachCart => eachCart.dishId !== dishId,
      )
      console.log(updateCartList)
      setCartList(updateCartList)
    } else {
      const cartQuantityUpdate = cartList.map(eachCart => {
        if (eachCart.dishId === dishId) {
          return {...eachCart, quantity: eachCart.quantity - 1}
        }

        return eachCart
      })
      setCartList(cartQuantityUpdate)
    }
  }

  const updateRestaurantData = data => {
    setRestaurantData(data)
  }

  const updateCurrentDishCategory = dishCategoryId => {
    setCurrentDishCategory(dishCategoryId)
  }

  const removeCartItem = dishId => {
    const updateCartList = cartList.filter(
      eachCart => eachCart.dishId !== dishId,
    )
    setCartList(updateCartList)
  }

  const removeAllCartItems = () => {
    setCartList([])
  }

  return (
    <CartContext.Provider
      value={{
        restaurantData,
        updateRestaurantData,
        currentDishCategory,
        updateCurrentDishCategory,
        restaurantName,
        updateRestaurantName,
        currentDishList,
        updateCurrentDishList,
        increaseItemQuantity,
        decreaseItemQuantity,
        cartList,
        addCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeCartItem,
        removeAllCartItems,
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={RestoApp} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </BrowserRouter>
    </CartContext.Provider>
  )
}

export default App
