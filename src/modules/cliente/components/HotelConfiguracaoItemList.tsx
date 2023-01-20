import { Button, ButtonGroup, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useField } from "formik";
import { useState } from "react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import { useSelector } from "react-redux";
import ConfirmButton from "../../../components/ConfirmButton";
import ResponsiveTable, { TableHeaders } from "../../../components/ResponsiveTable";
import { RootState } from "../../app/mainReducer";
import { novoHotelConfiguracaoItem } from "../data/hotel_configuracao_item";
import { HotelConfiguracaoItem } from "../types/hotel_configuracao_item";
import HotelConfiguracaoItemForm from "./HotelConfiguracaoItemForm";

interface Iprops {
  itens: HotelConfiguracaoItem[];
}

const HotelConfiguracaoItemList = ({ itens }: Iprops) => {
  const headers: TableHeaders<any>[] = [
    {
      label: "Item",
      wrapped: true,
      render: (reg) => reg?.item?.nome,
    },
    {
      label: "Planos",
      wrapped: true,
      render: (reg) => reg.ativo ? 'Sim' : 'Não',
    },
    {
      label: "Tempo entrega",
      wrapped: true,
      render: (reg) => reg.tempo_entrega_estimado,
    },
    {
      label: "Gratuíto?",
      wrapped: true,
      render: (reg) => reg.gratuito ? 'Sim' : 'Não',
    },
    {
      label: "Preço",
      wrapped: true,
      render: (reg) => reg.preco,
    },
    {
      label: "Ações",
      wrapped: true,
      render: (reg) => (
        <ButtonGroup>
          <Button colorScheme="teal" onClick={() => onClickOpenModal(reg)}><FiEdit2 /></Button>
          <ConfirmButton colorScheme="red" onClick={() => onClickDeleteItem(reg)}><FiTrash /></ConfirmButton>
        </ButtonGroup>
      )
    }
  ]

  const [currentItem, setCurrentItem] = useState<HotelConfiguracaoItem | null>(null);
  const [, { value }, { setValue }] = useField('itens');

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onClickOpenModal = (item: HotelConfiguracaoItem | null) => {
    if (!item) {
      setCurrentItem(novoHotelConfiguracaoItem())
      onOpen();
      return;
    }

    setCurrentItem(item);
    onOpen();
  }

  const itensCliente = useSelector((state: RootState) => state.item.itens)

  const onSaveModal = (val: HotelConfiguracaoItem) => {
    const itemIndex = value.findIndex((i: HotelConfiguracaoItem) => i === currentItem);

    const values = JSON.parse(JSON.stringify(value));

    if (itemIndex < 0) {
      values.push({
        ...val,
        item: itensCliente.find((i) => i.id === val.item_id),
      });
      setValue(values)
      setCurrentItem(null)
      onClose();
      return;
    }

    values[itemIndex] = {
      ...val,
      item: itensCliente.find((i) => i.id === val.item_id),
    };
    setValue(values);
    setCurrentItem(null)
    onClose();
  }

  const onClickDeleteItem = (val: HotelConfiguracaoItem) => {
    const itemIndex = value.findIndex((i: HotelConfiguracaoItem) => i === val);

    if (itemIndex < 0) return;

    const values = JSON.parse(JSON.stringify(value));

    values[itemIndex] = {
      ...values[itemIndex],
      deleted: true,
    };

    setValue(values);
  }

  return (
    <>
      <Heading margin="10px 0" size="lg">Itens cardápio <Button onClick={() => onClickOpenModal(null)} colorScheme="teal">Novo</Button></Heading>

      <ResponsiveTable headers={headers} data={itens.filter((i) => !i.deleted)} />

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Item da configuração</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HotelConfiguracaoItemForm onSave={(val) => onSaveModal(val)} onClose={onClose} value={currentItem} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default HotelConfiguracaoItemList;