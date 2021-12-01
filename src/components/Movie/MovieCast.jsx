import styled from 'styled-components';

export default function MovieCast({ eachMovie }) {
  return (
    <Cast>
      {eachMovie.cast?.map((item) => (
        <ActorDiv key={item.chActor}>
          <ActorImg src={item.actorImg} alt="" />
          <ActorName>
            {item.chActor}
            <EnName>{item.enActor || ''}</EnName>
          </ActorName>
        </ActorDiv>
      ))}
    </Cast>
  );
}

const Cast = styled.div`
  display: grid;
  margin-top: 5vmin;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 50px 0px;
  width: 100%;
`;

const ActorDiv = styled.div`
  display: flex;

  flex-direction: column;
  align-items: center;
`;

const ActorImg = styled.img`
  width: 18vmin;
  height: 20vmin;
  border-radius: 10px;
  object-fit: cover;
`;

const ActorName = styled.div`
  margin-top: 3vmin;
  font-size: 2.2vmin;
  font-weight: 700;
  @media (max-width: 1280px) {
    font-weight: 500;
  }
`;

const EnName = styled.div`
  font-size: 2vmin;
  font-weight: 500;
  color: #c5cdc0;
`;
