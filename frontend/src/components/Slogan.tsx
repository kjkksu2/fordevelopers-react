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
`;

const Title = styled.article`
  font-size: 50px;
  margin-bottom: 30px;
  transform: translateX(-10px);
`;

const SubTitle = styled.article`
  font-size: 20px;
  margin-bottom: 30px;
  display: flex;
`;

const FirstLetter = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 30px;
    font-weight: 900;
    margin-right: 10px;
  }
`;

const RestLetters = styled(motion.div)`
  display: grid;
  grid-template-rows: repeat(4, 1fr);

  span {
    letter-spacing: 2px;
    align-self: end;
  }
`;

const firstLetterVariants = {
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

const restLettersVariants = {
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

const LeadParagraph = styled.article``;

function Slogan() {
  return (
    <Container>
      <Number>01</Number>
      <Text>
        <Title>한국외국어대학교</Title>
        <SubTitle>
          <FirstLetter
            transition={{ staggerChildren: 0.3 }}
            initial="start"
            animate="end"
          >
            <motion.span variants={firstLetterVariants}>H</motion.span>
            <motion.span variants={firstLetterVariants}>U</motion.span>
            <motion.span variants={firstLetterVariants}>F</motion.span>
            <motion.span variants={firstLetterVariants}>S</motion.span>
          </FirstLetter>
          <RestLetters
            transition={{ staggerChildren: 0.3 }}
            initial="start"
            animate="end"
          >
            <motion.span variants={restLettersVariants}>ankuk</motion.span>
            <motion.span variants={restLettersVariants}>
              niversity of
            </motion.span>
            <motion.span variants={restLettersVariants}>oreign</motion.span>
            <motion.span variants={restLettersVariants}>tudies</motion.span>
          </RestLetters>
        </SubTitle>
        <LeadParagraph>서울캠퍼스 & 글로벌캠퍼스</LeadParagraph>
      </Text>
    </Container>
  );
}

export default Slogan;
