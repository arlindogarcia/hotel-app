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
import { itemActions } from "../reducer";

const CategoriaList = () => {
  useIsAuth();

  const categorias = useSelector((state: RootState) => state.item.categorias)
  const error = useSelector((state: RootState) => state.item.error)
  const isLoadingList = useSelector((state: RootState) => state.item.isLoadingList)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(itemActions.requestCategorias())
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
        <EditButton href={`/categorias/${reg.id}`} />
      )
    }
  ]

  return (
    <Wrapper>
      <ListHeader isLoading={isLoadingList} label="Categorias" label_novo="Nova categoria" href_novo="/categorias/novo" />
      <Error error={error} />

      {categorias && (
        <ResponsiveTable headers={headers} data={categorias} />
      )}
    </Wrapper>
  )
}

export default CategoriaList;