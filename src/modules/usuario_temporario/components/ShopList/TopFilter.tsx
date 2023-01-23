import { Box, Button, Flex, FlexProps, Heading, HStack, Link, Popover, PopoverCloseButton, PopoverContent, PopoverTrigger, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { InputField } from "../../../../components/InputField";
import SelectField from "../../../../components/SelectField";
import { RootState } from "../../../app/mainReducer";
import { FiArrowDown, FiArrowUp, FiFilter } from "react-icons/fi";
import { useEffect } from "react";
import { usuarioTemporarioActions } from "../../reducer";

interface NavItemProps extends FlexProps {
  active: boolean;
  label: string;
}

const OrderByItem = ({ active, label, ...rest }: NavItemProps) => {
  return (
    <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        bg={active ? 'cyan.400' : ''}
        color={active ? 'white' : ''}
        align="center"
        p="2"
        mt="1"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {label}
      </Flex>
    </Link>
  );
};

const newForm = () => {
  return {
    categoria_id: '',
    subcategoria_id: '',
    search: '',
    orderby: 'menor_preco',
  }
}

const TopFilter = () => {
  const categorias = useSelector((state: RootState) => state.item.categorias);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(usuarioTemporarioActions.requestConfiguracaoItens(newForm()))
  }, [dispatch])

  const ordenacoes = [
    {
      label: 'Menor preço',
      value: 'menor_preco',
    },
    {
      label: 'Maior preço',
      value: 'maior_preco',
    },
    {
      label: 'Menor tempo de entrega',
      value: 'menor_tempo_entrega',
    },
  ]

  const getSubcategorias = (categoria_id: string | undefined) => {
    if (!categoria_id) return [];

    const subcategorias = categorias.find((i) => i.id === categoria_id)?.subcategorias || [];

    return subcategorias.filter(sub => sub.ativo);
  }

  const { onOpen: onOpenOrdenar, onClose: onCloseOrdenar, isOpen: isOpenOrdenar } = useDisclosure()
  const { onOpen: onOpenFiltrar, onClose: onCloseFiltrar, isOpen: isOpenFiltrar } = useDisclosure()


  return (
    <Stack spacing={4} mb="4" px="4">
      <Formik
        enableReinitialize
        initialValues={newForm()}
        onSubmit={(val) => {

          dispatch(usuarioTemporarioActions.requestConfiguracaoItens(val))

          onCloseOrdenar();
          onCloseFiltrar();
        }}
      >
        {({ values, setValues }) => (
          <Form>
            <Flex>
              <Flex align="center" width="50%">
                <Popover placement="bottom" isOpen={isOpenOrdenar} onClose={onCloseOrdenar} onOpen={onOpenOrdenar}>
                  <PopoverTrigger>
                    <Box width="100%" p={4} shadow="md" borderWidth="1px" cursor="pointer" bg="white" borderRadius="10px 0 0 10px">
                      <HStack>
                        <FiArrowUp /><FiArrowDown /> <Text>Ordenar</Text>
                      </HStack>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent zIndex={4} p={4}>
                    <Box width="100%">
                      <Heading>Ordenar por</Heading>
                      <PopoverCloseButton size="lg" marginTop="4" />
                      {
                        ordenacoes.map(i => (
                          <OrderByItem onClick={() => setValues({
                            ...values,
                            orderby: i.value,
                          })} key={i.value} active={values.orderby === i.value} label={i.label} />
                        ))
                      }

                      <Button
                        colorScheme="teal"
                        size="lg"
                        mt="1rem"
                        type="submit"
                        style={{ width: '100%' }}
                      >
                        Ordenar
                      </Button>
                    </Box>
                  </PopoverContent>
                </Popover>
              </Flex>
              <Flex align="center" width="50%">
                <Popover placement="bottom" isOpen={isOpenFiltrar} onClose={onCloseFiltrar} onOpen={onOpenFiltrar}>
                  <PopoverTrigger>
                    <Box width="100%" p={4} shadow="md" borderWidth="1px" cursor="pointer" bg="white" borderRadius="0 10px 10px 0">
                      <HStack>
                        <FiFilter /> <Text>Filtrar</Text>
                      </HStack>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent zIndex={4} p="4">
                    <Box width="100%">
                      <Heading>Filtrar</Heading>
                      <PopoverCloseButton size="lg" marginTop="4" />

                      <SelectField
                        name="categoria_id"
                        label="Categoria"
                        onChange={(e) => values.subcategoria_id = ""}
                      >
                        <option value="">Selecione...</option>
                        {categorias && categorias.filter(categoria => categoria.ativo).map(i => (
                          <option key={i.id} value={i.id as string}>{i.nome}</option>
                        ))}
                      </SelectField>
                      &nbsp;&nbsp;
                      <SelectField
                        name="subcategoria_id"
                        label="Sub-categoria"

                      >
                        {values.categoria_id && <option value="">Selecione...</option>}
                        {!values.categoria_id && <option value="">Seleciona a categoria...</option>}
                        {getSubcategorias(values.categoria_id).map(i => (
                          <option key={i.id} value={i.id as string}>{i.nome}</option>
                        ))}
                      </SelectField>

                      <InputField
                        name="search"
                        label="Nome"
                        placeholder="Pesquise pelo nome..."
                      />

                      <Button
                        colorScheme="teal"
                        size="lg"
                        mt="1rem"
                        type="submit"
                        style={{ width: '100%' }}
                      >
                        Filtrar
                      </Button>
                    </Box>
                  </PopoverContent>
                </Popover>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Stack >
  )
}

export default TopFilter;