import styled from '@emotion/styled';
import logo from './logo.png';
import back from './back.gif';
import backContent from './back.jpg';
import './App.css';
import { Modal } from 'antd';
import { useState } from 'react';

function App() {
  const [showModal, setShowModal] = useState({ is: false, id: -1, content: {} });

  const products = [
    {
      title: 'Портфель мужской кожаный на два отделения Tuscany Leather TL141268',
      price: '10 890,00 руб',
      img: 'https://www.mirkogi.ru/upload/iblock/ffb/4bdf96e0-9c30-11e2-a380-bcaec5b392f8.resize2.jpeg'
    },
    {
      title: 'Планшет мужской кожаный Brialdi BR119 TORONTO (ТОРОНТО)',
      price: '9 950,00 руб',
      img: 'https://www.mirkogi.ru/upload/iblock/a19/f441007b-eec4-11e2-8b8f-bcaec5b392f8.resize2.jpeg'
    },
    {
      title: 'Планшет кожаный мужской LAKESTONE 943002/blc Dormer',
      price: '13 790,00 руб',
      img: 'https://www.mirkogi.ru/upload/iblock/ff9/14910336-bd9a-11e8-a632-001e680ebbad.resize2.jpeg'
    },
    {
      title: 'Сумка женская из натуральной кожи змеи ND243',
      price: '25 000,00 руб.',
      img: 'https://www.mirkogi.ru/upload/iblock/df8/ad1b1673-58db-11e3-a2dd-bcaec5b392f8.resize2.jpeg'
    }
  ];

  console.warn(showModal)
  return (
    <Wrapper>
      <Header>
        <img src={logo} alt='logo' />
      </Header>
      
      <Main>
        <FindProduct>
          <h1>Найти товар</h1>
          <input type='text' placeholder='Например: сумка' />
        </FindProduct>

        <AllProducts>
          <h1>Все товары</h1>
          
          <Products>
            {products.map((product, idx) => <Product key={idx} onClick={() => {
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

            <Modal title={showModal.content?.title} open={showModal.is} onCancel={() => {
                  setShowModal({ id: showModal.id, is: false });  
                }} onOk={() => {
                  setShowModal({ id: showModal.id, is: false });  
                }}>
                  <ModalPreview style={{
                    backgroundImage: `url(${showModal.content?.img})`
                  }} />
                </Modal>  
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
