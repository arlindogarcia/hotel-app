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

const HotelEdit = () => {
  const { id } = useParams();

  useIsAuth();

  const hotel = useSelector((state: RootState) => state.cliente.hotel)
  const clientes = useSelector((state: RootState) => state.cliente.clientes)
  const error = useSelector((state: RootState) => state.cliente.error)
  const success = useSelector((state: RootState) => state.cliente.success)
  const isLoading = useSelector((state: RootState) => state.cliente.isLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!id) return;

    dispatch(clienteActions.requestHotel({ id }))
    dispatch(clienteActions.requestClientes())
  }, [dispatch, id])

  return (
    <Wrapper>
      <ListHeader label="Hotel" button_back={true} isLoading={isLoading} />
      <Flex px="1rem" py="1rem" mt="1rem" direction="column">
        <Error error={error} />
        <Success success={success} />
        {hotel && <Formik
          enableReinitialize
          initialValues={hotel}
          onSubmit={(val, { setErrors }) => {
            const validation = validateForm({ nome: 'required', cliente_id: 'required' }, val)
            if (validation) {
              setErrors(validation)
              return;
            }
            dispatch(clienteActions.requestSaveHotel(val));
          }}
        >
          {({ values }) => (
            <Form>
              <InputField
                autoFocus
                name="nome"
                label="Nome"
              />
              <SelectField
                name="cliente_id"
                label="Cliente"
              >
                <option value="">Selecione...</option>
                {clientes.filter(cliente => cliente.ativo).map(cliente => (
                  <option key={cliente.id} value={cliente.id as string}>{cliente.nome}</option>
                ))}
              </SelectField>
              <CheckField
                name="ativo"
                label="Hotel ativo?"
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

export default HotelEdit;