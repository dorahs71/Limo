import Coverflow from 'react-coverflow';
import { StyleRoot } from 'radium';

export default function ShowCoverflow() {
  return (
    <StyleRoot>
      <Coverflow
        displayQuantityOfSide={4}
        navigation={true}
        infiniteScroll
        enableHeading
        enableScroll
        media={{
          '@media (max-width: 1280px)': {
            width: '800px',
            height: '450px',
          },
          '@media (min-width: 600px)': {
            width: '1600px',
            height: '700px',
          },
        }}
      >
        <img
          src="https://image.agentm.tw/images/movie/8b15a52055f527739653348c38187a4eda3768dee1fe4cad0eaa61e70fac9895/poster/image/px_0001.jpg"
          alt="Album one"
        />
        <img
          src="https://image.agentm.tw/images/movie/897bd9337c30cc7adb633b8d9229c177cda18ae929de42b55cbf756c6edf1baf/poster/image/px_0004.jpg"
          alt="Album two"
        />
        <img
          src="https://image.agentm.tw/images/movie/f66633641b7ff02115ffa2678b30e0118463154324e9ea061d908939d749124b/poster/image/px_0002.jpg"
          alt="Album three"
        />
        <img
          src="https://image.agentm.tw/images/movie/4e15b1010bd318cbc9c557b45e340e05215e4cdcd673da83f52961c2f3fbd54d/poster/image/px_0001.jpg"
          alt="Album four"
        />
        <img
          src="https://image.agentm.tw/images/movie/4e15b1010bd318cbc9c557b45e340e05215e4cdcd673da83f52961c2f3fbd54d/poster/image/px_0001.jpg"
          alt="Album four"
        />
        <img
          src="https://image.agentm.tw/images/movie/4e15b1010bd318cbc9c557b45e340e05215e4cdcd673da83f52961c2f3fbd54d/poster/image/px_0001.jpg"
          alt="Album four"
        />
        <img
          src="https://image.agentm.tw/images/movie/4e15b1010bd318cbc9c557b45e340e05215e4cdcd673da83f52961c2f3fbd54d/poster/image/px_0001.jpg"
          alt="Album four"
        />
        <img
          src="https://image.agentm.tw/images/movie/4e15b1010bd318cbc9c557b45e340e05215e4cdcd673da83f52961c2f3fbd54d/poster/image/px_0001.jpg"
          alt="Album four"
        />
      </Coverflow>
    </StyleRoot>
  );
}
