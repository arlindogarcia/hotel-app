import { Button, ButtonGroup, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { useField } from "formik";
import { useState } from "react";
import { FiEdit2, FiTrash } from "react-icons/fi";
import ConfirmButton from "../../../components/ConfirmButton";
import ResponsiveTable, { TableHeaders } from "../../../components/ResponsiveTable";
import { formatDateTime } from "../../../utils/formatDate";
import { novaSubcategoria } from "../data/subcategoria";
import { Subcategoria } from "../types/subcategoria";
import SubcategoriaForm from "./SubcategoriaForm";

interface Iprops {
  subcategorias: Subcategoria[];
}

const SubcategoriaList = ({ subcategorias }: Iprops) => {
  const headers: TableHeaders<any>[] = [
    {
      label: "Nome",
      wrapped: true,
      render: (reg) => reg.nome,
    },
    {
      label: "Ativo?",
      wrapped: true,
      render: (reg) => reg.ativo ? 'Sim' : 'Não',
    },
    {
      label: "Data Criação",
      wrapped: true,
      render: (reg) => formatDateTime(reg.created_at),
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

  const [currentItem, setCurrentItem] = useState<Subcategoria | null>(null);
  const [, { value }, { setValue }] = useField('subcategorias');

  const { isOpen, onOpen, onClose } = useDisclosure()

  const onClickOpenModal = (item: Subcategoria | null) => {
    if (!item) {
      setCurrentItem(novaSubcategoria())
      onOpen();
      return;
    }

    setCurrentItem(item);
    onOpen();
  }

  const onSaveModal = (val: Subcategoria) => {
    const itemIndex = value.findIndex((i: Subcategoria) => i === currentItem);

    const values = JSON.parse(JSON.stringify(value));

    if (itemIndex < 0) {
      values.push(val);
      setValue(values)
      setCurrentItem(null)
      onClose();
      return;
    }

    values[itemIndex] = val;
    setValue(values);
    setCurrentItem(null)
    onClose();
  }

  const onClickDeleteItem = (val: Subcategoria) => {
    const itemIndex = value.findIndex((i: Subcategoria) => i === val);

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
      <Heading margin="10px 0" size="lg">Sub-categorias <Button onClick={() => onClickOpenModal(null)} colorScheme="teal">Nova</Button></Heading>

      <ResponsiveTable headers={headers} data={subcategorias.filter((i) => !i.deleted)} />

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sub-categoria</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SubcategoriaForm onSave={(val) => onSaveModal(val)} onClose={onClose} value={currentItem} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SubcategoriaList;