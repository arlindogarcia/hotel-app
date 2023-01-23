import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Image, Stack, Text, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { LOCAL_STORAGE_URL } from "../../app/config";
import { Item } from "../../item/types/item";

interface IProps {
  item: Item | undefined;
  onCloseModal: () => void;
}

const ShopCartAddItemDrawer = ({ item, onCloseModal }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!!item) {
      onOpen();
    } else {
      onClose();
    }
  }, [item, onOpen, onClose]);

  const bp = useMediaQuery("(max-width: 768px)")[0];

  return (
    <>
      <Drawer placement={bp ? 'bottom' : 'right'} isOpen={isOpen} onClose={onCloseModal}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader marginTop={10}>
            <Stack isInline align="center">
              <FiCheckCircle color="green" />
              <Text>Item adicionado ao carrinho!</Text>
            </Stack>
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing={4}>
              {!!item && <Flex>
                <Image
                  borderRadius='10px'
                  src={LOCAL_STORAGE_URL + '/' + item?.imagem_principal}
                  alt={item?.nome}
                  width="150px"
                  objectFit="cover"
                />
                <Box p={3}>
                  <Text size="md">{item?.nome}</Text>
                  <small>
                    {item?.categoria?.nome} - {item?.subcategoria?.nome}
                  </small>
                </Box>
              </Flex>}
            </Stack>
            <Stack spacing={4} mb="20" mt="5">
              <Button colorScheme="green" padding={6}>Ir para o carrinho</Button>
              <Button colorScheme="gray" padding={6}>Continuar comprando</Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default ShopCartAddItemDrawer;