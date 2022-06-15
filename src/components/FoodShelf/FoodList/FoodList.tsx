import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as modalActions from '../../../store/actions/modalFoodActions';
import FoodModal from '../../FoodModal/FoodModal';
import ProductCard from '../FoodCard/FoodCard';
import { Food2 } from '../../../models';
import './FoodList.css'

const ProductList: React.FC = ({ activeType }: any) => {
  const [foods, setFoods] = React.useState<Food2[]>([]);

  React.useEffect(() => {
    getFoodList()
  }, [])

  function getFoodList() {
    fetch('http://localhost:3001/food/getAll')
      .then(response => response.json())
      .then(responseJSON => setFoods(responseJSON))
  }

  return (
    <div className='foodCards-container'>
      <div className='foodCards-grid'>
        <FoodModal />
        {foods.length > 0 && foods.map((food: Food2, index: number) => {
          if (food.category.name.includes(activeType) || activeType === 'All Dishes')
            return (
              <ProductCard food={food} key={index} />
            );
          else return null;
        })}
      </div>
    </div>
  );
};


const mapStateToProps = (state: any) => ({ activeType: state.sideBarOption.foodType });
const mapDispatchToProps = (dispatch: any) => bindActionCreators(modalActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
