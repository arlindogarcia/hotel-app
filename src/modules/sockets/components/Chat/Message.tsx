import { useEffect, useRef } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { ChatMensagem } from "../../types";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/mainReducer";
import { formatDateTime } from "../../../../utils/formatDate";

const IconRead = ({ mensagem }: { mensagem: ChatMensagem }) => {
  return (
    <FiCheck />
  )
}

const MessageTime = ({ mensagem, onRight = true }: { mensagem: ChatMensagem; onRight?: boolean }) => {
  return (
    <Flex align="center">
      {!onRight && <IconRead mensagem={mensagem} />}
      <small>
        {formatDateTime(mensagem.created_at as string)}
      </small>
      {onRight && <IconRead mensagem={mensagem} />}
    </Flex>
  )
}

const Message = ({ mensagem }: { mensagem: ChatMensagem }) => {
  const usuario = useSelector((state: RootState) => state.login.user || state.login.user_temp);
  const usuario_id_msg = mensagem.usuario_id || mensagem.usuario_temporario_id;
  const usuarioLogadoEnviou = usuario_id_msg === usuario?.id;

  return (
    <Flex width="full" justifyContent={usuarioLogadoEnviou ? 'right' : 'left'}>
      <Flex justify="flex-end" flexDir="column">
        <Flex
          bg={usuarioLogadoEnviou ? 'gray' : 'teal'}
          color="white"
          minW="100px"
          maxW="350px"
          my="1"
          borderRadius={5}
          p="2"
          position="relative"
        >
          <Text>{mensagem?.mensagem}</Text>
          {usuarioLogadoEnviou &&
            <FaCaretRight style={{
              position: 'absolute',
              right: -10,
              top: 2,
              color: 'gray',
            }} />
          }
          {!usuarioLogadoEnviou &&
            <FaCaretLeft style={{
              position: 'absolute',
              left: -10,
              top: 2,
              color: 'teal',
            }} />
          }
        </Flex>
        <MessageTime mensagem={mensagem} onRight={usuarioLogadoEnviou} />
      </Flex>
    </Flex>
  )
}

const Messages = ({ messages }: { messages: ChatMensagem[] }) => {
  const AlwaysScrollToBottom = () => {
    const elementRef: any = useRef();
    useEffect(() => elementRef?.current?.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <Flex w="100%" h="85%" overflowY="scroll" flexDirection="column" p="3">
      {messages.map(mensagem => (
        <Message key={mensagem.id} mensagem={mensagem} />
      ))}
      <AlwaysScrollToBottom />
    </Flex>
  );
};

export default Messages;