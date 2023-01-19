import { Button, ButtonGroup, Heading, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useField } from "formik";
import { useState } from "react";
import { FiTrash } from "react-icons/fi";
import ConfirmButton from "../../../components/ConfirmButton";
import ResponsiveTable, { TableHeaders } from "../../../components/ResponsiveTable";
import { novoItemImagem } from "../data/item_imagem";
import { ItemImagem } from "../types/item_imagem";
import ItemImagemForm from "./ItemImagemForm";

interface Iprops {
  imagens: ItemImagem[];
  imagem_principal: string;
}

const ItemImagemList = ({ imagens, imagem_principal }: Iprops) => {
  const [currentItem, setCurrentItem] = useState<ItemImagem | null>(null);
  const [, { value }, { setValue }] = useField('imagens');
  const [, { value: valueImagemPrincipal }, { setValue: setValueImagemPrincipal }] = useField('imagem_principal');

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onClickOpenModal = () => {
    setCurrentItem(novoItemImagem())
    onOpen();
    return;
  }

  const onSaveModal = (val: ItemImagem) => {
    const values = JSON.parse(JSON.stringify(value));

    if (val?.principal) {
      setValueImagemPrincipal(val.imagem);
      setCurrentItem(null)
      onClose();
      return;
    }

    values.push(val);
    setValue(values)
    setCurrentItem(null)
    onClose();
  }

  const onClickDeleteItem = (val: ItemImagem) => {
    const itemIndex = value.findIndex((i: ItemImagem) => i === val);

    if (itemIndex < 0) return;

    const values = JSON.parse(JSON.stringify(value));

    values[itemIndex] = {
      ...values[itemIndex],
      deleted: true,
    };

    setValue(values);
  }

  const headers: TableHeaders<any>[] = [
    {
      label: "Imagem principal?",
      wrapped: true,
      render: (reg) => reg.principal ? 'Sim' : 'Não',
    },
    {
      label: "Pré visualização",
      wrapped: true,
      render: (reg) => reg.principal ? <Image height="150px" src={valueImagemPrincipal} alt='Imagem principal' /> : <Image height="150px" src={reg.imagem} alt='Imagem' />,
    },
    {
      label: "Ações",
      wrapped: true,
      render: (reg) => (
        <ButtonGroup>
          <ConfirmButton colorScheme="red" onClick={() => reg.principal ? setValueImagemPrincipal('') : onClickDeleteItem(reg)}><FiTrash /></ConfirmButton>
        </ButtonGroup>
      )
    }
  ]

  const getDataList = () => {
    if (valueImagemPrincipal) {
      const img = imagens.filter((i) => !i.deleted);
      const novoItem = novoItemImagem();

      return [
        {
          ...novoItem,
          imagem: valueImagemPrincipal,
          principal: true,
        },
        ...img,
      ]
    }

    return imagens.filter((i) => !i.deleted);
  }

  return (
    <>
      <Heading margin="10px 0" size="lg">Imagens <Button onClick={onClickOpenModal} colorScheme="teal">Nova</Button></Heading>

      <ResponsiveTable headers={headers} data={getDataList()} />

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nova imagem</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ItemImagemForm onSave={(val) => onSaveModal(val)} onClose={onClose} value={currentItem} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ItemImagemList;