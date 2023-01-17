import { Box, HStack, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, useColorModeValue, VStack } from "@chakra-ui/react"
import { FiChevronDown } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules/app/mainReducer";
import { loginActions } from "../modules/login/reducer";

const WrapperUser = () => {
  const usuario = useSelector((state: RootState) => state.login.usuario);
  const dispatch = useDispatch();

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
            <Text fontSize="sm">Olá, {usuario?.nome}</Text>
          </VStack>
          <Box>
            <FiChevronDown />
          </Box>
        </HStack>
      </MenuButton>
      <MenuList
        bg={useColorModeValue('white', 'gray.900')}
        borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <MenuItem>Perfil</MenuItem>
        <MenuDivider />
        <MenuItem onClick={() => dispatch(loginActions.logout())}>Sair</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default WrapperUser;