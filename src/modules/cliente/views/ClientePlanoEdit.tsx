import { Flex, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CheckField from "../../../components/CheckField";
import Error from "../../../components/Error";
import { InputField } from "../../../components/InputField";
import ListHeader from "../../../components/ListHeader";
import { LoaderButton } from "../../../components/LoaderButton";
import Success from "../../../components/Success";
import Wrapper from "../../../components/Wrapper"
import { useIsAuth } from "../../../hooks/useIsAuth";
import { validateForm } from "../../../utils/validationForm";
import { RootState } from "../../app/mainReducer";
import { clienteActions } from "../reducer";

const ClientePlanoEdit = () => {
  const { id } = useParams();

  useIsAuth();

  const plano = useSelector((state: RootState) => state.cliente.plano)
  const error = useSelector((state: RootState) => state.cliente.error)
  const success = useSelector((state: RootState) => state.cliente.success)
  const isLoading = useSelector((state: RootState) => state.cliente.isLoading)
  const showForm = useSelector((state: RootState) => state.cliente.showForm)
  const usuario = useSelector((state: RootState) => state.login.user);

  const dispatch = useDispatch()

  useEffect(() => {
    if (!id) return;

    dispatch(clienteActions.requestPlano({ id }))
  }, [dispatch])

  return (
    <Wrapper>
      <ListHeader label="Plano" button_back={true} isLoading={isLoading} />
      <Flex bgColor="white" px="1rem" py="1rem" mt="1rem" direction="column">
        <Error error={error} />
        <Success success={success} />
        {showForm && plano && <Formik
          enableReinitialize
          initialValues={plano}
          onSubmit={(val, { setErrors }) => {
            const validation = validateForm({ nome: 'required' }, val)
            if (validation) {
              setErrors(validation)
              return;
            }

            val.cliente_id = usuario?.cliente_id as string;

            dispatch(clienteActions.requestSavePlano(val));
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
                label="Plano ativo?"
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

export default ClientePlanoEdit;