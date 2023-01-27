import { ButtonGroup } from "@chakra-ui/react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckField from "../../../components/CheckField";
import ConfirmButton from "../../../components/ConfirmButton";
import EditButton from "../../../components/EditButton";
import Error from "../../../components/Error";
import { Filtros } from "../../../components/Filtros";
import ListHeader from "../../../components/ListHeader";
import ResponsiveTable, { TableHeaders } from "../../../components/ResponsiveTable";
import SelectField from "../../../components/SelectField";
import Wrapper from "../../../components/Wrapper";
import { useIsAuth } from "../../../hooks/useIsAuth";
import { formatDateTime } from "../../../utils/formatDate";
import { formatMoney } from "../../../utils/formatMoney";
import { RootState } from "../../app/mainReducer";
import { getStatusPedido } from "../arrays/status_pedido";
import { pedidoActions } from "../reducer";
import { Pedido } from "../types/Pedido";

const PedidoList = () => {
  useIsAuth();

  const pedidos = useSelector((state: RootState) => state.pedido.pedidos)
  const error = useSelector((state: RootState) => state.pedido.error)
  const isLoading = useSelector((state: RootState) => state.pedido.isLoading)

  const variables = useMemo(() => {
    return {
      initialFilter: {
        status: '',
        apenas_nao_entregues: true,
      },
    }
  }, []);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(pedidoActions.requestPedidos(variables.initialFilter))
  }, [dispatch, variables.initialFilter])

  const setPedidoEntregue = (pedido: Pedido) => {
    dispatch(pedidoActions.requestSavePedido({
      ...pedido,
      status: 3,
    }));

    setTimeout(() => {
      dispatch(pedidoActions.requestPedidos(variables.initialFilter))
    }, 200);
  }

  const headers: TableHeaders<any>[] = [
    {
      label: "Data Criação",
      wrapped: true,
      render: (reg) => formatDateTime(reg.created_at),
    },
    {
      label: "Status",
      wrapped: true,
      render: (reg) => getStatusPedido(reg.status) as string,
    },
    {
      label: "Quarto",
      wrapped: true,
      render: (reg) => reg?.quarto?.nome,
    },
    {
      label: "Pessoa",
      wrapped: false,
      render: (reg) => reg?.usuario_temporario?.nome,
    },
    {
      label: "Valor",
      wrapped: true,
      render: (reg) => formatMoney(reg.valor_total),
    },
    {
      label: "Ações",
      wrapped: true,
      render: (reg) => (
        <ButtonGroup>
          <EditButton href={`/pedidos/${reg.id}`} />
          <ConfirmButton onClick={() => setPedidoEntregue(reg)}>Entregue?</ConfirmButton>
        </ButtonGroup>
      )
    }
  ]

  const filtrar = (values: Record<string, string | number | boolean>) => {
    dispatch(pedidoActions.requestPedidos(values))
  }

  return (
    <Wrapper>
      <ListHeader isLoading={isLoading} label="Pedidos" />
      <Error error={error} />
      <Filtros isLoading={isLoading} initialValues={variables.initialFilter} onSubmit={filtrar}>
        <SelectField
          name="status"
          label="Status"
        >
          <option value="">Selecione...</option>
          {(getStatusPedido(null) as any).map((i: any) => (
            <option key={i.value} value={i.value}>{i.label}</option>
          ))}
        </SelectField>

        <CheckField
          name="apenas_nao_entregues"
          label="Apenas pedidos não entregues"
        />
      </Filtros>

      {pedidos && (
        <ResponsiveTable headers={headers} data={pedidos} />
      )}
    </Wrapper>
  )
}

export default PedidoList;