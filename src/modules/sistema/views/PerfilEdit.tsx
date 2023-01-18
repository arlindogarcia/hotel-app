import { Flex, Heading, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Error from "../../../components/Error";
import { InputField } from "../../../components/InputField";
import ListHeader from "../../../components/ListHeader";
import { LoaderButton } from "../../../components/LoaderButton";
import Success from "../../../components/Success";
import Wrapper from "../../../components/Wrapper"
import { useIsAuth } from "../../../hooks/useIsAuth";
import { validateForm } from "../../../utils/validationForm";
import { RootState } from "../../app/mainReducer";
import { sistemaActions } from "../reducer";

const PerfilEdit = () => {
  useIsAuth();

  const perfil = useSelector((state: RootState) => state.sistema.perfil)
  const error = useSelector((state: RootState) => state.sistema.error)
  const success = useSelector((state: RootState) => state.sistema.success)
  const isLoading = useSelector((state: RootState) => state.sistema.isLoading)
  const showForm = useSelector((state: RootState) => state.sistema.showForm)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(sistemaActions.requestPerfil())
  }, [dispatch])

  return (
    <Wrapper>
      <ListHeader label="Perfil" button_back={true} />
      <Flex bgColor="white" px="1rem" py="1rem" mt="1rem" direction="column">
        <Error error={error} />
        <Success success={success} />
        {showForm && perfil && <Formik
          initialValues={perfil}
          onSubmit={(val, { setErrors }) => {
            const validation = validateForm({ nome: 'required', email: 'required' }, val)
            if (validation) {
              setErrors(validation)
              return;
            }

            if (val.password_confirmation || val.password) {
              if (!val.old_password) {
                setErrors({ old_password: 'Campo obrigatório' })
                return;
              }

              if (val.password_confirmation != val.password) {
                setErrors({ password_confirmation: 'A confirmação de nova senha e nova senha devem ser iguais.' })
                return;
              }
            }

            dispatch(sistemaActions.requestSavePerfil(val));
          }}
        >
          {({ values }) => (
            <Form>
              <InputField
                autoFocus
                name="nome"
                label="Nome"
              />
              <InputField
                name="email"
                label="Email"
              />
              <InputField
                name="celular"
                label="Celular"
                mask="(99)99999-9999"
              />
              <Heading margin="10px 0" size="lg">Resetar senha</Heading>
              <InputField
                name="old_password"
                label="Senha atual"
              />
              <InputField
                name="password"
                label="Nova senha"
              />
              <InputField
                name="password_confirmation"
                label="Confirmação nova senha"
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
    </Wrapper>
  )
}

export default PerfilEdit;