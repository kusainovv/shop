import styled from '@emotion/styled';
import logo from './logo.png';
import back from './back.gif';
import backContent from './back.jpg';
import './App.css';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [showModal, setShowModal] = useState({ is: false, id: -1, content: {} });
  const [products, setProducts] = useState([]);

  const getInitialCollection = () => axios.get('http://90.156.225.217:3000').then(r => setProducts(...r.data));
  const getFindCollection = (text) => axios.get(`http://90.156.225.217:3000/find/${text}`).then(r => setProducts(...r.data));

  useEffect(() => {
    getInitialCollection();
  }, []);

  const throttle = (fn, delay) => {
    let lastCalled = 0;
    return (...args) => {
      let now = new Date().getTime();
      if(now - lastCalled < delay) {
        return;
      }
      lastCalled = now;
      return fn(...args);
    }
  }

  const findCollectionByText = (text) => {
    if (text.length === 0) {
      getInitialCollection();
    } else {
      getFindCollection(text);
    }
  }

  
  return (
    <Wrapper>
      <Header>
        <img src={logo} alt='logo' />
      </Header>
      
      <Main>
        <FindProduct>
          <h1>Найти товар</h1>
          <input type='text' placeholder='Например: сумка' onChange={(e) => {
            throttle(() => findCollectionByText(e.target.value), 100)();
          }} />
        </FindProduct>

        <AllProducts>
          <h1>Все товары</h1>
          
          <Products>
            {products?.map((product, idx) => <Product key={idx} onClick={() => {
              setShowModal({ id: idx, is: true, content: product });
            }}>
              <img src={product.img} alt='' />
              <Title>
                {product.title}
              </Title>
              <Price>
                {product.price}
              </Price>
            </Product>)}

            {
              showModal.is && <Modal title={showModal.content?.title} open={showModal.is} onCancel={() => {
                  setShowModal({ id: showModal.id, is: false });  
                }} onOk={() => {
                  setShowModal({ id: showModal.id, is: false });  
                }}>
                  <ModalPreview style={{
                    backgroundImage: `url(${showModal.content?.img})`
                  }} />
              </Modal>  
            }   
          </Products>
        </AllProducts>
      </Main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  padding: 20px;
  background: #43110a url(${back});
  display: flex;
  justify-content: center;
`;


const Main = styled.main`
  min-height: calc(100vh - 119px);
  background: #43110a url(${backContent});
`;


const FindProduct = styled.div`
  padding: 30px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;

  > h1 {
    margin: 0 0 10px 0;
  }

  > input {
    padding: 0 10px;
    border: none;
    outline: none;
    border-radius: 4px;
    height: 30px;

    @media (max-width: 700px) {
      width: 100%;
    }
  }
`;


const AllProducts = styled.div`
  padding: 30px;
  color: white;
  margin-top: 50px;

  > h1 {
    margin: 0 auto 20px auto;
    text-align: center;
  }
`;


const Product = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 10px;
  cursor: pointer;  
  box-sizing: border-box;
  border: 1px solid red;
  
  > img {
    min-height: 270px;
    @media (max-width: 700px) {
    width: 100%;
  }
  }

  @media (max-width: 700px) {
    width: 100%;
  }
`;


const Products = styled.div`
  display: grid;
  grid-template-columns: 320px 320px;
  justify-content: center;

  @media (max-width: 700px) {
    grid-template-columns: 320px;
  }
`;



const Title = styled.p``;


const Price = styled.p`
  margin-right: auto;
  margin-top: 0;
`;


const ModalPreview = styled.div`
  width: 100%;
  height: 400px;
  background-position: center;
  background-repeat: no-repeat;
`;

export default App;
