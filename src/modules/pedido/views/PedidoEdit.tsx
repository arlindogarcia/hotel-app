import { Box, Button, Flex, Heading, Image, Radio, SimpleGrid, Stack, useMediaQuery } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RadioField } from "../../../components/Inputs";
import { Error, ListHeader, Success, Wrapper } from "../../../components/Layout";
import { ResponsiveTable, TableHeaders } from "../../../components/Utils";
import { useIsAuth } from "../../../hooks/useIsAuth";
import { formatDate } from "../../../utils/formatDate";
import { formatMoney } from "../../../utils/formatMoney";
import { LOCAL_STORAGE_URL } from "../../app/config";
import { RootState } from "../../app/mainReducer";
import { getStatusPedido } from "../arrays/status_pedido";
import { pedidoActions } from "../reducer";

const PedidoEdit = () => {
  const { id } = useParams();

  useIsAuth();

  const pedido = useSelector((state: RootState) => state.pedido.pedido)
  const error = useSelector((state: RootState) => state.pedido.error)
  const success = useSelector((state: RootState) => state.pedido.success)
  const isLoading = useSelector((state: RootState) => state.pedido.isLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!id) return;

    dispatch(pedidoActions.requestPedido({ id }))
  }, [dispatch, id])

  const bp = useMediaQuery("(max-width: 768px)")[0];

  const headers: TableHeaders<any>[] = [
    {
      label: "Nome",
      wrapped: true,
      render: (reg) => reg?.item?.nome,
    },
    {
      label: "Categoria/Sub-categoria",
      wrapped: true,
      render: (reg) => reg?.item?.categoria?.nome + ' - ' + reg?.item?.subcategoria?.nome,
    },
    {
      label: "Quantidade",
      wrapped: true,
      render: (reg) => reg?.quantidade,
    },
    {
      label: "Valor Un.",
      wrapped: true,
      render: (reg) => parseInt(reg?.valor_unitario) === 0 ? 'GRATUÍTO' : formatMoney(reg?.valor_unitario),
    },
    {
      label: "Valor Total",
      wrapped: true,
      render: (reg) => formatMoney(reg?.valor_total),
    },
    {
      label: "Imagem",
      wrapped: true,
      render: (reg) => <Image width="150px" src={LOCAL_STORAGE_URL + '/' + reg?.item?.imagem_principal} alt='Imagem' />,
    },
  ]

  return (
    <Wrapper>
      <ListHeader label="Pedido" button_back={true} isLoading={isLoading} />
      <Flex px="1rem" py="1rem" mt="1rem" direction="column">
        <Error error={error} />
        <Success success={success} />
        {pedido && <Formik
          enableReinitialize
          initialValues={pedido}
          onSubmit={(val) => {
            dispatch(pedidoActions.requestSavePedido(val));
          }}
        >
          {({ values }) => (
            <Form>
              <Flex mt={2} mb={5} bg="white" p={4} borderRadius={25} boxShadow="lg" width="100%" wrap="wrap">
                <SimpleGrid width="full" columns={bp ? 1 : 2}>
                  <Box width={bp ? '100%' : '50%'}>
                    <Heading mb={4} size="sm">Emissão: {formatDate(values.created_at as string, "dd/MM/yyyy HH:mm")}</Heading>
                    <Heading mb={4} size="sm">Entrega: {values?.data_entrega ? formatDate(values.data_entrega as string, "dd/MM/yyyy HH:mm") : 'Nenhuma'}</Heading>
                    <Heading my={4} size="sm">Quarto: {values?.quarto?.nome}</Heading>
                    <Heading my={4} size="sm">Pessoa: {values?.usuario_temporario?.nome}</Heading>
                    <Heading my={4} size="sm">Valor: {formatMoney(values?.valor_total)}</Heading>
                  </Box>
                  <Box width={bp ? '100%' : '50%'}>
                    <Heading size="md" mb={4}>
                      Atualizar Status
                    </Heading>
                    <Flex>
                      <RadioField name="status">
                        <Stack direction="column">
                          {(getStatusPedido(null) as any).map((i: any) => (
                            <Radio key={i.value} value={i.value}>{i.label}</Radio>
                          ))}
                        </Stack>
                      </RadioField>
                    </Flex>
                    <Button type="submit" ml="2rem" mt={4} colorScheme="teal" isLoading={isLoading}>Atualizar</Button>
                  </Box>
                </SimpleGrid>
              </Flex>
              <ResponsiveTable headers={headers} data={values.itens} />
            </Form>
          )}
        </Formik>}
      </Flex>
    </Wrapper>
  )
}

export default PedidoEdit;