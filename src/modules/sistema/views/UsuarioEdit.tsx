import { ButtonGroup, Flex, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CheckField from "../../../components/CheckField";
import Error from "../../../components/Error";
import { InputField } from "../../../components/InputField";
import ListHeader from "../../../components/ListHeader";
import { LoaderButton } from "../../../components/LoaderButton";
import MultiSelectInput from "../../../components/MultiSelectInput";
import { MultiSelectInputField } from "../../../components/MultiSelectInputField";
import SelectField from "../../../components/SelectField";
import Success from "../../../components/Success";
import Wrapper from "../../../components/Wrapper"
import { useIsAuth } from "../../../hooks/useIsAuth";
import { validateForm } from "../../../utils/validationForm";
import { RootState } from "../../app/mainReducer";
import { sistemaActions } from "../reducer";

const UsuarioEdit = () => {
  const { id } = useParams();

  useIsAuth();

  const usuario = useSelector((state: RootState) => state.sistema.usuario)
  const error = useSelector((state: RootState) => state.sistema.error)
  const success = useSelector((state: RootState) => state.sistema.success)
  const isLoading = useSelector((state: RootState) => state.sistema.isLoading)
  const showForm = useSelector((state: RootState) => state.sistema.showForm)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!id) return;

    dispatch(sistemaActions.requestUsuario({ id }))
  }, [dispatch])

  return (
    <Wrapper>
      <ListHeader label="Usuário" button_back={true} />
      <Flex bgColor="white" px="1rem" py="1rem" mt="1rem" direction="column">
        <Error error={error} />
        <Success success={success} />
        {showForm && usuario && <Formik
          initialValues={usuario}
          onSubmit={(val, { setErrors }) => {
            const validation = validateForm({ nome: 'required', email: 'required', password: 'requiredIfNotId' }, val)
            if (validation) {
              setErrors(validation)
              return;
            }
            dispatch(sistemaActions.requestSaveUsuario(val));
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
              <InputField
                name="password"
                label="Nova senha"
              />
              <CheckField
                name="ativo"
                label="Usuário ativo?"
                mb={2}
              />
              <ButtonGroup>
                <MultiSelectInputField
                  name="acessos_quais_hoteis"
                  label="Ver quais hotéis?"
                  items={[
                    {
                      label: 'Todos',
                      value: 'Todos',
                    }
                  ]}
                />
                <MultiSelectInputField
                  name="acessos_sistema"
                  label="Acessos ao sistema"
                  items={[
                    {
                      label: 'Administrador geral',
                      value: 'AdminGeral'
                    },
                    {
                      label: 'Administrador da rede de hoteis',
                      value: 'AdminRedeHotel'
                    },
                  ]}
                />
              </ButtonGroup>

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

export default UsuarioEdit;