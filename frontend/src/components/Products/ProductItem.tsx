import React from 'react';
import {Product} from '../../types';
import {Link} from 'react-router-dom';
import {API_URL} from '../../constants';

interface Props {
  product: Product;
}

const ProductItem: React.FC<Props> = ({product}) => {
  return (
    <Link to={`/product/${product._id}`} className="card text-decoration-none p-2" style={{width: '250px'}}>
      <img src={`${API_URL}/${product.image}`} className="card-img-top mx-auto rounded-4" alt={product.title} style={{width: '200px', maxHeight: '150px'}} />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title flex-grow-1">{product.title}</h5>
        <span className='mt-auto'><strong>{product.price}</strong> som</span>
      </div>
    </Link>
  );
};

export default ProductItem;