import {useAppDispatch, useAppSelector} from '../../app/hook';
import {selectUser} from '../../store/usersSlice';
import {Navigate, useNavigate} from 'react-router-dom';
import ProductForm from '../../components/Forms/ProductForm';
import {selectProductCreating} from '../../store/productsSlice';
import {ProductMutation} from '../../types';
import {createProduct} from '../../store/productsThunks';
import {toast} from 'react-toastify';

const NewProducts = () => {
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectProductCreating);

  const onFormSubmit = async (product: ProductMutation) => {
    try {
      await dispatch(createProduct(product)).unwrap();
      navigate('/');
      toast.success('Product successfully created');
    } catch (e) {
      toast.error('Error creating Product');
    }
  };

  return (
    <>
      {user ? (
        <>
          <ProductForm onSubmit={onFormSubmit} loading={loading} />
        </>
      ) : (
        <Navigate to='/login' />
      )}
    </>
  );
};

export default NewProducts;