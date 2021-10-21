import styled from 'styled-components';
import { Parallax } from 'react-parallax';

const ImgDiv = styled.div`
  width: 1800px;
  height: 800px;
  position: relative;
  @media (max-width: 1280px) {
    width: 100%;
    height: 300px;
  }
`;

const PosterImg = styled.img`
  z-index: 50;
  position: absolute;
  right: 0;
  top: 0;
  @media (max-width: 1280px) {
    width: 300px;
    height: 443px;
  }
`;

const Effect1 = styled.div`
  background: #fff;
  color: #333;
  font-size: 40px;
  opacity: 0.7;
  left: 50%;
  top: 50%;
  padding: 20px;
`;

const Intro = styled.div`
  width: 99%;
  font-size: 25px;
  background-color: #333;
  opacity: 0.7;
  padding: 20px 10px;
`;

const TopDiv = styled.div`
  height: 100px;
`;

const Effect1Div = styled.div`
  position: relative;
`;

const img1 =
  'https://image.agentm.tw/images/movie/c8785997f01a69c1fce7c2e99d11b9f9b2f43999cef6814c015069e25b73bcc1/photo/image/fx_0001.jpg';

const poster1 =
  'https://image.agentm.tw/images/movie/c8785997f01a69c1fce7c2e99d11b9f9b2f43999cef6814c015069e25b73bcc1/poster/image/px_0003.jpg';

const img3 =
  'https://image.agentm.tw/images/movie/6287ea3861a15094a78a8e6077b4dc9f852f5ed876964034370f4c94de30c765/photo/image/fx_0001.jpg';

const poster3 =
  'https://image.agentm.tw/images/movie/6287ea3861a15094a78a8e6077b4dc9f852f5ed876964034370f4c94de30c765/poster/image/px_0012.jpg';

const img2 =
  'https://image.agentm.tw/images/movie/c3f4c1d51102f43961a11992121d5c823fddb189cace213378782e9c3ee05608/photo/image/64829807-8b51-4341-ab4b-251b9c85921f.jpg';

const poster2 =
  'https://image.agentm.tw/images/movie/c3f4c1d51102f43961a11992121d5c823fddb189cace213378782e9c3ee05608/poster/image/px_0021.jpg';

export default function Showing() {
  return (
    <>
      <TopDiv />
      <Effect1Div>
        <Parallax bgImage={img1} strength={500} blur={{ min: -5, max: 8 }}>
          <ImgDiv />
          <Effect1>
            鬼計 <br /> Haunted Tales
          </Effect1>
          <Intro>
            一個男子因故殺了女子，女子化身成鬼在計程車上報仇，最後男子被殺，遭到輪迴報應到了死後的世界。一名女驅魔師有陰陽眼，去調查一件飯店的鬼魂案，該飯店因為多年前有宗群體殺人案，導致許多魂魄被卡在飯店空間裡無法投胎。一名作家到了一個幽靜的地方打算寫作，當地門房開玩笑說大家喜歡來是因為晚上會有鬼說故事給你聽沒想到寫的過程中發現了神秘的竹筏，開始虛幻與現實不分，並且還被當地鬼魂附身，但卻開始擁有大量寫文的靈感......
          </Intro>
        </Parallax>
        <PosterImg src={poster1} alt="" />
      </Effect1Div>
      <TopDiv />
      <Effect1Div>
        <Parallax bgImage={img2} strength={500} blur={{ min: -5, max: 8 }}>
          <ImgDiv />
          <Effect1>
            007 生死交戰 <br /> No Time to Die
          </Effect1>
          <Intro>
            延續上一集的故事發展，從前線退休的 007 詹姆斯龐德（丹尼爾克雷格
            飾），在牙買加享受著平靜的餘光，但當他的 CIA
            中央情報局舊友菲利克斯萊特出現，前來向他尋求幫助，這短暫的平靜也隨之結束。
            軍情六處長官M（雷夫范恩斯
            飾）派給龐德的任務本是去營救一個被綁架的科學家，但他不只發現他的 007
            位置被一位女性探員取代，更發現他將要面對一個新型態科技犯罪組織，讓自己身陷危險之中。這次他要掙扎在瑪...
          </Intro>
        </Parallax>
        <PosterImg src={poster2} alt="" />
      </Effect1Div>
      <TopDiv />
      <Effect1Div>
        <Parallax bgImage={img3} strength={500} blur={{ min: -5, max: 8 }}>
          <ImgDiv />
          <Effect1>
            靈語 <br /> Kidnapped Soul
          </Effect1>
          <Intro>
            刑警志凱（是元介
            飾）奉命調查一起無名兒童連環箱屍命案，同時，他在國小任教的姊姊美珍（吳可熙
            飾）在放學時發現女兒慘遭歹徒綁架，志凱與搭檔嘉強（禾浩辰
            飾）私下展開緊急救人行動。在查案過程中循線追蹤到美珍的前鄰居明城（鄭人碩
            飾）與慧嵐（楊丞琳
            飾），意外發現他們的女兒也已經失蹤一年，案情膠著找不到任何線索，幾乎成了破不了的懸案，兩起看似毫無關聯的案件背後似乎隱藏驚人的連結。時間一分一秒過去，外甥女命在旦夕、連續箱屍命案案情撲朔迷離，只有鬼魂知道真相，走投無路的志凱只能求助師姑曾白石（丁寧
            飾），她擁有特殊體質能夠接收「靈語」，而一樁樁懸案的關鍵線索，是否能借助「靈語」抽絲剝繭找到駭人真相......？
          </Intro>
        </Parallax>
        <PosterImg src={poster3} alt="" />
      </Effect1Div>
      <TopDiv />
    </>
  );
}
