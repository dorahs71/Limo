import styled from 'styled-components';
import { useEffect } from 'react';
import AOS from 'aos';
import { StarRounded } from '@material-ui/icons';
import diary from '../images/diary.png';
import list from '../images/list.png';

const MovieDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const BackgroundDiv = styled.div`
  width: 100%;
  height: auto;
  opacity: 0.5;
  overflow: visible;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20vmin;
    background: linear-gradient(to top, #111, transparent);
    z-index: 3;
  }
`;

const Zoom = styled.img`
  display: inline-block;
  width: 100%;
  top: 0;
  left: 0;
  transform: scale(1);
  transition: 1s ease-in-out;
  /* clip-path: polygon(0 0, 100% 0, 100% 80%, 0% 100%); */
  &:hover {
    transform: scale(1.2);
  }
`;

const HeadPic = styled.div`
  overflow: hidden;
  margin: 0;
`;

const MovieIntro = styled.div`
  display: flex;
`;

const PosterDiv = styled.div`
  display: block;
`;

const PosterImg = styled.img`
  position: absolute;
  z-index: 5;
  left: 10vmin;
  top: 50vmin;
  width: 53vmin;
  height: 84.15vmin;
  @media (max-width: 1280px) {
    width: 300px;
    height: 443px;
  }
`;

const PosterSquare = styled.div`
  position: absolute;
  z-index: 4;
  left: 0px;
  top: 55vmin;
  background: #75e799;
  @media (max-width: 1280px) {
    width: 60vmin;
    height: 50vmin;
  }
`;

const IntroDiv = styled.div`
  top: 50vmin;
  right: 50vmin;
  position: absolute;
  z-index: 5;
  display: flex;
  flex-direction: column;
  text-align: center;
  @media (max-width: 1280px) {
    font-size: 22px;
    font-weight: 500;
  }
`;

const ChTitle = styled.div`
  font-weight: bold;

  @media (max-width: 1280px) {
    font-size: 42px;
  }
`;

const EnTitle = styled.div`
  @media (max-width: 1280px) {
    font-size: 25px;
  }
`;

const Date = styled.div`
  margin-top: 5vmin;
  @media (max-width: 1280px) {
  }
`;

const Length = styled.div`
  margin-top: 2vmin;
  @media (max-width: 1280px) {
  }
`;

const Director = styled.div`
  margin-top: 2vmin;
  @media (max-width: 1280px) {
  }
`;

const Rate = styled.div`
  margin-top: 2vmin;
  align-items: center;
  @media (max-width: 1280px) {
  }
`;

const Trailer = styled.div`
  width: 100%;
  height: 5vmin;
  background: gold;
  padding: 5px 5px;
  color: #333;
  margin-top: 4vmin;
  border-radius: 5px;
  cursor: pointer;
`;

const TopDiv = styled.div`
  width: 100%;
  height: 35vmin;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20vmin;
    background: linear-gradient(to top, #fffaf0, transparent);
    z-index: 3;
  }
`;

const StoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  background: #fffaf0;
  padding: 30px 30px;
  color: #333;
  text-align: center;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20vmin;
    background: linear-gradient(to top, #111, transparent);
    z-index: 3;
  }
`;

const Story = styled.div`
  font-size: 22px;
  margin-top: 5vmin;
  margin-bottom: 20vmin;
`;

const StoryTitle = styled.div`
  margin-top: 10vmin;
  color: #333;
  font-size: 40px;
  font-weight: 700;
  width: auto;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    left: 71.5vmin;
    bottom: 0;
    height: 1px;
    width: 15%;
    border-bottom: 6px solid #75e799;
  }
`;

const Title = styled(StoryTitle)`
  color: #fff;
  &:before {
    left: 73vmin;
  }
`;

const Star = styled(StarRounded)`
  transform: scale(1.1);
  color: gold;
  margin-right: 3px;
`;

const AddButtonDiv = styled.div`
  display: flex;
  margin-top: 3vmin;
  justify-content: space-around;
