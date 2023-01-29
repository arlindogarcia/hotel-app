import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditButton } from "../../../components/Buttons";
import { CheckField, InputField } from "../../../components/Inputs";
import { Error, Filtros, ListHeader, Wrapper } from "../../../components/Layout";
import { ResponsiveTable, TableHeaders } from "../../../components/Utils";
import { useIsAuth } from "../../../hooks/useIsAuth";
import { formatDateTime } from "../../../utils/formatDate";
import { RootState } from "../../app/mainReducer";
import { IRequestUsuariosParams, sistemaActions } from "../reducer";

const UsuarioList = () => {
  useIsAuth();

  const usuarios = useSelector((state: RootState) => state.sistema.usuarios)
  const error = useSelector((state: RootState) => state.sistema.error)
  const isLoadingList = useSelector((state: RootState) => state.sistema.isLoadingList)
  const dispatch = useDispatch()

  const headers: TableHeaders<any>[] = [
    {
      label: "Nome",
      wrapped: true,
      render: (reg) => reg.nome,
    },
    {
      label: "Email",
      wrapped: true,
      render: (reg) => reg.email,
    },
    {
      label: "Ativo?",
      wrapped: true,
      render: (reg) => reg.ativo ? 'Sim' : 'Não',
    },
    {
      label: "Data Criação",
      wrapped: true,
      render: (reg) => formatDateTime(reg.created_at),
    },
    {
      label: "Ações",
      wrapped: true,
      render: (reg) => (
        <EditButton href={`/usuarios/${reg.id}`} />
      )
    }
  ]

  const variables = useMemo(() => {
    return {
      initialFilter: {
        ativo: true,
        search: '',
      } as IRequestUsuariosParams,
    }
  }, []);

  useEffect(() => {
    dispatch(sistemaActions.requestUsuarios(variables.initialFilter));
  }, [dispatch, variables.initialFilter])

  const filtrar = (values: IRequestUsuariosParams) => {
    dispatch(sistemaActions.requestUsuarios(values))
  }

  return (
    <Wrapper>
      <ListHeader isLoading={isLoadingList} label="Usuários" label_novo="Novo usuário" href_novo="/usuarios/novo" />
      <Error error={error} />

      <Filtros isLoading={isLoadingList} initialValues={variables.initialFilter} onSubmit={filtrar}>
        <InputField
          name="search"
          label="Filtrar por Nome, E-mail"
        />

        <CheckField
          name="ativo"
          label="Apenas ativos?"
        />
      </Filtros>

      {usuarios && (
        <ResponsiveTable headers={headers} data={usuarios} />
      )}
    </Wrapper>
  )
}

export default UsuarioList;