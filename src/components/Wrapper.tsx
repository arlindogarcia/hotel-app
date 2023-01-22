import React, { ReactNode } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
import {
  FiGrid,
  FiHome,
  FiLayers,
  FiList,
  FiMenu,
  FiSettings,
  FiUser,
  FiUsers,
} from 'react-icons/fi';
import { FaBed, FaQrcode } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { ReactText } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../modules/app/mainReducer';
import { useLocation, useNavigate } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import WrapperUser from './WrapperUser';
import { getPermissionsSistema } from '../utils/permissions';
import HotelUsuarioTemporarioLogo from '../modules/usuario_temporario/components/HotelUsuarioTemporarioLogo';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
  visible: boolean;
}

export default function Wrapper({
  children,
  padding = true,
}: {
  children: ReactNode;
  padding?: boolean;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      {isOpen &&
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full">
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
      }
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p={padding ? 4 : 0}>
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate();
  const usuario = useSelector((state: RootState) => state.login.user);

  const LinkItems: Array<LinkItemProps> = [
    { name: 'Início', icon: FiHome, href: '/', visible: true },
    { name: 'Usuários', icon: FiUser, href: '/usuarios', visible: getPermissionsSistema(usuario?.acessos_sistema, 'AdminRedeHotel') },
    { name: 'Clientes', icon: FiUsers, href: '/clientes', visible: getPermissionsSistema(usuario?.acessos_sistema) },
    { name: 'Hoteis', icon: FiGrid, href: '/hoteis', visible: getPermissionsSistema(usuario?.acessos_sistema) },
    { name: 'Categorias', icon: FiGrid, href: '/categorias', visible: getPermissionsSistema(usuario?.acessos_sistema, 'AdminRedeHotel') },
    { name: 'Itens', icon: FiList, href: '/itens', visible: getPermissionsSistema(usuario?.acessos_sistema, 'AdminRedeHotel') },
    { name: 'Planos', icon: FiLayers, href: '/planos', visible: getPermissionsSistema(usuario?.acessos_sistema, 'AdminRedeHotel') },
    { name: 'Quartos Hotéis', icon: FaBed, href: '/hoteis-quartos', visible: getPermissionsSistema(usuario?.acessos_sistema, 'AdminRedeHotel') },
    { name: 'Configurações Hotéis', icon: FiSettings, href: '/hoteis-configuracoes', visible: getPermissionsSistema(usuario?.acessos_sistema, 'AdminRedeHotel') },
    { name: "QRcode's de acesso ao cliente", icon: FaQrcode, href: '/usuarios-temporarios', visible: getPermissionsSistema(usuario?.acessos_sistema, 'AdminRedeHotel') || getPermissionsSistema(usuario?.acessos_sistema, 'Recepcao') },
  ];

  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {usuario && 'Logo'}
          {!usuario && <HotelUsuarioTemporarioLogo />}
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <BrowserView>
        <Flex alignItems="center" width="full" justifyContent="center">
          <WrapperUser />
        </Flex>
      </BrowserView>
      {LinkItems.filter(i => i.visible)
        .map((link) => (
          <NavItem key={link.name} icon={link.icon} href={link.href} onClick={() => navigate(link.href)}>
            {link.name}
          </NavItem>
        ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  href: string;
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ href, icon, children, ...rest }: NavItemProps) => {
  const location = useLocation();

  return (
    <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        bg={location.pathname === href ? 'cyan.400' : ''}
        color={location.pathname === href ? 'white' : ''}
        align="center"
        p="3"
        mx="4"
        mt="1"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const usuario = useSelector((state: RootState) => state.login.user);

  return (
    <MobileView>
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        {...rest}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold">
          {usuario && 'Logo'}
          {!usuario && <HotelUsuarioTemporarioLogo />}
        </Text>

        <HStack spacing={{ base: '0', md: '6' }}>
          <Flex alignItems={'center'}>
            <WrapperUser />
          </Flex>
        </HStack>
      </Flex>
    </MobileView>
  );
};