import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditButton } from "../../../components/Buttons";
import { Error, ListHeader, Wrapper } from "../../../components/Layout";
import { ResponsiveTable, TableHeaders } from "../../../components/Utils";
import { useIsAuth } from "../../../hooks/useIsAuth";
import { formatDateTime } from "../../../utils/formatDate";
import { RootState } from "../../app/mainReducer";
import { itemActions } from "../reducer";

const ItemList = () => {
  useIsAuth();

  const itens = useSelector((state: RootState) => state.item.itens)
  const error = useSelector((state: RootState) => state.item.error)
  const isLoadingList = useSelector((state: RootState) => state.item.isLoadingList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(itemActions.requestItens())
  }, [dispatch])

  const headers: TableHeaders<any>[] = [
    {
      label: "Nome",
      wrapped: true,
      render: (reg) => reg.nome,
    },
    {
      label: "Categoria",
      wrapped: true,
      render: (reg) => reg?.categoria?.nome
    },
    {
      label: "Sub-categoria",
      wrapped: true,
      render: (reg) => reg?.subcategoria?.nome
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
        <EditButton href={`/itens/${reg.id}`} />
      )
    }
  ]

  return (
    <Wrapper>
      <ListHeader isLoading={isLoadingList} label="Itens" label_novo="Novo item" href_novo="/itens/novo" />
      <Error error={error} />

      {itens && (
        <ResponsiveTable headers={headers} data={itens} />
      )}
    </Wrapper>
  )
}

export default ItemList;