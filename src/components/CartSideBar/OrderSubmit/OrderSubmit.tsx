import React from 'react'
import { connect } from 'react-redux';
import './OrderSubmit.css'
import billIcon from '../../../images/bill.svg';
import checkMarkIcon from '../../../images/checkMark.svg';
import notificationIcon from '../../../images/notification.svg';
import { Food } from '../../../models';
import store from '../../../store/store';

const OrderSubmit = () => {

  const [subTotal, setSubTotal] = React.useState<number>(0);
  let counter: number;

  store.subscribe(() => {
    calculateTotal();
  });

  function calculateTotal() {
    counter = 0;

    store.getState().cartMenuOption.cartList.forEach((food: Food) => {
      counter += (food.price * food.quantity)
    })
    setSubTotal(counter)
  }

  return (
    <div className='orderSubmit-container'>
      <div className='orderSubmit-infos'>
        <span className='orderSubmit-element'>
          <p>Subtotal</p>
          <p className='subtotal-value'>${Math.round(subTotal)}</p>
        </span>
        <span className='orderSubmit-element'>
          <p>Taxes (6%)</p>
          <p className='taxes-value'>${Math.round(subTotal * 0.06)}</p>
        </span>
        <span className='orderSubmit-element'>
          <p>Total</p>
          <p className='total-value'>${Math.round(subTotal * 1.06)}</p>
        </span>
      </div>
      <div className='orderSubmit-buttons'>
        <button>
          <img src={notificationIcon} alt="Service" />
          <p>Service</p>
        </button>
        <button>
          <img src={billIcon} alt="Bill" />
          <p>Bill</p>
        </button>
        <button onClick={undefined} className='submit'>
          <img src={checkMarkIcon} alt="Submit Order" />
          <p>Submit Order</p>
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({ cartList: state.cartMenuOption.cartList });

export default connect(mapStateToProps)(OrderSubmit);