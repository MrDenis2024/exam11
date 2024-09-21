import React, {useEffect, useState} from 'react';
import {ProductMutation,} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {selectCategories, selectCategoriesFetching} from '../../store/categoriesSlice';
import {fetchCategories} from '../../store/categoriesThunks';
import FileInput from './FileInput';
import ButtonSpinner from '../Spinner/ButtonSpinner';
import Spinner from '../Spinner/Spinner';

interface Props {
  onSubmit: (product: ProductMutation) => void;
  loading: boolean;
}

const ProductForm: React.FC<Props> = ({onSubmit, loading}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesLoading = useAppSelector(selectCategoriesFetching);

  const [product, setProduct] = useState<ProductMutation>({
    title: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    const value = files && files[0] ? files[0] : null;

    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({...product});
  };

  return (
    <form className='mt-5 w-75 mx-auto border rounded-4 border-2 p-4' onSubmit={submitFormHandler}>
      <h4 className='mb-5 text-center'>Add new product</h4>
      <div className='form-group mb-3'>
        <label htmlFor='title' className='mb-1'>Title:</label>
        <input type='text' name='title' id='title' className='form-control' value={product.title}
               onChange={inputChangeHandler} required/>
      </div>
      <div className='form-group mb-3'>
        <div className='d-flex flex-column'>
          <label htmlFor="description" className="mb-2">Description:</label>
          <textarea id="description" name="description" cols={150} rows={3} className="border"
                    placeholder="Enter description" value={product.description} onChange={inputChangeHandler}
                    required></textarea>
        </div>
      </div>
      <div className='d-flex gap-5'>
        <div className='form-group mb-3'>
          <label htmlFor='price' className='mb-1'>Price:</label>
          <input type='number' name='price' min='0' id='price' className='form-control' value={product.price}
                 onChange={inputChangeHandler} required/>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="category" className="mb-1">Category:</label>
          {categoriesLoading ? (
            <div><Spinner/></div>
          ) : (
            <select className="form-select" id='category' name='category' onChange={inputChangeHandler}
                    value={product.category} required>
              <option value='' disabled={product.category !== ''}>Select category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.title}</option>
              ))}
            </select>
          )}
        </div>
      </div>
      <FileInput onChange={fileInputChangeHandler}/>
      <div className="d-flex">
        <button type="submit" className="btn btn-success ms-auto" disabled={loading}>{loading && <ButtonSpinner/>}Save
          product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;