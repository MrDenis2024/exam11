import React, {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {selectCategories, selectCategoriesFetching} from '../../store/categoriesSlice';
import {selectProducts, selectProductsFetching} from '../../store/productsSlice';
import {fetchProducts} from '../../store/productsThunks';
import {useParams} from 'react-router-dom';
import {fetchCategories} from '../../store/categoriesThunks';
import Spinner from '../../components/Spinner/Spinner';
import ProductItem from '../../components/Products/ProductItem';
import CategoriesMenu from '../../components/Toolbar/CategoriesMenu';

const Home = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesFetching = useAppSelector(selectCategoriesFetching);
  const products = useAppSelector(selectProducts);
  const productsFetching = useAppSelector(selectProductsFetching);
  const {categoryId} = useParams();

  useEffect(() => {
    dispatch(fetchProducts(categoryId));
    dispatch(fetchCategories());
  }, [dispatch, categoryId]);

  let content: React.ReactNode = (
    <div className='alert alert-primary d-flex align-items-center' style={{width: '100%'}}>
      <i className="bi bi-exclamation-circle" style={{color: 'blue'}}></i>
      <p className='ms-2 mb-0'>There are no products here!</p>
    </div>
  );

  if(productsFetching) {
    content = (
      <div className='mx-auto'>
        <Spinner />
      </div>
    );
  } else if (products.length > 0) {
    content = products.map((product) => (
      <ProductItem key={product._id} product={product} />
    ));
  }

  const pageTitle = useMemo(() => {
    if(!categoryId) {
      return 'All products';
    }
    const category = categories.find(category => category._id === categoryId);
    if(!category) {
      return '...';
    }
    return category.title;
  }, [categories, categoryId]);


  return (
    <div className='mt-5 d-flex gap-4'>
      <div className='col-3'>
        <CategoriesMenu categories={categories} />
        {categoriesFetching && (<div className='text-center'><Spinner /></div>)}
      </div>
      <div className='d-flex flex-column col-8'>
        <h4>{pageTitle}</h4>
        <div className='d-flex gap-3 flex-wrap'>
          {content}
        </div>
      </div>
    </div>
  );
};

export default Home;