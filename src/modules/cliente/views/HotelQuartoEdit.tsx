import { Flex, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LoaderButton } from "../../../components/Buttons";
import { CheckField, InputField, SelectField } from "../../../components/Inputs";
import { Error, ListHeader, Success, Wrapper } from "../../../components/Layout";
import { useIsAuth } from "../../../hooks/useIsAuth";
import { validateForm } from "../../../utils/validationForm";
import { RootState } from "../../app/mainReducer";
import { clienteActions } from "../reducer";

const HotelQuartoEdit = () => {
  const { id } = useParams();

  useIsAuth();

  const hotel_quarto = useSelector((state: RootState) => state.cliente.hotel_quarto)
  const hoteis = useSelector((state: RootState) => state.cliente.hoteis)
  const error = useSelector((state: RootState) => state.cliente.error)
  const success = useSelector((state: RootState) => state.cliente.success)
  const isLoading = useSelector((state: RootState) => state.cliente.isLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!id) return;

    dispatch(clienteActions.requestHotelQuarto({ id }))
    dispatch(clienteActions.requestHoteis())
  }, [dispatch, id])

  return (
    <Wrapper>
      <ListHeader label="Quarto do hotel" button_back={true} isLoading={isLoading} />
      <Flex px="1rem" py="1rem" mt="1rem" direction="column">
        <Error error={error} />
        <Success success={success} />
        {hotel_quarto && <Formik
          enableReinitialize
          initialValues={hotel_quarto}
          onSubmit={(val, { setErrors }) => {
            const validation = validateForm({ nome: 'required', hotel_cliente_id: 'required' }, val)
            if (validation) {
              setErrors(validation)
              return;
            }
            dispatch(clienteActions.requestSaveHotelQuarto(val));
          }}
        >
          {({ values }) => (
            <Form>
              <InputField
                autoFocus
                name="nome"
                label="Nome do quarto"
              />
              <SelectField
                name="hotel_cliente_id"
                label="Hotel"
              >
                <option value="">Selecione...</option>
                {hoteis.filter(hotel => hotel.ativo).map(hotel => (
                  <option key={hotel.id} value={hotel.id as string}>{hotel.nome}</option>
                ))}
              </SelectField>
              <CheckField
                name="ativo"
                label="Quarto ativo?"
                mb={2}
              />

              <Spacer />

              <LoaderButton
                isLoading={isLoading}
                colorScheme="teal"
                type="submit"
                mt="1rem"
              >
                Salvar
              </LoaderButton>
            </Form>
          )}
        </Formik>}
      </Flex>
    </Wrapper >
  )
}

export default HotelQuartoEdit;