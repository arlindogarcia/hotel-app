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
  useToast,
  Flex,
  Image,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../../components/Wrapper";
import { TopFilter } from "../components/ShopList";
import { itemActions } from "../../item/reducer";
import { RootState } from "../../app/mainReducer";
import { formatMoney } from "../../../utils/formatMoney";
import { FiEye, FiPlus } from "react-icons/fi";
import { LOCAL_STORAGE_URL } from "../../app/config";
import { HotelConfiguracaoItem } from "../../cliente/types/hotel_configuracao_item";

const ShopList = () => {
  const configuracao_itens = useSelector((state: RootState) => state.usuario_temporario.configuracao_itens);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(itemActions.requestCategorias())
  }, [dispatch])

  const bp = useMediaQuery("(max-width: 768px)")[0];

  const toast = useToast();

  const onClickAdicionarAoCarrinho = () => {
    toast({
      title: "Item adicionado ao carrinho.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  }

  return (
    <Wrapper padding={false}>
      <Box>
        <Heading size="2xl" paddingBottom={2} marginBottom={2} px="4" pt="4">Produtos</Heading>
        <TopFilter />
        <SimpleGrid ml={bp ? '' : 4} columns={bp ? 1 : [1, 2, 3]} spacing={bp ? 0 : 4}>
          {configuracao_itens && configuracao_itens.map((configuracao_item: HotelConfiguracaoItem) => (
            <Box key={configuracao_item.id as string} shadow="md" borderWidth="1px" bg="white" borderRadius={bp ? '' : '10px'}>
              <Flex>
                <Image
                  borderRadius={bp ? '' : '10px 0 0 10px'}
                  src={LOCAL_STORAGE_URL + '/' + configuracao_item?.item?.imagem_principal}
                  alt={configuracao_item?.item?.nome}
                  width="150px"
                  objectFit="cover"
                />
                <Box p={3}>
                  <Text size="md">{configuracao_item?.item?.nome}</Text>
                  <small>
                    {configuracao_item?.item?.categoria?.nome} - {configuracao_item?.item?.subcategoria?.nome}
                  </small>

                  {configuracao_item.preco > 0 && <Heading size="md" color="green">{formatMoney(configuracao_item.preco)} </Heading>}
                  {configuracao_item.preco * 1 === 0 && <Heading size="md" color="green">GRATUÍTO</Heading>}

                  <Button maxWidth="50%" mt="1" leftIcon={<FiPlus size="1rem" />} size="sm" colorScheme="green" onClick={onClickAdicionarAoCarrinho}>
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
                        <Text>Entrega estimada em até {configuracao_item.tempo_entrega_estimado} minutos.</Text>
                        {configuracao_item.preco > 0 && <Heading size="md" color="green">{formatMoney(configuracao_item.preco)} </Heading>}
                        {configuracao_item.preco * 1 === 0 && <Heading size="md" color="green">GRATUÍTO</Heading>}
                        <Button my={2} width="100%" leftIcon={<FiPlus size="1rem" />} size="sm" colorScheme="green" onClick={onClickAdicionarAoCarrinho}>
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
                        <Flex my="2" borderBottom="1px solid gray" justifyContent="center">
                          <Heading color="gray.500" size="sm">IMAGENS</Heading>
                        </Flex>

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
    </Wrapper >
  );
}

export default ShopList;