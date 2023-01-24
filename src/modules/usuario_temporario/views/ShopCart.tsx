import {
  Flex,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Wrapper from "../../../components/Wrapper";
import { useIsAuth } from "../../../hooks/useIsAuth";
import { RootState } from "../../app/mainReducer";
import { Item, SubTotalCard } from "../components/ShopCart";

const ShopCart = () => {
  const carrinho = useSelector((state: RootState) => state.usuario_temporario.carrinho);
  const bp = useMediaQuery("(max-width: 768px)")[0];
  useIsAuth();

  return (
    <Wrapper>
      <Heading size="2xl" paddingBottom={2} marginBottom={2}>
        Carrinho
      </Heading>

      {bp &&
        <Flex wrap="wrap" width="full">
          <SubTotalCard />

          {carrinho.itens.map(configuracao_item => (
            <Item key={configuracao_item.id} configuracao_item={configuracao_item} />
          ))}
        </Flex>}
      {!bp &&
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
    </Wrapper>
  );
}

export default ShopCart;