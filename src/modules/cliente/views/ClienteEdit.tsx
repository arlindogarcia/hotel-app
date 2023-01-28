import { Flex, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LoaderButton } from "../../../components/Buttons";
import { CheckField, InputField, MultiSelectInputField } from "../../../components/Inputs";
import { Error, ListHeader, Success, Wrapper } from "../../../components/Layout";
import { useIsAuth } from "../../../hooks/useIsAuth";
import { validateForm } from "../../../utils/validationForm";
import { RootState } from "../../app/mainReducer";
import { clienteActions } from "../reducer";

const ClienteEdit = () => {
  const { id } = useParams();

  useIsAuth();

  const usuario = useSelector((state: RootState) => state.cliente.cliente)
  const error = useSelector((state: RootState) => state.cliente.error)
  const success = useSelector((state: RootState) => state.cliente.success)
  const isLoading = useSelector((state: RootState) => state.cliente.isLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!id) return;

    dispatch(clienteActions.requestCliente({ id }))
  }, [dispatch, id])

  return (
    <Wrapper>
      <ListHeader label="Cliente" button_back={true} isLoading={isLoading} />
      <Flex px="1rem" py="1rem" mt="1rem" direction="column">
        <Error error={error} />
        <Success success={success} />
        {usuario && <Formik
          enableReinitialize
          initialValues={usuario}
          onSubmit={(val, { setErrors }) => {
            const validation = validateForm({ nome: 'required' }, val)
            if (validation) {
              setErrors(validation)
              return;
            }
            dispatch(clienteActions.requestSaveCliente(val));
          }}
        >
          {({ values }) => (
            <Form>
              <InputField
                autoFocus
                name="nome"
                label="Nome"
              />
              <CheckField
                name="ativo"
                label="Usuário ativo?"
                mb={2}
              />
              <MultiSelectInputField
                name="modulos_contratados"
                label="Módulos contratados"
                items={[
                  {
                    label: 'Pedido de alimentos',
                    value: 'PedidoDeAlimentos',
                  },
                ]}
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

export default ClienteEdit;