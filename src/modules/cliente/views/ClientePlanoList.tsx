import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditButton } from "../../../components/Buttons";
import { Error, ListHeader, Wrapper } from "../../../components/Layout";
import { ResponsiveTable, TableHeaders } from "../../../components/Utils";
import { useIsAuth } from "../../../hooks/useIsAuth";
import { formatDateTime } from "../../../utils/formatDate";
import { RootState } from "../../app/mainReducer";
import { clienteActions } from "../reducer";

const ClientePlanoList = () => {
  useIsAuth();

  const planos = useSelector((state: RootState) => state.cliente.planos)
  const error = useSelector((state: RootState) => state.cliente.error)
  const isLoadingList = useSelector((state: RootState) => state.cliente.isLoadingList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clienteActions.requestPlanos())
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
      label: "Data Criação",
      wrapped: true,
      render: (reg) => formatDateTime(reg.created_at),
    },
    {
      label: "Ações",
      wrapped: true,
      render: (reg) => (
        <EditButton href={`/planos/${reg.id}`} />
      )
    }
  ]

  return (
    <Wrapper>
      <ListHeader isLoading={isLoadingList} label="Planos" label_novo="Novo plano" href_novo="/planos/novo" />
      <Error error={error} />

      {planos && (
        <ResponsiveTable headers={headers} data={planos} />
      )}
    </Wrapper>
  )
}

export default ClientePlanoList;