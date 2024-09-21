import React from 'react';
import {Category} from '../../types';
import {Link, useParams} from 'react-router-dom';

interface Props {
  categories: Category[];
}

const CategoriesMenu: React.FC<Props> = ({categories}) => {
  const {categoryId} = useParams();

  return (
    <>
      <h4 className='text-center'>Categories</h4>
      <div className='d-flex flex-column'>
        <ul className="list-group">
          <Link className={`list-group-item list-group-item-action ${!categoryId ? 'active': ''}`} to='/' >All products</Link>
          {categories.map((category) => (
            <Link key={category._id} className={`list-group-item list-group-item-action ${category._id === categoryId ? 'active': ''}`} to={`/categories/${category._id}`} >{category.title}</Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CategoriesMenu;