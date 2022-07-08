import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled.aside`
  position: relative;
  z-index: 88;
  width: 30%;
  height: 100%;
  background-color: ${(props) => props.theme.bgColors.main};
  display: flex;
  align-items: center;
`;

const Number = styled.h1`
  position: absolute;
  font-size: 400px;
  color: ${(props) => props.theme.bgColors.lighter};
  opacity: 0.2;
  top: 10%;
  transform: translateX(-30%);
  letter-spacing: -25px;
`;

const Text = styled.section`
  color: white;
  position: relative;
  left: 200px;
  top: 150px;
  white-space: nowrap;

  article:first-child {
    font-size: 50px;
    margin-bottom: 30px;
    transform: translateX(-10px);
  }

  article:nth-child(2) {
    font-size: 20px;
    margin-bottom: 30px;
    display: flex;
  }
`;

const HeadWord = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 30px;
    font-weight: 900;
    margin-right: 10px;
  }
`;

const RestWords = styled(motion.div)`
  display: grid;
  grid-template-rows: repeat(4, 1fr);

  span {
    letter-spacing: 2px;
    align-self: end;
  }
`;

const HeadWordVar = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

const restWordVar = {
  start: {
    opacity: 0,
    x: 10,
    y: -3,
  },
  end: {
    opacity: 1,
    x: 0,
    y: -3,
    transition: {
      duration: 1,
    },
  },
};

const Slogan = () => {
  return (
    <Container>
      <Number>01</Number>
      <Text>
        <article>한국외국어대학교</article>
        <article>
          <HeadWord
            transition={{ staggerChildren: 0.3 }}
            initial="start"
            animate="end"
          >
            {["H", "U", "F", "S"].map((el, idx) => (
              <motion.span key={idx} variants={HeadWordVar}>
                {el}
              </motion.span>
            ))}
          </HeadWord>
          <RestWords
            transition={{ staggerChildren: 0.3 }}
            initial="start"
            animate="end"
          >
            {["ankuk", "niversity of", "oreign", "tudies"].map((el, idx) => (
              <motion.span key={idx} variants={restWordVar}>
                {el}
              </motion.span>
            ))}
          </RestWords>
        </article>
        <article>서울캠퍼스 & 글로벌캠퍼스</article>
      </Text>
    </Container>
  );
};

export default Slogan;
