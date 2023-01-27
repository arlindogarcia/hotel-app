import {
  Button,
  Flex,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Error from "../../../components/Error";
import Info from "../../../components/Info";
import Wrapper from "../../../components/Wrapper";
import { useIsAuth } from "../../../hooks/useIsAuth";
import { RootState } from "../../app/mainReducer";
import { Item, SubTotalCard } from "../components/ShopCart";

const ShopCart = () => {
  const carrinho = useSelector((state: RootState) => state.pedido.carrinho);
  const error = useSelector((state: RootState) => state.pedido.error);
  const bp = useMediaQuery("(max-width: 768px)")[0];
  const navigate = useNavigate();
  const pedido_id_salvo = useSelector((state: RootState) => state.pedido.pedido_id_salvo);
  const redireciona_para_pagina_sucesso = useSelector((state: RootState) => state.pedido.redireciona_para_pagina_sucesso);

  useIsAuth();

  useEffect(() => {
    if (redireciona_para_pagina_sucesso && pedido_id_salvo) {
      navigate(`/pedido-sucesso/${pedido_id_salvo}`)
    }
  }, [redireciona_para_pagina_sucesso, pedido_id_salvo, navigate]);

  return (
    <Wrapper>
      <Heading size="2xl" paddingBottom={2} marginBottom={2}>
        Carrinho
      </Heading>

      <Error error={error} />

      {bp && carrinho && carrinho.itens.length > 0 &&
        <Flex wrap="wrap" width="full">
          <SubTotalCard />

          {carrinho.itens.map(configuracao_item => (
            <Item key={configuracao_item.id} configuracao_item={configuracao_item} />
          ))}
        </Flex>}
      {!bp && carrinho && carrinho.itens.length > 0 &&
        <Flex wrap="wrap" width="full">
          <div style={{ width: '70%' }}>
            {carrinho.itens.map(configuracao_item => (
              <Item key={configuracao_item.id} configuracao_item={configuracao_item} />
            ))}
          </div>
          <div style={{ width: '30%', paddingLeft: '10px' }}>
            <SubTotalCard />
          </div>
        </Flex>}

      {carrinho && carrinho.itens.length === 0 &&
        <>
          <Info info="Carrinho vazio!" />
          <Button width="full" colorScheme="green" padding={6} onClick={() => navigate('/produtos')} mt={2}>Ver produtos</Button>
        </>
      }
    </Wrapper>
  );
}

export default ShopCart;