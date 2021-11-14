import styled from 'styled-components';

const ListDiv = styled.div`
  width: 100%;
  margin-top: 5vmin;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4vmin 6vmin;
`;

const ListProfileDiv = styled.div`
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: center;
`;

const OneList = styled.div`
  position: relative;
  cursor: pointer;
  width: 30vmin;
  height: 35vmin;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin: 30px 50px;

  &:hover {
    color: #75e799;
  }

  &:hover ${ListProfileDiv} {
    color: #75e799;
  }
`;

const ThemeList = styled.div`
  display: block;
`;

const ListCh1 = styled.img`
  position: absolute;
  width: 18vmin;
  height: 22vmin;
  right: 0px;
  z-index: -1;
  -moz-transform: rotate(5deg);
  transform: rotate(5deg);
  @media (max-width: 1280px) {
  }
`;

const ListCh2 = styled.img`
  position: absolute;
  width: 18vmin;
  height: 22vmin;
  right: 50px;
  z-index: 0;
  @media (max-width: 1280px) {
  }
`;

const ListCh3 = styled.img`
  position: absolute;
  width: 18vmin;
  height: 22vmin;
  right: 100px;
  z-index: 1;
  -moz-transform: rotate(-3deg);
  transform: rotate(-3deg);
  @media (max-width: 1280px) {
  }
`;

const ListTitle = styled.div`
  font-size: 2.5vmin;
  margin-top: 22vmin;
`;

const ListProfileImg = styled.img`
  width: 4vmin;
  height: 4vmin;
  margin-right: 1vmin;
`;

const ListProfileName = styled.div`
  font-size: 2vmin;
`;

export default function MovieList() {
  return (
    <ListDiv>
      <OneList>
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
        <ListProfileDiv>
          <ListProfileImg
            src="https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2Fspider.png?alt=media&token=c399cd45-8018-4648-99b2-bbceb838ee78"
            alt=""
          />
          <ListProfileName>我是魯拉拉</ListProfileName>
        </ListProfileDiv>
      </OneList>
      <OneList>
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
        <ListProfileDiv>
          <ListProfileImg
            src="https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2Fspider.png?alt=media&token=c399cd45-8018-4648-99b2-bbceb838ee78"
            alt=""
          />
          <ListProfileName>我是魯拉拉</ListProfileName>
        </ListProfileDiv>
      </OneList>
      <OneList>
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
        <ListProfileDiv>
          <ListProfileImg
            src="https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2Fspider.png?alt=media&token=c399cd45-8018-4648-99b2-bbceb838ee78"
            alt=""
          />
          <ListProfileName>我是魯拉拉</ListProfileName>
        </ListProfileDiv>
      </OneList>
      <OneList>
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
        <ListProfileDiv>
          <ListProfileImg
            src="https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2Fspider.png?alt=media&token=c399cd45-8018-4648-99b2-bbceb838ee78"
            alt=""
          />
          <ListProfileName>我是魯拉拉</ListProfileName>
        </ListProfileDiv>
      </OneList>
      <OneList>
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
        <ListProfileDiv>
          <ListProfileImg
            src="https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2Fspider.png?alt=media&token=c399cd45-8018-4648-99b2-bbceb838ee78"
            alt=""
          />
          <ListProfileName>我是魯拉拉</ListProfileName>
        </ListProfileDiv>
      </OneList>
      <OneList>
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
        <ListProfileDiv>
          <ListProfileImg
            src="https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2Fspider.png?alt=media&token=c399cd45-8018-4648-99b2-bbceb838ee78"
            alt=""
          />
          <ListProfileName>我是魯拉拉</ListProfileName>
        </ListProfileDiv>
      </OneList>
    </ListDiv>
  );
}
