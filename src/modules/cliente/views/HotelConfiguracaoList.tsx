import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditButton } from "../../../components/Buttons";
import { Error, ListHeader, Wrapper } from "../../../components/Layout";
import { ResponsiveTable, TableHeaders } from "../../../components/Utils";
import { useIsAuth } from "../../../hooks/useIsAuth";
import { formatDateTime } from "../../../utils/formatDate";
import { RootState } from "../../app/mainReducer";
import { clienteActions } from "../reducer";

const HotelConfiguracaoList = () => {
  useIsAuth();

  const hoteis_configuracoes = useSelector((state: RootState) => state.cliente.hotel_configuracoes)
  const error = useSelector((state: RootState) => state.cliente.error)
  const isLoadingList = useSelector((state: RootState) => state.cliente.isLoadingList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(clienteActions.requestHotelConfiguracoes())
  }, [dispatch])

  const headers: TableHeaders<any>[] = [
    {
      label: "Hoteis",
      wrapped: true,
      render: (reg) => reg.hoteis,
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
        <EditButton href={`/hoteis-configuracoes/${reg.id}`} />
      )
    }
  ]

  return (
    <Wrapper>
      <ListHeader isLoading={isLoadingList} label="Configurações dos hotéis" label_novo="Nova configuração" href_novo="/hoteis-configuracoes/novo" />
      <Error error={error} />

      {hoteis_configuracoes && (
        <ResponsiveTable headers={headers} data={hoteis_configuracoes} />
      )}
    </Wrapper>
  )
}

export default HotelConfiguracaoList;