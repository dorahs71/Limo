import { useState, useEffect, useRef } from 'react';
import './Coverflow.css';
import { FastForward, FastRewind, StarRounded } from '@material-ui/icons';
import styled from 'styled-components';
import { firestore } from '../utils/firebase';
import { Link } from 'react-router-dom';

const Star = styled(StarRounded)`
  transform: scale(1.3);
  color: gold;
  margin-right: 3px;
`;

const MyLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;

export default function Coverflow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [movies, setMovies] = useState([]);

  function getMovies() {
    firestore
      .collection('Movies')
      .where('rate', '>', '6.5')
      .orderBy('rate', 'desc')
      .limit(10)
      .get()
      .then((item) => {
        const movieList = item.docs.map((doc) => doc.data());
        setMovies(movieList);
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div id="carouseldiv">
      <Carousel activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
        {movies.map((movie, i) => {
          return (
            <CarouselCard key={movie.movieId} active={activeIndex === i}>
              <MyLink to={`/movie/${movie.movieId}`}>
                <div
                  className="carousel-card-content"
                  style={{ backgroundImage: `url("${movie.poster}")` }}
                >
                  <div className="carousel-card-title">
                    {movie.chTitle}
                    <br />
                    <Star />
                    {movie.rate}
                  </div>
                </div>
              </MyLink>
            </CarouselCard>
          );
        })}
      </Carousel>
      <div className="button-group">
        <button
          type="button"
          disabled={activeIndex === 0}
          onClick={() => setActiveIndex(activeIndex - 1)}
        >
          <FastRewind />
        </button>
        <button
          type="button"
          disabled={activeIndex === movies.length - 1}
          onClick={() => setActiveIndex(activeIndex + 1)}
        >
          <FastForward />
        </button>
      </div>
    </div>
  );
}

const Carousel = ({ activeIndex, setActiveIndex, children }) => {
  const carouselRef = useRef(null);
  const [carouselTranslate, setCarouselTranslate] = useState(null);

  useEffect(() => {
    const initialTranslateVal = carouselRef.current.offsetWidth / 8;
    const diffAmount = initialTranslateVal * 2;
    const translate =
      activeIndex === 0
        ? initialTranslateVal
        : initialTranslateVal - activeIndex * diffAmount;
    setCarouselTranslate(translate);
  }, [activeIndex]);

  return (
    <>
      <div
        className="carousel"
        ref={carouselRef}
        style={{ transform: `translateX(${carouselTranslate}px)` }}
      >
        {children}
      </div>
    </>
  );
};

const CarouselCard = ({ active, children }) => {
  return (
    <div className={`carousel-card ${active ? 'active' : ''}`}>{children}</div>
  );
};

// import styled from 'styled-components';
// import { useState, useEffect, useRef } from 'react';

// const CoverflowDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   padding: 20px;
// `;

// const CarouselDiv = styled.div`
//   display: flex;
//   transition: all 0.35s ease 0s;
// `;

// const CardContent = styled.div`
//   position: relative;
//   width: 100%;
//   height: 100%;
//   background-size: cover;
//   transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
//   transform: scale(0.9);
//   filter: blur(5px);
// `;

// const CardTitle = styled.div`
//   margin-left: 50px;
//   position: relative;
//   color: #e5e5e5;
//   width: 250px;
//   top: 50%;
//   font-size: 3.3rem;
//   font-weight: 700;
//   transition: all 0.8s ease 0.3s;
// `;

// const MovieCard = styled.div`
//   min-width: 50%;
//   width: 50%;
//   height: 600px;
//   transform: scale(0.9);
//   filter: blur(5px);
//   opacity: 0;
//   transform: translateY(-30%);
//   &::not(.active)${CardContent} {
//     transform: scale(0.9);
//     filter: blur(5px);
//   }
//   &::not(.active)${CardTitle} {
//     opacity: 0;
//     transform: translateY(-30%);
//   }

//   &.active${CardTitle} {
//     opacity: 1;
//     transform: translateY(-50%);
//   }
// `;

// const ButtonDiv = styled.div`
//   display: flex;
//   justify-content: center;
//   margin-top: 30px;
//   height: 32px;
//   width: 77px;
//   border: none;
// `;

// const Button = styled.button`
//   background-color: #060606;
//   color: #e5e5e5;

//   &:hover {
//     cursor: pointer;
//   }

//   &:disabled {
//     opacity: 0.5;
//   }

//   &:is(:first-child) {
//     margin-right: 20px;
//   }
// `;

// const data = [
//   {
//     id: 1,
//     title: 'ride the waves.',
//     image:
//       'https://images.unsplash.com/photo-1468657988500-aca2be09f4c6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1740&q=80',
//   },
//   {
//     id: 2,
//     title: 'tread the unknown.',
//     image:
//       'https://images.unsplash.com/photo-1522163723043-478ef79a5bb4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1843&q=80',
//   },
//   {
//     id: 3,
//     title: 'climb the highest.',
//     image:
//       'https://images.unsplash.com/photo-1495781856580-b3c4e8d21bf9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1726&q=80',
//   },
//   {
//     id: 4,
//     title: 'escape.',
//     image:
//       'https://images.unsplash.com/photo-1504903271097-d7e7c7f5f7ad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1160&q=80',
//   },
// ];

// export default function Coverflow() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   return (
//     <CoverflowDiv>
//       <Carousel activeIndex={activeIndex} setActiveIndex={setActiveIndex}>
//         {data.map((card, i) => {
//           return (
//             <CarouselCard key={card.id} active={activeIndex === i}>
//               <CardContent style={{ backgroundImage: `url("${card.image}")` }}>
//                 <CardTitle>{card.title}</CardTitle>
//               </CardContent>
//             </CarouselCard>
//           );
//         })}
//       </Carousel>
//       <ButtonDiv>
//         <Button
//           type="button"
//           disabled={activeIndex === 0}
//           onClick={() => setActiveIndex(activeIndex - 1)}
//         >
//           Prev
//         </Button>
//         <Button
//           type="button"
//           disabled={activeIndex === data.length - 1}
//           onClick={() => setActiveIndex(activeIndex + 1)}
//         >
//           Next
//         </Button>
//       </ButtonDiv>
//     </CoverflowDiv>
//   );
// }

// const Carousel = ({ activeIndex, setActiveIndex, children }) => {
//   const carouselRef = useRef(null);
//   const [carouselTranslate, setCarouselTranslate] = useState(null);

//   useEffect(() => {
//     console.log(activeIndex);
//     const initialTranslateVal = carouselRef.current.offsetWidth / 4;
//     const diffAmount = initialTranslateVal * 2;
//     const translate =
//       activeIndex === 0
//         ? initialTranslateVal
//         : initialTranslateVal - activeIndex * diffAmount;
//     setCarouselTranslate(translate);
//   }, [activeIndex]);

//   return (
//     <>
//       <CarouselDiv
//         ref={carouselRef}
//         style={{ transform: `translateX(${carouselTranslate}px)` }}
//       >
//         {children}
//       </CarouselDiv>
//     </>
//   );
// };

// const CarouselCard = ({ active, children }) => {
//   return <MovieCard {...(active ? 'active' : '')}>{children}</MovieCard>;
// };

// import Coverflow from 'react-coverflow';
// import { StyleRoot } from 'radium';

// export default function ShowCoverflow() {
//   return (
//     <StyleRoot>
//       <Coverflow
//         displayQuantityOfSide={4}
//         navigation={true}
//         infiniteScroll
//         enableHeading
//         enableScroll
//         media={{
//           '@media (max-width: 1280px)': {
//             width: '800px',
//             height: '450px',
//           },
//           '@media (min-width: 600px)': {
//             width: '1600px',
//             height: '700px',
//           },
//         }}
//       >
//         <img
//           src="https://image.agentm.tw/images/movie/8b15a52055f527739653348c38187a4eda3768dee1fe4cad0eaa61e70fac9895/poster/image/px_0001.jpg"
//           alt="Album one"
//         />
//         <img
//           src="https://image.agentm.tw/images/movie/897bd9337c30cc7adb633b8d9229c177cda18ae929de42b55cbf756c6edf1baf/poster/image/px_0004.jpg"
//           alt="Album two"
//         />
//         <img
//           src="https://image.agentm.tw/images/movie/f66633641b7ff02115ffa2678b30e0118463154324e9ea061d908939d749124b/poster/image/px_0002.jpg"
//           alt="Album three"
//         />
//         <img
//           src="https://image.agentm.tw/images/movie/4e15b1010bd318cbc9c557b45e340e05215e4cdcd673da83f52961c2f3fbd54d/poster/image/px_0001.jpg"
//           alt="Album four"
//         />
//         <img
//           src="https://image.agentm.tw/images/movie/4e15b1010bd318cbc9c557b45e340e05215e4cdcd673da83f52961c2f3fbd54d/poster/image/px_0001.jpg"
//           alt="Album four"
//         />
//         <img
//           src="https://image.agentm.tw/images/movie/4e15b1010bd318cbc9c557b45e340e05215e4cdcd673da83f52961c2f3fbd54d/poster/image/px_0001.jpg"
//           alt="Album four"
//         />
//         <img
//           src="https://image.agentm.tw/images/movie/4e15b1010bd318cbc9c557b45e340e05215e4cdcd673da83f52961c2f3fbd54d/poster/image/px_0001.jpg"
//           alt="Album four"
//         />
//         <img
//           src="https://image.agentm.tw/images/movie/4e15b1010bd318cbc9c557b45e340e05215e4cdcd673da83f52961c2f3fbd54d/poster/image/px_0001.jpg"
//           alt="Album four"
//         />
//       </Coverflow>
//     </StyleRoot>
//   );
// }
