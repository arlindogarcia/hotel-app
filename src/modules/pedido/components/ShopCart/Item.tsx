import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { FiClock } from "react-icons/fi";
import { formatMoney } from "../../../../utils/formatMoney";
import { LOCAL_STORAGE_URL } from "../../../app/config";
import { HotelConfiguracaoItem } from "../../../cliente/types/hotel_configuracao_item";
import ItemAjustQuantity from "./ItemAjustQuantity";
import ItemDeleteButton from "./ItemDeleteButton";

const Item = ({ configuracao_item }: { configuracao_item: HotelConfiguracaoItem & { quantidade: number } }) => {
  return (
    <Stack width="full" bg="white" borderRadius="10px" padding={2} my="1">
      <Flex>
        <Flex width="150px">
          <Image
            borderRadius='10px'
            src={LOCAL_STORAGE_URL + '/' + configuracao_item?.item?.imagem_principal}
            alt={configuracao_item?.item?.nome}
            maxH="150px"
            maxW="150px"
            objectFit="cover"
            mx="auto"
          />
        </Flex>
        <Box p={3}>
          <Text size="md">{configuracao_item?.item?.nome}</Text>
          <small>
            {configuracao_item?.item?.categoria?.nome} - {configuracao_item?.item?.subcategoria?.nome}
          </small>
          {configuracao_item.tempo_entrega_estimado > 0 && <small>
            <Flex alignItems="center">
              <FiClock /> <Text ml={1}>{configuracao_item.tempo_entrega_estimado} minutos.</Text>
            </Flex>
          </small>}

          {configuracao_item.preco > 0 && <Heading size="md" color="green">{formatMoney(configuracao_item.preco)} </Heading>}
          {configuracao_item.preco * 1 === 0 && <Heading size="md" color="green">GRATUÍTO</Heading>}
        </Box>
      </Flex>
      <Flex align="center" mt={2}>
        <ItemAjustQuantity configuracao_item={configuracao_item} />
        <ItemDeleteButton configuracao_item={configuracao_item} />
      </Flex>
    </Stack>
  )
}

export default Item;