import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Wrapper from "../../../components/Wrapper"

const PedidoSucesso = () => {
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    console.log(id);
  }, [id]);

  return (
    <Wrapper>

    </Wrapper>
  )
}

export default PedidoSucesso;