import { Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { HotelConfiguracaoItem } from "../../../cliente/types/hotel_configuracao_item";
import { pedidoActions } from "../../reducer";

const ItemAjustQuantity = ({ configuracao_item }: { configuracao_item: HotelConfiguracaoItem & { quantidade: number } }) => {
  const dispatch = useDispatch();

  return (
    <Flex align="center" width="150px" justifyContent="center">
      <ButtonGroup border="1px solid teal" bg="white" borderRadius={6}>
        <Flex align="center">
          <Button
            borderRadius="5px 0 0 5px"
            colorScheme="teal"
            size="sm"
            mr={2}
            onClick={() => dispatch(pedidoActions.requestRemoveQuantityItemToCart(configuracao_item))}
          >
            {configuracao_item.quantidade === 1 && <FiTrash />}
            {configuracao_item.quantidade > 1 && <FiMinus />}
          </Button>
          <Text paddingX={2}>{configuracao_item.quantidade}</Text>
          <Button
            borderRadius="0 5px 5px 0"
            colorScheme="teal"
            ml={2}
            size="sm"
            onClick={() => dispatch(pedidoActions.requestAddQuantityItemToCart(configuracao_item))}
          >
            <FiPlus />
          </Button>
        </Flex>
      </ButtonGroup>
    </Flex>
  )
}

export default ItemAjustQuantity;