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

const HotelQuartoList = () => {
  useIsAuth();

  const hotel_quartos = useSelector((state: RootState) => state.cliente.hotel_quartos)
  const error = useSelector((state: RootState) => state.cliente.error)
  const isLoadingList = useSelector((state: RootState) => state.cliente.isLoadingList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clienteActions.requestHotelQuartos())
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
      label: "Hotel",
      wrapped: true,
      render: (reg) => reg?.hotel?.nome || '',
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
        <EditButton href={`/hoteis-quartos/${reg.id}`} />
      )
    }
  ]

  return (
    <Wrapper>
      <ListHeader isLoading={isLoadingList} label="Quartos dos hoteis" label_novo="Novo quarto" href_novo="/hoteis-quartos/novo" />
      <Error error={error} />

      {hotel_quartos && (
        <ResponsiveTable headers={headers} data={hotel_quartos} />
      )}
    </Wrapper>
  )
}

export default HotelQuartoList;