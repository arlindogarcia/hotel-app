import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../components/EditButton";
import Error from "../../../components/Error";
import ListHeader from "../../../components/ListHeader";
import ResponsiveTable, { TableHeaders } from "../../../components/ResponsiveTable";
import Wrapper from "../../../components/Wrapper";
import { useIsAuth } from "../../../hooks/useIsAuth";
import { formatDateTime } from "../../../utils/formatDate";
import { RootState } from "../../app/mainReducer";
import { sistemaActions } from "../reducer";

const UsuarioList = () => {
  useIsAuth();

  const usuarios = useSelector((state: RootState) => state.sistema.usuarios)
  const error = useSelector((state: RootState) => state.sistema.error)
  const isLoadingList = useSelector((state: RootState) => state.sistema.isLoadingList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(sistemaActions.requestUsuarios())
  }, [dispatch])

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

  return (
    <Wrapper>
      <ListHeader isLoading={isLoadingList} label="Usuários" label_novo="Novo usuário" href_novo="/usuarios/novo" />
      <Error error={error} />

      {usuarios && (
        <ResponsiveTable headers={headers} data={usuarios} />
      )}
    </Wrapper>
  )
}

export default UsuarioList;