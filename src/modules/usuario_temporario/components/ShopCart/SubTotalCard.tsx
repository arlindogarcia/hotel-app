import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatMoney } from "../../../../utils/formatMoney";
import { RootState } from "../../../app/mainReducer";

const SubTotalCard = () => {
  const carrinho = useSelector((state: RootState) => state.usuario_temporario.carrinho);

  const getTotal = () => {
    return carrinho.itens.reduce((e, i) => i.gratuito ? e += 0 : e += i.quantidade * i.preco, 0)
  }

  const getTotalItens = () => {
    return carrinho.itens.reduce((e, i) => e += i.quantidade, 0)
  }

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


  return (
    <> {isFixed &&
      <Box height="100px" position={'relative'}>
        <Stack width="full" bg="white" borderRadius="10px" padding={2} my="1"></Stack>
      </Box >}
      <Box
        position={isFixed ? 'fixed' : 'relative'}
        top={isFixed ? '0' : 'auto'}
        zIndex="1"
        width="full"
        paddingRight={isFixed ? 8 : 0}
      >
        <Stack boxShadow="xl" width="full" bg="white" borderRadius="10px" padding={2} my="1">
          <Heading size="md">Subtotal {formatMoney(getTotal())}</Heading>
          <Button colorScheme="green" padding={6}>Finalizar pedido ({getTotalItens()} itens)</Button>
        </Stack>
      </Box>
    </>
  )
}

export default SubTotalCard;