import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../app/hook';
import {selectDeleteLoading, selectOneProduct, selectOneProductLoading} from '../../store/productsSlice';
import {deleteProduct, fetchOneProduct} from '../../store/productsThunks';
import Spinner from '../../components/Spinner/Spinner';
import {API_URL} from '../../constants';
import {selectUser} from '../../store/usersSlice';
import {toast} from 'react-toastify';
import ButtonSpinner from '../../components/Spinner/ButtonSpinner';

const OneProduct = () => {
  const {id} = useParams() as {id: string};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectOneProduct);
  const productLoading = useAppSelector(selectOneProductLoading);
  const deleteLoading = useAppSelector(selectDeleteLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchOneProduct(id));
  }, [dispatch, id]);

  const removeProduct = async () => {
    try {
      if(window.confirm('Вы точно хотите удалить данны продукт?')) {
        await dispatch(deleteProduct(id)).unwrap();
        navigate('/');
        toast.success('Product removal was successful');
      }
    } catch (e) {
      toast.error('Product uninstall error successful');
    }
  };

  return (
    <div className='mt-5'>
      {productLoading && (<div className='text-center'><Spinner/></div>)}
      {product && (
        <div className='d-flex flex-column mt-4'>
          <div className='d-flex gap-5 align-items-center'>
            <img className='rounded-4' style={{width: '200px', maxHeight: '200px'}}
                 src={`${API_URL}/${product.image}`} alt={product.title}/>
            <div>
              <h2>{product.title}</h2>
            </div>
          </div>
          <div>
            <h4 className='mt-5'>Information:</h4>
            <div className='d-flex flex-column gap-2'>
              <span>Price: <strong>{product.price}</strong> som</span>
              <span>Category: <strong>{product.category.title}</strong></span>
              <span>Salesman: <strong>{product.user.name}</strong></span>
              <p>Salesman phone: <a href={`tel:+${product.user.phone}`} className='text-decoration-none text-dark'>
                <strong>+{product.user.phone}</strong></a></p>
            </div>
          </div>
          <div className="my-4">
            <h4>Description:</h4>
            <p className='mb-0 mt-2'>{product.description}</p>
          </div>
          {user?._id === product.user._id && (
            <div>
              <button className='btn btn-danger' onClick={removeProduct} disabled={deleteLoading} >{deleteLoading && <ButtonSpinner />}Delete product</button>
            </div>
          )}
        </div>
      )}
      {!productLoading && !product && <h3 className="mt-5 text-center">There is no such product</h3>}
    </div>
  );
};

export default OneProduct;