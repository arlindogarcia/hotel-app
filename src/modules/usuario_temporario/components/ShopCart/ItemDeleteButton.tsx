import { Button, ButtonGroup } from "@chakra-ui/button";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { HotelConfiguracaoItem } from "../../../cliente/types/hotel_configuracao_item";
import { usuarioTemporarioActions } from "../../reducer";

const ItemDeleteButton = ({ configuracao_item }: { configuracao_item: HotelConfiguracaoItem }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  const dispatch = useDispatch();
  const confirmDeleteItem = () => {
    dispatch(usuarioTemporarioActions.requestRemoveItemToCart(configuracao_item));
  }

  if (isConfirming) {
    return (
      <ButtonGroup>
        <Button
          ml={2}
          size="sm"
          onClick={(e) => {
            setIsConfirming(false);
            confirmDeleteItem();
          }}
          type="button"
          colorScheme="red"
        >
          Confirmar
        </Button>
        <Button size="sm" type="button" onClick={() => setIsConfirming(false)}>
          Cancelar
        </Button>
      </ButtonGroup>
    );
  }

  return (
    <Button onClick={() => setIsConfirming(true)}
      colorScheme="red"
      size="sm"
      ml={2}
    >
      <FiTrash />
    </Button>
  );
};

export default ItemDeleteButton;
