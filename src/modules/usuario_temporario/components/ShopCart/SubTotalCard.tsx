import { Box, Button, Heading, Stack, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatMoney } from "../../../../utils/formatMoney";
import { RootState } from "../../../app/mainReducer";
import { usuarioTemporarioActions } from "../../reducer";

const SubTotalCard = () => {
  const carrinho = useSelector((state: RootState) => state.usuario_temporario.carrinho);
  const isLoading = useSelector((state: RootState) => state.usuario_temporario.isLoading);

  const getTotal = () => {
    return carrinho.itens.reduce((e, i) => i.gratuito ? e += 0 : e += i.quantidade * i.preco, 0)
  }

  const getTotalItens = () => {
    return carrinho.itens.reduce((e, i) => e += i.quantidade, 0)
  }

  const bp = useMediaQuery("(max-width: 768px)")[0];

  const [isFixed, setIsFixed] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 150) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const dispatch = useDispatch();
  const onSubmitPedido = () => {
    dispatch(usuarioTemporarioActions.requestEnviarPedido(carrinho));
  }

  return (
    <> {isFixed && bp &&
      <Box height="100px" position={'relative'}>
        <Stack width="full" bg="white" borderRadius="10px" padding={2} my="1"></Stack>
      </Box >}
      <Box
        position={isFixed && bp ? 'fixed' : 'relative'}
        top={isFixed && bp ? '0' : 'auto'}
        zIndex="1"
        width="full"
        paddingRight={isFixed && bp ? 8 : 0}
      >
        <Stack boxShadow="xl" width="full" bg="white" borderRadius="10px" padding={2} my="1">
          <Heading size="md">Subtotal {formatMoney(getTotal())}</Heading>
          <Button isLoading={isLoading} colorScheme="green" padding={6} onClick={onSubmitPedido}>Finalizar pedido ({getTotalItens()} itens)</Button>
        </Stack>
      </Box>
    </>
  )
}

export default SubTotalCard;