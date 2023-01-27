import { Box, Flex, Heading, Image, SimpleGrid, Text, useMediaQuery } from "@chakra-ui/react";
import { formatMoney } from "../../../utils/formatMoney";
import { LOCAL_STORAGE_URL } from "../../app/config";
import { Pedido } from "../types/Pedido";
import { PedidoItem } from "../types/PedidoItem"

interface IProps {
  pedido: Pedido;
}

const ResumoItensPedido = ({ pedido }: IProps) => {
  const bp = useMediaQuery("(max-width: 768px)")[0];

  return (
    <SimpleGrid columns={bp ? 1 : [1, 2, 3]} spacing={bp ? 0 : 4}>
      {pedido && pedido.itens && pedido.itens.map((item_pedido: PedidoItem) => (
        <Box mb={2} key={item_pedido.id as string} shadow="md" bg="white" borderRadius='10px'>
          <Flex>
            <Flex width="150px">
              <Image
                borderRadius='10px'
                src={LOCAL_STORAGE_URL + '/' + item_pedido?.item?.imagem_principal}
                alt={item_pedido?.item?.nome}
                maxH="150px"
                maxW="150px"
                objectFit="cover"
                mx="auto"
              />
            </Flex>
            <Box p={3}>
              <Text>{item_pedido?.item?.nome}</Text>
              <small>
                {item_pedido?.item?.categoria?.nome} - {item_pedido?.item?.subcategoria?.nome}
              </small> <br />

              <small>Quantidade: {item_pedido.quantidade}</small> <br />
              {item_pedido.valor_total > 0 &&
                <>
                  <small>Unidade: {formatMoney(item_pedido.valor_unitario)}</small> <br />
                  <Heading size="md" color="teal">Total {formatMoney(item_pedido.valor_total)} </Heading>
                </>
              }
              {item_pedido.valor_total * 1 === 0 && <Heading size="md" color="teal">GRATUÍTO</Heading>}
            </Box>
          </Flex>
        </Box>
      ))}
      <Box mb={2} shadow="md" bg="white" borderRadius='10px'>
        <Box p={3}>
          <Heading size="md" color="teal">Total: {formatMoney(pedido.valor_total)} </Heading>
        </Box>
      </Box>
    </SimpleGrid>
  )
}

export default ResumoItensPedido;