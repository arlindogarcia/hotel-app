import { Box, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import { FiChevronDown } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../modules/app/mainReducer";
import { loginActions } from "../../modules/login/reducer";

const WrapperUser = () => {
  const usuario = useSelector((state: RootState) => state.login.user);
  const usuario_temporario = useSelector((state: RootState) => state.login.user_temp);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton
        py={2}
        transition="all 0.3s"
        _focus={{ boxShadow: 'none' }}>
        <HStack>
          <VStack
            alignItems="flex-start"
            spacing="1px"
            ml="2">
            <Text fontSize="sm">Olá, {usuario?.nome}{usuario_temporario?.nome}</Text>
          </VStack>
          <Box>
            <FiChevronDown />
          </Box>
        </HStack>
      </MenuButton>
      <MenuList
        bg={useColorModeValue('white', 'gray.900')}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        {usuario && <MenuItem onClick={() => navigate('/perfil')}>Perfil</MenuItem>}
        {usuario && <MenuDivider />}
        <MenuItem onClick={() => dispatch(loginActions.logout())}>Sair</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default WrapperUser;