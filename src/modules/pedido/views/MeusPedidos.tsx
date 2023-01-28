import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading, Image, SimpleGrid, Skeleton, Spacer, Stack, Text, useDisclosure, useMediaQuery } from "@chakra-ui/react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "../../../components/Layout";
import { formatDateTime } from "../../../utils/formatDate";
import { formatMoney } from "../../../utils/formatMoney";
import { LOCAL_STORAGE_URL } from "../../app/config";
import { RootState } from "../../app/mainReducer";
import StatusEstagioPedido from "../components/StatusEstagioPedido";
import { pedidoActions } from "../reducer";
import { Pedido } from "../types/Pedido";

const ItensButton = ({ pedido }: { pedido: Pedido }) => {
  const bp = useMediaQuery("(max-width: 768px)")[0];
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} size="sm" colorScheme="teal">Ver Produtos ({pedido.itens.length})</Button>

      <Drawer placement={bp ? 'bottom' : 'right'} isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading>Produtos do Pedido</Heading>
          </DrawerHeader>
          <DrawerBody>
            {pedido.itens.map(pedido_item => (<Stack key={pedido_item.id} spacing={4}>
              <Flex>
                <Image
                  borderRadius='10px'
                  src={LOCAL_STORAGE_URL + '/' + pedido_item.item?.imagem_principal}
                  alt={pedido_item.item?.nome}
                  width="150px"
                  objectFit="cover"
                />
                <Box p={3}>
                  <Text size="md">{pedido_item.item?.nome}</Text>
                  <small>
                    {pedido_item.item?.categoria?.nome} - {pedido_item.item?.subcategoria?.nome} <br />
                    Unidade: {formatMoney(pedido_item.valor_unitario)} ({pedido_item.quantidade} Un) <br />
                    Total: {formatMoney(pedido_item.valor_total)}
                  </small>
                </Box>
              </Flex>
            </Stack>))}
            <Stack spacing={4} mb="20" mt="5">
              <Button colorScheme="teal" padding={4} onClick={onClose}>Fechar</Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

const MeusPedidos = () => {
  const pedidos = useSelector((state: RootState) => state.pedido.pedidos);
  const isLoading = useSelector((state: RootState) => state.pedido.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pedidoActions.requestPedidos({}));
  }, [dispatch]);

  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Heading size="2xl" paddingBottom={2} marginBottom={2}>
        Meus Pedidos <span>
          <Button
            colorScheme="teal"
            my="0.5rem"
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>
        </span>
      </Heading>

      {isLoading && [1, 2, 3, 4, 5, 6].map((i) => (
        <Skeleton key={i} height='160px' mb={1} />
      ))}
      {!isLoading && <SimpleGrid columns={isMobile ? 1 : 2} spacing={4}>
        {pedidos && pedidos.map(pedido => <Box key={pedido.id} borderRadius={10} bg="white" shadow="md">
          <Stack pt={2} px={2}>
            <StatusEstagioPedido status={pedido.status} mostraBarraInfo={false} />
          </Stack>
          <Stack p={4}>
            <Text>Feito em: <Text as="b">{formatDateTime(pedido.created_at as string)}</Text></Text>
            <Text>Valor Total: <Text as="b">{formatMoney(pedido.valor_total)}</Text></Text>
            <Spacer />
            <ItensButton pedido={pedido} />
          </Stack>
        </Box>)}
      </SimpleGrid>}
    </Wrapper>
  )
}

export default MeusPedidos;