import { Flex, Input } from "@chakra-ui/react";
import { FaChevronCircleRight } from "react-icons/fa";
import { useState } from 'react';

interface IProps {
  handleSendMessage: (val: string) => void;
}

const Footer = ({ handleSendMessage }: IProps) => {
  const [inputMessage, setInputMessage] = useState('');
  return (
    <Flex w="100%" position="relative" px={5} backgroundColor="#202c33" py={3}>
      <Input
        placeholder="Escreva aqui..."
        colorScheme="teal"
        backgroundColor="#2a3942"
        borderRadius={25}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(inputMessage);

            if (inputMessage.trim().length > 0) {
              setInputMessage('')
            }
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        padding={6}
        color="white"
      />
      <Flex zIndex={4}>
        <FaChevronCircleRight
          color={inputMessage.trim().length <= 0 ? 'gray' : 'teal'}
          onClick={() => {
            handleSendMessage(inputMessage);
            if (inputMessage.trim().length > 0) {
              setInputMessage('')
            };
          }}
          fontSize="1.8rem"
          style={{
            position: 'absolute',
            right: 30,
            top: 22,
          }} />
      </Flex>
    </Flex>
  );
};

export default Footer;