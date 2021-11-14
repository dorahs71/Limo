import styled from 'styled-components';
import React from 'react';

const Slides = styled.div`
  display: grid;
  /* display: flex; */
  /* flex-direction: column; */
  /* padding: 80px; */
  overflow: hidden;
  width: 100%;
`;

const Slide = styled.div`
  margin-top: 3vmin;
  grid-area: 1/-1;
`;

const SlideBtn = styled.button`
  appearance: none;
  background: transparent;
  border: none;
  color: #e7e;
  position: absolute;
  font-size: 5rem;
  width: 5rem;
  height: 5rem;
  /* top: 30%; */
  transition: opacity 0.3s;
  opacity: 9;
  z-index: 100;
  /* 
  &:hover {
    opacity: 1;
  } */

  &:focus {
    outline: none;
  }

  /* &:first-child {
    left: -50%;
  }
  &:last-child {
    right: -50%;
  } */
`;

const SlideContent = styled.div`
  width: 50vmin;
  height: 65vmin;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  transition: transform 0.5s ease-in-out;
  opacity: 0.7;

  display: grid;
  align-content: center;

  transform-style: preserve-3d;
  transform: perspective(700px) translateX(calc(95% * var(--offset)))
    rotateY(calc(-40deg * var(--dir)));
`;

const SlideContentInner = styled.div`
  transform-style: preserve-3d;
  transform: translateZ(5rem);
  transition: opacity 0.3s linear;
  text-shadow: 0 0.1rem 1rem #000;
  opacity: 9;
`;

const SlideTitle = styled.div`
  font-size: 2rem;
  font-weight: normal;
  letter-spacing: 0.2ch;
  text-transform: uppercase;
  margin: 0;
`;

const SlideDescription = styled.div`
  margin: 0;
  font-size: 0.8rem;
  letter-spacing: 0.2ch;
`;

// const Slide = styled.div``;
// const Slide = styled.div``;
// const Slide = styled.div``;

function SlideShow({ slide, offset }) {
  const active = offset === 0 ? true : null;
  // const ref = useTilt(active);

  return (
    <Slide
      data-active={active}
      style={{
        '--offset': offset,
        '--dir': offset === 0 ? 0 : offset > 0 ? 1 : -1,
      }}
    >
      <SlideContent
        style={{
          backgroundImage: `url('${slide.poster}')`,
        }}
      >
        <SlideContentInner>
          <SlideTitle>{slide.chTitle}</SlideTitle>

          <SlideDescription>{slide.rate}</SlideDescription>
        </SlideContentInner>
      </SlideContent>
    </Slide>
  );
}

export default function MovieRate({ slides }) {
  const initialState = {
    slideIndex: 0,
  };

  const slidesReducer = (state, event) => {
    if (event.type === 'NEXT') {
      return {
        ...state,
        slideIndex: (state.slideIndex + 1) % slides.length,
      };
    }
    if (event.type === 'PREV') {
      return {
        ...state,
        slideIndex:
          state.slideIndex === 0 ? slides.length - 1 : state.slideIndex - 1,
      };
    }
  };

  const [state, dispatch] = React.useReducer(slidesReducer, initialState);

  return (
    <Slides>
      <SlideBtn onClick={() => dispatch({ type: 'PREV' })}>‹</SlideBtn>

      {[...slides, ...slides, ...slides].map((slide, i) => {
        let offset = slides.length + (state.slideIndex - i);
        return <SlideShow slide={slide} offset={offset} key={i} />;
      })}
      <SlideBtn onClick={() => dispatch({ type: 'NEXT' })}>›</SlideBtn>
    </Slides>
  );
}
