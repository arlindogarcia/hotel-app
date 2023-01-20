import { ButtonGroup, Flex, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CheckField from "../../../components/CheckField";
import Error from "../../../components/Error";
import FooterForm from "../../../components/FooterForm";
import { InputField } from "../../../components/InputField";
import ListHeader from "../../../components/ListHeader";
import { MultiSelectInputField } from "../../../components/MultiSelectInputField";
import SelectField from "../../../components/SelectField";
import Success from "../../../components/Success";
import Wrapper from "../../../components/Wrapper"
import { useIsAuth } from "../../../hooks/useIsAuth";
import { getPermissionsSistema } from "../../../utils/permissions";
import { validateForm } from "../../../utils/validationForm";
import { RootState } from "../../app/mainReducer";
import { clienteActions } from "../../cliente/reducer";
import { sistemaActions } from "../reducer";

const UsuarioEdit = () => {
  const { id } = useParams();

  useIsAuth();

  const hoteis = useSelector((state: RootState) => {
    return state.cliente.hoteis.filter(hotel => hotel.ativo).map(hotel => ({
      label: hotel.nome,
      value: hotel.id as string,
    }))
  })
  const usuario = useSelector((state: RootState) => state.sistema.usuario)
  const usuarioLogado = useSelector((state: RootState) => state.login.user)
  const clientes = useSelector((state: RootState) => state.cliente.clientes)
  const error = useSelector((state: RootState) => state.sistema.error)
  const success = useSelector((state: RootState) => state.sistema.success)
  const isLoading = useSelector((state: RootState) => state.sistema.isLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!id) return;

    dispatch(sistemaActions.requestUsuario({ id }))
    dispatch(clienteActions.requestHoteis())
    dispatch(clienteActions.requestClientes())
  }, [dispatch, id])

  return (
    <Wrapper>
      <ListHeader label="Usuário" button_back={true} isLoading={isLoading} />
      <Flex px="1rem" py="1rem" mt="1rem" direction="column">
        <Error error={error} />
        <Success success={success} />
        {usuario && <Formik
          enableReinitialize
          initialValues={usuario}
          onSubmit={(val, { setErrors }) => {
            const validation = validateForm({ nome: 'required', email: 'required', password: 'requiredIfNotId' }, val)
            if (validation) {
              setErrors(validation)
              return;
            }

            if (!val.cliente_id) {
              val.cliente_id = usuarioLogado?.cliente_id as string;
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
                type="email"
              />
              <InputField
                name="celular"
                label="Celular"
                mask="(99)99999-9999"
              />
              <InputField
                name="password"
                label="Nova senha"
                type="password"
              />
              {
                getPermissionsSistema(usuarioLogado?.acessos_sistema) && <SelectField
                  name="cliente_id"
                  label="Cliente"
                >
                  <option value="">Selecione...</option>
                  {clientes && clientes.filter(cliente => cliente.ativo).map(cliente => (
                    <option key={cliente.id} value={cliente.id as string}>{cliente.nome}</option>
                  ))}
                </SelectField>
              }
              <CheckField
                name="ativo"
                label="Usuário ativo?"
                mb={2}
              />
              <ButtonGroup>
                <MultiSelectInputField
                  name="acessos_quais_hoteis"
                  label="Ver quais hotéis?"
                  items={hoteis}
                />
                {
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
                      {
                        label: 'Recepcionista',
                        value: 'Recepcao'
                      },
                    ].filter(i => getPermissionsSistema(usuarioLogado?.acessos_sistema) ? true : i.value !== 'AdminGeral' && i.value !== 'AdminRedeHotel')}
                  />
                }
              </ButtonGroup>

              <Spacer />

              <FooterForm isLoading={isLoading} />
            </Form>
          )}
        </Formik>}
      </Flex>
    </Wrapper>
  )
}

export default UsuarioEdit;