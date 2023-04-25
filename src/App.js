import styled from '@emotion/styled';
import logo from './logo.png';
import back from './back.gif';
import './App.css';
import { Card, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Layout} from 'antd';
import Meta from 'antd/es/card/Meta';

const { Search } = Input;
const { Footer, Content } = Layout;


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
    <Layout>
      <HeaderWrapper>
        <img src={logo} alt='logo' />
      </HeaderWrapper>
      
      <ContentWrapper style={{
        minHeight: 'calc(100vh - 141px)'
      }} class={'Content'}>
        <AllProducts>
          <FindProduct>
          <InputWrapper type='text' placeholder='Например: сумка' onChange={(e) => {
            throttle(() => findCollectionByText(e.target.value), 100)();
          }} />
        </FindProduct>

          <Products>
            {products?.map((product, idx) => <CardWrapper hoverable key={idx} onClick={() => {
              setShowModal({ id: idx, is: true, content: product });
            }} cover={<img src={product.img} alt='' />}>
              <Meta title={product.title} description={product.price} />
            </CardWrapper>)}

            {
              showModal.is && <Modal title={showModal.content?.title} open={showModal.is} onCancel={() => {
                  setShowModal({ id: showModal.id, is: false });  
                }} onOk={() => {
                  setShowModal({ id: showModal.id, is: false });  
                }}>
                  <Meta title={showModal.content?.price} />
                  <ModalPreview style={{
                    backgroundImage: `url(${showModal.content?.img})`
                  }} />
              </Modal>  
            }   
          </Products>
        </AllProducts>
      </ContentWrapper>
      
      <FooterWrapper>@2023</FooterWrapper>
    </Layout>
  );
}

const HeaderWrapper = styled.header`
  padding: 10px;
  background: #43110a url(${back});
  display: flex;
  justify-content: center;
`;

const FindProduct = styled.div`
  padding-bottom: 30px;
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
  margin-top: 50px;

  > h1 {
    margin: 0 auto 20px auto;
    text-align: center;
  }
`;


const CardWrapper = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
  padding: 10px;
  cursor: pointer;  
  box-sizing: border-box;
  background-color: white;
  color: black;
  border-radius: 12px;
  word-break: break-word;

  > img {
    width: 270px;
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
  grid-template-columns: calc(320px - 20px) calc(50% - 20px);
  justify-content: center;
  gap: 20px;

  @media (max-width: 700px) {
    grid-template-columns: 320px;
  }
`;

const ContentWrapper = styled(Content)`
  display: flex;
  justify-content: center;
  margin: auto;
`;

const ModalPreview = styled.div`
  width: 100%;
  height: 400px;
  background-position: center;
  background-repeat: no-repeat;
`;


const FooterWrapper = styled(Footer)`
  margin-top: 20px;
  text-align: center;
  padding: 10px;
  background: #43110a url(${back});
  display: flex;
  justify-content: center;
  color: white;
`;

const InputWrapper = styled(Search)`
  margin-right: auto;
`;


export default App;
