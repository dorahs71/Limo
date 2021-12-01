import styled from 'styled-components';

export default function ThemeList({ posters }) {
  return (
    <ThemeListDiv>
      <ListCh1 src={posters[0] || defaultListImg} alt=""></ListCh1>

      <ListCh2 src={posters[1] || defaultListImg} alt=""></ListCh2>

      <ListCh3 src={posters[2] || defaultListImg} alt=""></ListCh3>
    </ThemeListDiv>
  );
}

const defaultListImg =
  'https://firebasestorage.googleapis.com/v0/b/limo-movie.appspot.com/o/images%2FlistDefault.png?alt=media&token=a8568e96-73d5-434e-a72b-15cdad41e53e';

const ThemeListDiv = styled.div`
  display: block;
`;

const ListCh1 = styled.img`
  position: absolute;
  width: 18vmin;
  height: 22vmin;
  right: 0px;
  z-index: -1;
  object-fit: contain;
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
  object-fit: contain;
  @media (max-width: 1280px) {
  }
`;

const ListCh3 = styled.img`
  position: absolute;
  width: 18vmin;
  height: 22vmin;
  right: 100px;
  z-index: 1;
  object-fit: contain;
  -moz-transform: rotate(-3deg);
  transform: rotate(-3deg);
  @media (max-width: 1280px) {
  }
`;
