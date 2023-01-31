import { Box, Button, Flex, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { Wrapper } from "../../../components/Layout";
import { Chat } from "../components/Chat";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/mainReducer";
import { socketsActions } from "../reducer";
import { formatDateTime } from "../../../utils/formatDate";
import { useNavigate, useParams } from "react-router-dom";
import { useIsAuth } from "../../../hooks/useIsAuth";

interface IChatMenuButtonProps {
  label: string;
  onClick: () => void;
  selected: boolean;
}
const ChatMenuButton = ({ label, selected, onClick }: IChatMenuButtonProps) => {
  return (
    <Button width="50%" paddingY={8} fontSize={20} colorScheme={selected ? 'blackAlpha' : ''} borderRadius={0} onClick={onClick}>{label}</Button>
  )
}

const ChatRecepcao = () => {
  useIsAuth();
  const chats = useSelector((state: RootState) => state.sockets.chats || []);
  const chat = useSelector((state: RootState) => state.sockets.chat);
  const usuario = useSelector((state: RootState) => state.login.user || state.login.user_temp);
  const [finalizado, setFinalizado] = useState(false);
  const [showWrapper, setShowWrapper] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('aguardando');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(socketsActions.requestChats({
      finalizado
    }))
  }, [dispatch, finalizado]);

  const { id } = useParams();
  useEffect(() => {
    if (id && chat?.id !== id) {
      const chatEncontrado = chats.find(chat => chat.id === id);
      if (chatEncontrado) dispatch(socketsActions.requestChatSuccess(chatEncontrado))
    }
    if (!id) dispatch(socketsActions.requestChatSuccess(null))
  }, [id, dispatch, chat?.id, chats]);

  const getChats = () => {
    // Ainda não tem atendente
    if (currentMenu === 'aguardando') {
      return chats.filter(chat => !chat.usuario_id)
    }

    return chats.filter(chat => chat.usuario_id === usuario?.id);
  }

  return (
    <Wrapper show={showWrapper} padding={false}>
      <Flex height="100vh" direction="row">
        <Box width="30%" boxShadow="lg">
          <Flex backgroundColor="#202c33" height="8%">
            <ChatMenuButton label="Aguardando" selected={currentMenu === 'aguardando'} onClick={() => setCurrentMenu('aguardando')} />
            <ChatMenuButton label="Meus Contatos" selected={currentMenu === 'meus_contatos'} onClick={() => setCurrentMenu('meus_contatos')} />
          </Flex>

          <List h="92%" overflowY="auto" backgroundColor="#2a3942">
            {getChats().map(chat => (
              <ListItem onClick={() => navigate(`/chats/${chat.id}`)} _hover={{ backgroundColor: '#202c33' }} cursor="pointer" key={chat.id} padding={2} borderBottom="1px solid gray" boxShadow="lg">
                <Flex align="right">
                  <Box pl={3}>
                    <Text fontWeight="bold" color="white">{chat.usuario_temporario?.nome}</Text>
                    <Text color="gray.300">{chat.mensagens[chat.mensagens.length - 1].mensagem}</Text>
                    <Text color="gray.300">Quarto: {chat?.usuario_temporario?.quarto?.nome} ({chat?.usuario_temporario?.quarto?.hotel?.nome}) </Text>
                  </Box>
                  <Text color="gray.300" mb={0} ml="auto">{formatDateTime(chat.mensagens[chat.mensagens.length - 1].created_at as string)}</Text>
                </Flex>
              </ListItem>
            ))}
            {chats.length === 0 &&
              <Heading size="sm" color="white" p={5}>
                Nenhuma pessoa aguardando atendimento encontrada.
              </Heading>
            }
          </List>
        </Box>
        <Box width="70%" bg="gray.200" >
          <Chat />
        </Box>
      </Flex>

    </Wrapper>
  );
}

export default ChatRecepcao;