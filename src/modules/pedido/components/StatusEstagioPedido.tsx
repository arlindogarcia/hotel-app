import { Flex, Text } from "@chakra-ui/react";
import { FiCheck, FiHome, FiLoader, FiSend } from "react-icons/fi";
import Info from "../../../components/Info";

interface IProps {
  status: number;
  mostraBarraInfo?: boolean;
}

const StatusEstagioPedido = ({ status, mostraBarraInfo = true }: IProps) => {

  const stages = [
    { icon: "check", label: "Recebido" },
    { icon: "loader", label: "Em preparação" },
    { icon: "send", label: "Enviado" },
    { icon: "home", label: "Entregue" },
  ];

  const getIcon = (nome: string, color: string) => {
    if (nome === 'check') {
      return <FiCheck size="1.4rem" color={color} />
    }

    if (nome === 'loader') {
      return <FiLoader size="1.4rem" color={color} />
    }

    if (nome === 'send') {
      return <FiSend size="1.4rem" color={color} />
    }

    return <FiHome size="1.4rem" color={color} />
  }

  const getStatusDescricao = () => {
    switch (status) {
      case 0:
        return 'O pedido foi recebido pelo Hotel.';
      case 1:
        return 'O pedido está em preparação.';
      case 2:
        return 'O pedido foi enviado para seu quarto.';
    }

    return '';
  }

  return (
    <Flex alignItems="center" justifyContent="space-between" wrap="wrap" maxW="600px">
      {stages.map((stage, index) => (
        <Flex
          key={stage.label}
          alignItems="center"
          mx={2}
          position="relative"
        >
          <Flex direction="column" alignItems="center">
            {getIcon(stage.icon, index <= status ? "green" : "gray")}
            <Text fontSize="sm" fontWeight={index <= status ? "bold" : "normal"} color={index <= status ? "green" : "gray"}>
              {stage.label}
            </Text>
          </Flex>
        </Flex>
      ))}

      {status <= 2 && mostraBarraInfo &&
        <Info info={getStatusDescricao()} isLoading={true} />
      }

    </Flex>

  )
}

export default StatusEstagioPedido;