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
import { clienteActions } from "../reducer";

const HotelList = () => {
  useIsAuth();

  const hoteis = useSelector((state: RootState) => state.cliente.hoteis)
  const error = useSelector((state: RootState) => state.cliente.error)
  const isLoadingList = useSelector((state: RootState) => state.cliente.isLoadingList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clienteActions.requestHoteis())
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
      label: "Cliente",
      wrapped: true,
      render: (reg) => reg?.cliente?.nome || '',
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
        <EditButton href={`/hoteis/${reg.id}`} />
      )
    }
  ]

  return (
    <Wrapper>
      <ListHeader isLoading={isLoadingList} label="Hoteis" label_novo="Novo hotel" href_novo="/hoteis/novo" />
      <Error error={error} />

      {hoteis && (
        <ResponsiveTable headers={headers} data={hoteis} />
      )}
    </Wrapper>
  )
}

export default HotelList;