import styled from 'styled-components';

const ListDiv = styled.div`
  width: 100%;
  padding: 10px 10px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 100px;
  @media (max-width: 1280px) {
    margin-top: 50px;
    max-width: 1000px;
  }
`;

const OneList = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 30px 50px;
  @media (max-width: 1280px) {
    width: 250px;
    height: 210px;
    margin: 20px 30px;
  }
`;

const ThemeList = styled.div`
  display: block;
`;

const ListCh1 = styled.img`
  position: absolute;
  width: 10rem;
  height: 12rem;
  right: 0px;
  z-index: -1;
  box-shadow: 1px 1px 10px 1px;
  -moz-transform: rotate(5deg);
  transform: rotate(5deg);
  @media (max-width: 1280px) {
    width: 8rem;
    height: 10rem;
  }
`;

const ListCh2 = styled.img`
  position: absolute;
  width: 10rem;
  height: 12rem;
  right: 50px;
  z-index: 0;
  box-shadow: 1px 1px 10px 1px;
  @media (max-width: 1280px) {
    width: 8rem;
    height: 10rem;
  }
`;

const ListCh3 = styled.img`
  position: absolute;
  width: 10rem;
  height: 12rem;
  right: 100px;
  z-index: 1;
  box-shadow: 1px 1px 10px 1px #333;
  -moz-transform: rotate(-3deg);
  transform: rotate(-3deg);
  @media (max-width: 1280px) {
    width: 8rem;
    height: 10rem;
  }
`;

const ListTitle = styled.div`
  font-size: 25px;
  @media (max-width: 1280px) {
    font-size: 20px;
  }
`;

export default function List() {
  return (
    <ListDiv>
      <OneList data-aos="fade-right">
        <ThemeList>
          <ListCh1
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/PSMRVeKvNsmfh8g5tUTB-756x1080.jpg"
            alt=""
          ></ListCh1>
          <ListCh2
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/vZUOqQeQSvy1ryr9fxjw-729x1080.jpg"
            alt=""
          ></ListCh2>
          <ListCh3
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/FdF8AKC2OMVSotuOHVuN-756x1080.jpg"
            alt=""
          ></ListCh3>
        </ThemeList>
        <ListTitle>好想好想出國玩片單</ListTitle>
      </OneList>
      <OneList data-aos="fade-bottom">
        <ThemeList>
          <ListCh1
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/jNTjnulWyG04vzUEfxzN-992x1418.JPG"
            alt=""
          ></ListCh1>
          <ListCh2
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/August2021/7dbaQctoROYyqluIZbgB-764x1080.jpg"
            alt=""
          ></ListCh2>
          <ListCh3
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/October2021/UKOv95WcXmGV0o2NE04N-756x1080.jpg"
            alt=""
          ></ListCh3>
        </ThemeList>
        <ListTitle>吃不下東西片單</ListTitle>
      </OneList>
      <OneList data-aos="fade-left">
        <ThemeList>
          <ListCh1
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/October2021/nqQ6186G9Jr9gSpbRqcu-757x1080.jpg"
            alt=""
          ></ListCh1>
          <ListCh2
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
            alt=""
          ></ListCh2>
          <ListCh3
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/October2021/MONfWpYqXs3Ox5crIwmY-757x1080.jpg"
            alt=""
          ></ListCh3>
        </ThemeList>
        <ListTitle>說好一起耍廢片單</ListTitle>
      </OneList>
      <OneList data-aos="fade-right">
        <ThemeList>
          <ListCh1
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/9gwE7Cf9zzvvtcRqFDss-756x1080.jpg"
            alt=""
          ></ListCh1>
          <ListCh2
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/71sAET9zJ8QAj5MyprYS-756x1080.jpg"
            alt=""
          ></ListCh2>
          <ListCh3
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
            alt=""
          ></ListCh3>
        </ThemeList>
        <ListTitle>貓狗大戰片單</ListTitle>
      </OneList>
      <OneList data-aos="fade-up">
        <ThemeList>
          <ListCh1
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/HbO2lxjjQGtjxkbP86Uh-741x1080.jpg"
            alt=""
          ></ListCh1>
          <ListCh2
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/WU8T8XzqFIcVUp4oAs2Y-1973x2809.jpg"
            alt=""
          ></ListCh2>
          <ListCh3
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/September2021/gHHoNx8bPS4Uq42qxoUM-2480x3508.jpg"
            alt=""
          ></ListCh3>
        </ThemeList>
        <ListTitle>愛是我自己片單</ListTitle>
      </OneList>
      <OneList data-aos="fade-left">
        <ThemeList>
          <ListCh1
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/October2021/MSRbo2ocgQ6N9DdzBUk0-1434x2048.jpg"
            alt=""
          ></ListCh1>
          <ListCh2
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/October2021/pZM0axx9Z1iFOXZmzqyS-1200x1713.jpg"
            alt=""
          ></ListCh2>
          <ListCh3
            src="https://movies.yahoo.com.tw/x/r/w420/i/o/production/movies/October2021/USk0faIPTQz286UGraTP-1957x2836.jpg"
            alt=""
          ></ListCh3>
        </ThemeList>
        <ListTitle>就是要冬眠片單</ListTitle>
      </OneList>
    </ListDiv>
  );
}