`;

const AddButton = styled.img`
  width: 10vmin;
  height: 10vmin;
  border-radius: 50%;
  border: 5px double #add8e6;
  cursor: pointer;
`;

const HashtagDiv = styled.div`
  background: #111;
  padding: 20px 20px;
  text-align: center;
`;

const Hashtag = styled.div`
  width: 100%;
  height: 50vmin;
  border: 3px solid #75e799;
  margin-top: 6vmin;
`;

const CommentDiv = styled.div`
  background: #111;
  padding: 20px 20px;
  text-align: center;
`;

const Comment = styled.div`
  width: 100%;
  height: 50vmin;
  border: 3px solid #75e799;
  margin-top: 6vmin;
`;

const ListDiv = styled.div`
  background: #111;
  padding: 20px 20px;
  text-align: center;
`;

const List = styled.div`
  width: 100%;
  height: 50vmin;
  border: 3px solid #75e799;
  margin-top: 6vmin;
`;

const bgImg =
  'https://image.agentm.tw/images/movie/78365a27baa53bf4a4fc3e70f9d84e21e072fd2b996a218e62188d434df78445/photo/image/fx_0002.jpg';

const poster =
  'https://image.agentm.tw/images/movie/78365a27baa53bf4a4fc3e70f9d84e21e072fd2b996a218e62188d434df78445/poster/image/px_0001.jpg';

export default function Movie() {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);
  return (
    <MovieDiv>
      <BackgroundDiv>
        <HeadPic>
          <Zoom src={bgImg} alt="" />
        </HeadPic>
      </BackgroundDiv>
      <MovieIntro>
        <PosterDiv>
          <PosterImg src={poster} alt="" data-aos="fade-right" />
          <PosterSquare data-aos="fade-right" />
        </PosterDiv>
        <IntroDiv data-aos="fade-up">
          <ChTitle>破碎的琴鍵</ChTitle>
          <EnTitle>Broken Keys</EnTitle>
          <Rate>
            評分：
            <Star />
            7.0 / 500人
          </Rate>
          <Date>上映日期：2021/11/26</Date>
          <Length>片長：110 分鐘</Length>
          <Director>導演：Jimmy Keyrouz</Director>
          <Trailer>我想看預告片</Trailer>
          <AddButtonDiv>
            <AddButton src={diary} alt="" />
            <AddButton src={list} alt="" />
          </AddButtonDiv>
        </IntroDiv>
      </MovieIntro>
      <TopDiv />
      <StoryDiv>
        <StoryTitle data-aos="fade-up">劇情簡介</StoryTitle>
        <Story data-aos="fade-up">
          鋼琴家凱林的夢想是加入維也納的交響樂團，躍上國際舞台。然而美夢卻總被一聲聲突如其來的砲火槍響打醒......
          委身難民營的他，經常彈奏著母親遺留下的鋼琴撫慰人心。在一次的突襲事件，鋼琴慘遭極端份子的破壞而殘破不堪，然而賣掉鋼琴卻是他逃離敘利亞的最後希望。為了尋找修琴的零件，凱林不惜潛入一級戰區，途中他看著滿街斷壁殘垣、聽著各種撕心裂肺的哭喊，並一次次在恐怖攻擊中死裡逃生。
          好不容易歸來，面對樂觀開朗一心重振商店的雜貨店老闆、苦讀英文期盼去西方國家留學的表妹、為救父親不惜加入恐怖組織訓練營的小男孩、捨身為生存而戰的革命份子，一心盼望自由的凱林，深刻體會到自由是要付出代價的，而音樂就是他僅有的武器......
        </Story>
      </StoryDiv>
      <HashtagDiv>
        <Title>電影標籤</Title>
        <Hashtag />
      </HashtagDiv>
      <CommentDiv>
        <Title>網友評論</Title>
        <Comment />
      </CommentDiv>
      <ListDiv>
        <Title>相關片單</Title>
        <List />
      </ListDiv>
    </MovieDiv>
  );
}
