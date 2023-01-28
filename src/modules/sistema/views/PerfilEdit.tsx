import { Flex, Heading, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoaderButton } from "../../../components/Buttons";
import { InputField } from "../../../components/Inputs";
import { Error, ListHeader, Success, Wrapper } from "../../../components/Layout";
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

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(sistemaActions.requestPerfil())
  }, [dispatch])

  return (
    <Wrapper>
      <ListHeader label="Perfil" button_back={true} isLoading={isLoading} />
      <Flex px="1rem" py="1rem" mt="1rem" direction="column">
        <Error error={error} />
        <Success success={success} />
        {perfil && <Formik
          enableReinitialize
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

              if (val.password_confirmation !== val.password) {
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
                type="email"
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
                type="password"
              />
              <InputField
                name="password"
                label="Nova senha"
                type="password"
              />
              <InputField
                name="password_confirmation"
                label="Confirmação nova senha"
                type="password"
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