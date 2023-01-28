import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditButton } from "../../../components/Buttons";
import { Error, ListHeader, Wrapper } from "../../../components/Layout";
import { ResponsiveTable, TableHeaders } from "../../../components/Utils";
import { useIsAuth } from "../../../hooks/useIsAuth";
import { formatDateTime } from "../../../utils/formatDate";
import { RootState } from "../../app/mainReducer";
import { clienteActions } from "../reducer";

const ClienteList = () => {
  useIsAuth();

  const clientes = useSelector((state: RootState) => state.cliente.clientes)
  const error = useSelector((state: RootState) => state.cliente.error)
  const isLoadingList = useSelector((state: RootState) => state.cliente.isLoadingList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clienteActions.requestClientes())
  }, [dispatch])

  const headers: TableHeaders<any>[] = [
    {
      label: "Nome",
      wrapped: true,
      render: (reg) => reg.nome,
    },
    {
      label: "Ativo?",
      wrapped: true,
      render: (reg) => reg.ativo ? 'Sim' : 'Não',
    },
    {
      label: "Módulos contratados",
      wrapped: true,
      render: (reg) => reg.modulos_contratados,
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
        <EditButton href={`/clientes/${reg.id}`} />
      )
    }
  ]

  return (
    <Wrapper>
      <ListHeader isLoading={isLoadingList} label="Clientes" label_novo="Novo cliente" href_novo="/clientes/novo" />
      <Error error={error} />

      {clientes && (
        <ResponsiveTable headers={headers} data={clientes} />
      )}
    </Wrapper>
  )
}

export default ClienteList;