import { Flex, Text, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/mainReducer";

const Header = () => {
  const chat = useSelector((state: RootState) => state.sockets.chat)
  const e_usuario_temporario = useSelector((state: RootState) => !!state.login.user_temp);

  return (
    <Flex w="100%" backgroundColor="#202c33" height="4rem" align="center" px={5} color="white">
      <Heading size="md">
        {e_usuario_temporario && !chat?.usuario_id &&
          <>
            Aguardando Atendimento...
          </>
        }
        {e_usuario_temporario && chat?.usuario_id &&
          <>
            {chat?.usuario?.nome}
          </>
        }
        {!e_usuario_temporario &&
          <>
            {chat?.usuario_temporario?.nome}
          </>
        }
      </Heading>
      <Text color="green.500" ml="auto">Online</Text>
    </Flex>
  );
};

export default Header;