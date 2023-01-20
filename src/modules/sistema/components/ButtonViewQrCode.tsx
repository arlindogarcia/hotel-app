import { Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import QRCode from 'qrcode.react';

interface IProps {
  link: string;
}

const ButtonViewQrCode = ({ link }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen} colorScheme="green">Ver QRCode</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>QRCode</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex align='center' justifyContent="center">
              <QRCode value={link} />
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ButtonViewQrCode;