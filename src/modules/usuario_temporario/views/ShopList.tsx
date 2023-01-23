import {
  Box,
  SimpleGrid,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useMediaQuery,
  Heading,
  Button,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  Text,
  Flex,
  Image,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../../components/Wrapper";
import { TopFilter } from "../components/ShopList";
import { itemActions } from "../../item/reducer";
import { RootState } from "../../app/mainReducer";
import { formatMoney } from "../../../utils/formatMoney";
import { FiEye, FiPlus } from "react-icons/fi";
import { LOCAL_STORAGE_URL } from "../../app/config";
import { HotelConfiguracaoItem } from "../../cliente/types/hotel_configuracao_item";
import ShopCartAddItemDrawer from "../components/ShopCartAddItemDrawer";
import { Item } from "../../item/types/item";
import { useIsAuth } from "../../../hooks/useIsAuth";

const ShopList = () => {
  useIsAuth();

  const configuracao_itens = useSelector((state: RootState) => state.usuario_temporario.configuracao_itens);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(itemActions.requestCategorias())
  }, [dispatch])

  const bp = useMediaQuery("(max-width: 768px)")[0];

  const [itemAdicionadoAoCarrinho, setItemAdicionadoAoCarrinho] = useState<Item | undefined>(undefined);

  const onClickAdicionarAoCarrinho = (configuracao_item: HotelConfiguracaoItem) => {

    setItemAdicionadoAoCarrinho(configuracao_item.item);
  }

  return (
    <Wrapper padding={false}>
      <Box>
        <Heading size="2xl" paddingBottom={2} marginBottom={2} px="4" pt="4">Produtos</Heading>
        <TopFilter />
        <SimpleGrid ml={bp ? 0 : 4} mr={bp ? 0 : 4} columns={bp ? 1 : [1, 2, 3]} spacing={bp ? 0 : 4}>
          {configuracao_itens && configuracao_itens.map((configuracao_item: HotelConfiguracaoItem) => (
            <Box key={configuracao_item.id as string} shadow="md" bg="white" borderRadius={bp ? '' : '10px'}>
              <Flex>
                <Flex width="150px">
                  <Image
                    borderRadius={bp ? '' : '10px 0 0 10px'}
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

                  {configuracao_item.preco > 0 && <Heading size="md" color="green">{formatMoney(configuracao_item.preco)} </Heading>}
                  {configuracao_item.preco * 1 === 0 && <Heading size="md" color="green">GRATUÍTO</Heading>}

                  <Button maxWidth="50%" mt="1" leftIcon={<FiPlus size="1rem" />} size="sm" colorScheme="green" onClick={() => onClickAdicionarAoCarrinho(configuracao_item)}>
                    Adicionar
                  </Button>
                  <Popover
                    placement="bottom"
                  >
                    <PopoverTrigger>
                      <Button maxWidth="50%" ml={1} mt="1" leftIcon={<FiEye size="1rem" />} size="sm" colorScheme="gray">Detalhes</Button>
                    </PopoverTrigger>

                    <PopoverContent zIndex={4}>
                      <PopoverHeader>
                        <Heading size="lg">{configuracao_item?.item?.nome}</Heading>
                        <Text>
                          {configuracao_item?.item?.categoria?.nome} - {configuracao_item?.item?.subcategoria?.nome}
                        </Text>
                      </PopoverHeader>
                      <PopoverCloseButton />
                      <PopoverBody>
                        {configuracao_item.tempo_entrega_estimado > 0 && <Text>Entrega estimada em até {configuracao_item.tempo_entrega_estimado} minutos.</Text>}
                        {configuracao_item.preco > 0 && <Heading size="md" color="green">{formatMoney(configuracao_item.preco)} </Heading>}
                        {configuracao_item.preco * 1 === 0 && <Heading size="md" color="green">GRATUÍTO</Heading>}
                        <Button my={2} width="100%" leftIcon={<FiPlus size="1rem" />} size="sm" colorScheme="green" onClick={() => onClickAdicionarAoCarrinho(configuracao_item)}>
                          Adicionar ao carrinho
                        </Button>

                        <Flex my="2" borderBottom="1px solid gray" justifyContent="center">
                          <Heading color="gray.500" size="sm">DESCRIÇÃO</Heading>
                        </Flex>
                        <Flex
                          dangerouslySetInnerHTML={{
                            __html: configuracao_item.item?.descricao_html as string
                          }}>
                        </Flex>
                        {configuracao_item.item?.imagens?.length && <Flex my="2" borderBottom="1px solid gray" justifyContent="center">
                          <Heading color="gray.500" size="sm">IMAGENS</Heading>
                        </Flex>}

                        {configuracao_item.item?.imagens?.map((i) => (
                          <Image src={LOCAL_STORAGE_URL + '/' + i.imagem} alt="Imagem" />
                        ))}
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>
              </Flex >
            </Box>
          ))}
        </SimpleGrid>
        {configuracao_itens && configuracao_itens.length === 0 && <Heading size="sm" ml={4}>Nenhum resultado encontrado.</Heading>}
      </Box >

      <ShopCartAddItemDrawer item={itemAdicionadoAoCarrinho} onCloseModal={() => setItemAdicionadoAoCarrinho(undefined)} />
    </Wrapper >
  );
}

export default ShopList;