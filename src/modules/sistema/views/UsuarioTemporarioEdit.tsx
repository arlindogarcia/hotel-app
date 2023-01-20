import { Flex, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import FooterForm from "../../../components/FooterForm";
import { InputField } from "../../../components/InputField";
import ListHeader from "../../../components/ListHeader";
import SelectField from "../../../components/SelectField";
import Success from "../../../components/Success";
import Wrapper from "../../../components/Wrapper"
import { useIsAuth } from "../../../hooks/useIsAuth";
import { validateForm } from "../../../utils/validationForm";
import { RootState } from "../../app/mainReducer";
import { clienteActions } from "../../cliente/reducer";
import ButtonViewQrCode from "../components/ButtonViewQrCode";
import { sistemaActions } from "../reducer";

const UsuarioTemporarioEdit = () => {
  const { id } = useParams();

  useIsAuth();

  const usuario_temporario = useSelector((state: RootState) => state.sistema.usuario_temporario)
  const usuarioLogado = useSelector((state: RootState) => state.login.user)
  const planos = useSelector((state: RootState) => state.cliente.planos)
  const quartos = useSelector((state: RootState) => state.cliente.hotel_quartos)
  const error = useSelector((state: RootState) => state.sistema.error)
  const success = useSelector((state: RootState) => state.sistema.success)
  const isLoading = useSelector((state: RootState) => state.sistema.isLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!id) return;

    dispatch(sistemaActions.requestUsuarioTemporario({ id }))
    dispatch(clienteActions.requestHotelQuartos())
    dispatch(clienteActions.requestPlanos())
  }, [dispatch, id])

  return (
    <Wrapper>
      <ListHeader label="Usuário temporário - Gerar acesso" button_back={true} isLoading={isLoading} />
      <Flex px="1rem" py="1rem" mt="1rem" direction="column">
        <Error error={error} />
        <Success success={success} />
        {usuario_temporario && <Formik
          enableReinitialize
          initialValues={usuario_temporario}
          onSubmit={(val, { setErrors }) => {
            const validation = validateForm({
              nome: 'required',
              hotel_cliente_quarto_id: 'required',
              cliente_plano_usuario_id: 'required',
              data_inicio_sessao: 'required',
              data_fim_sessao: 'required'
            }, val)
            if (validation) {
              setErrors(validation)
              return;
            }

            if (!val.cliente_id) {
              val.cliente_id = usuarioLogado?.cliente_id as string;
            }

            dispatch(sistemaActions.requestSaveUsuarioTemporario(val));
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
                name="hotel_cliente_quarto_id"
                label="Quarto"
              >
                <option value="">Selecione...</option>
                {quartos && quartos.filter(quarto => quarto.ativo).map(quarto => (
                  <option key={quarto.id} value={quarto.id as string}>{quarto.nome}</option>
                ))}
              </SelectField>
              <SelectField
                name="cliente_plano_usuario_id"
                label="Plano"
              >
                <option value="">Selecione...</option>
                {planos && planos.filter(plano => plano.ativo).map(plano => (
                  <option key={plano.id} value={plano.id as string}>{plano.nome}</option>
                ))}
              </SelectField>
              <InputField
                type="datetime-local"
                name="data_inicio_sessao"
                label="Data/Hora de início da hospedagem"
              />
              <InputField
                type="datetime-local"
                name="data_fim_sessao"
                label="Data/Hora final da hospedagem"
              />

              <Spacer my='2' />
              {values.id && <ButtonViewQrCode link={values.id} />}


              <FooterForm isLoading={isLoading} />
            </Form>
          )}
        </Formik>}
      </Flex>
    </Wrapper>
  )
}

export default UsuarioTemporarioEdit;