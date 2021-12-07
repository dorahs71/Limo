import styled from 'styled-components';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slick from '../components/Index/Slick';
import IndexVideo from '../components/Index/IndexVideo';
import { Title } from '../components/Common/Common.style';
import ListSection from '../components/Index/ListSection';
import CardSection from '../components/Index/CardSection';

export default function Index() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <>
      <IndexVideo />
      <MainDiv>
        <IndexDiv>
          <IndexTitle data-aos="fade-up">網友推薦</IndexTitle>
          <Slick />
          <IndexTitle data-aos="fade-up">精選片單</IndexTitle>
          <ListSection />
          <IndexTitle data-aos="fade-up">近期上映</IndexTitle>
          <CardSection />
        </IndexDiv>
      </MainDiv>
    </>
  );
}

const MainDiv = styled.div`
  max-width: 1560px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IndexDiv = styled.div`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IndexTitle = styled(Title)`
  margin-top: 4vw;
`;
