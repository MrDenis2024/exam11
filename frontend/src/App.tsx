import './App.css';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Home from './containers/Home/Home';
import NewProducts from './containers/NewProduct/NewProducts';
import OneProduct from './containers/Product/OneProduct';

const App = () => (
  <Layout>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/categories/:categoryId' element={<Home />}/>
      <Route path='/new-product' element={<NewProducts />}/>
      <Route path='/product/:id' element={<OneProduct />}/>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<div className="text-center mt-5"><strong>Данной страницы не найдено вернитесь
        пожалуйста обратно!</strong></div>}/>
    </Routes>
  </Layout>
);

export default App;
