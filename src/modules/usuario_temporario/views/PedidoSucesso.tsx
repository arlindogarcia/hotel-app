import { Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Wrapper from "../../../components/Wrapper"
import { useIsAuth } from "../../../hooks/useIsAuth";
import { RootState } from "../../app/mainReducer";
import ResumoItensPedido from "../components/ResumoItensPedido";
import StatusEstagioPedido from "../components/StatusEstagioPedido";
import { usuarioTemporarioActions } from "../reducer";

const PedidoSucesso = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pedido = useSelector((state: RootState) => state.usuario_temporario.pedido);
  useIsAuth();

  useEffect(() => {
    if (!id) return;

    dispatch(usuarioTemporarioActions.requestNaoRedirecionaPraPaginadeSucesso());

    dispatch(usuarioTemporarioActions.requestPedido({ id }))
  }, [id, dispatch]);


  return (
    <Wrapper>
      <Heading size="2xl" paddingBottom={2} marginBottom={2}>
        Pedido realizado!
      </Heading>

      {pedido &&
        <StatusEstagioPedido status={pedido.status} />
      }

      <Heading size="xl" paddingBottom={2} marginY={2}>
        Produtos
      </Heading>

      {pedido &&
        <ResumoItensPedido pedido={pedido} />
      }
    </Wrapper>
  )
}

export default PedidoSucesso;