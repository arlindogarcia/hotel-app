import { Flex, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CheckField from "../../../components/CheckField";
import Error from "../../../components/Error";
import FooterForm from "../../../components/FooterForm";
import InputImage from "../../../components/InputImage";
import ListHeader from "../../../components/ListHeader";
import { MultiSelectInputField } from "../../../components/MultiSelectInputField";
import Success from "../../../components/Success";
import Wrapper from "../../../components/Wrapper"
import { useIsAuth } from "../../../hooks/useIsAuth";
import { validateForm } from "../../../utils/validationForm";
import { RootState } from "../../app/mainReducer";
import { itemActions } from "../../item/reducer";
import HotelConfiguracaoItemList from "../components/HotelConfiguracaoItemList";
import { clienteActions } from "../reducer";

const HotelConfiguracaoEdit = () => {
  const { id } = useParams();

  useIsAuth();

  const hoteis = useSelector((state: RootState) => {
    return state.cliente.hoteis.map(hotel => ({
      label: hotel.nome,
      value: hotel.id as string,
    }))
  })
  const hotel_configuracao = useSelector((state: RootState) => state.cliente.hotel_configuracao);
  const error = useSelector((state: RootState) => state.cliente.error);
  const success = useSelector((state: RootState) => state.cliente.success);
  const isLoading = useSelector((state: RootState) => state.cliente.isLoading);
  const usuarioLogado = useSelector((state: RootState) => state.login.user)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!id) return;

    dispatch(clienteActions.requestHotelConfiguracao({ id }))
    dispatch(clienteActions.requestHoteis())
    dispatch(clienteActions.requestPlanos())
    dispatch(itemActions.requestItens())
  }, [dispatch, id])

  return (
    <Wrapper>
      <ListHeader label="Configuração" button_back={true} isLoading={isLoading} />
      <Flex px="1rem" py="1rem" mt="1rem" direction="column">
        <Error error={error} />
        <Success success={success} />
        {hotel_configuracao && <Formik
          enableReinitialize
          initialValues={hotel_configuracao}
          onSubmit={(val, { setErrors }) => {
            const validation = validateForm({ hotel_ids: 'required' }, val)
            if (validation) {
              setErrors(validation)
              return;
            }

            if (!val.cliente_id) {
              val.cliente_id = usuarioLogado?.cliente_id as string;
            }

            dispatch(clienteActions.requestSaveHotelConfiguracao(val));
          }}
        >
          {({ values }) => (
            <Form>
              <InputImage
                name="imagem_logo"
                label="Imagem da logo do hotel para o cliente"
              />
              <Spacer my="2" />
              <MultiSelectInputField
                name="hotel_ids"
                label="Hoteis da configuração"
                items={hoteis}
              />

              <CheckField
                name="ativo"
                label="Configuração ativa?"
                mb={2}
              />

              <HotelConfiguracaoItemList itens={values.itens} />
              <Spacer />

              <FooterForm isLoading={isLoading} />
            </Form>
          )}
        </Formik>}
      </Flex>
    </Wrapper >
  )
}

export default HotelConfiguracaoEdit;