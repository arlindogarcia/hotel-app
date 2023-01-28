import { Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spacer, useDisclosure } from "@chakra-ui/react";
import { useField } from "formik";
import { LOCAL_STORAGE_URL } from "../../modules/app/config";

interface IProps {
  label: string;
  name: string;
}

interface Event<T = EventTarget> {
  target: T;
}

const InputImage = ({ label, ...props }: IProps) => {
  const [, { error, touched, value }, { setValue }] = useField(props);

  const open = () => {
    document.getElementById('image-field')?.click();
  }

  const ajustImage = (event: Event<HTMLInputElement>) => {
    let fileList = event.target.files;
    if (!fileList?.length) {
      return;
    }
    let file = fileList[0];

    let maxWidth = 900;
    let maxHeight = 900;

    let reader = new FileReader();
    reader.onloadend = () => {
      const imagePreview = reader.result;
      let wrap = document.createElement("div");
      let resizeArea = document.createElement("canvas");
      wrap.appendChild(resizeArea);
      wrap.id = "wrap-imageupload-resize-area";
      wrap.style.position = "relative";
      wrap.style.overflow = "hidden";
      wrap.style.width = "0";
      wrap.style.height = "0";
      resizeArea.id = "imageupload-resize-area";
      resizeArea.style.position = "absolute";
      document.body.appendChild(wrap);

      let oImg = document.createElement("img");
      oImg.id = "img-resize";
      oImg.src = imagePreview as string;

      oImg.onload = () => {
        let resizeMaxWidth = maxWidth * 1.6;
        let resizeMaxHeight = maxHeight * 1.6;

        let height = oImg.height;
        let width = oImg.width;

        if (width > resizeMaxWidth) {
          height = Math.round((height * resizeMaxWidth) / width);
          width = resizeMaxWidth;
        }

        if (height > resizeMaxHeight) {
          width = Math.round((width * resizeMaxHeight) / height);
          height = resizeMaxHeight;
        }

        resizeArea.width = width;
        resizeArea.height = height;

        const ctx = resizeArea.getContext("2d");
        ctx?.drawImage(oImg, 0, 0, width, height);

        setValue(resizeArea.toDataURL("image/jpeg", 0.95));
      };
    };
    reader.readAsDataURL(file);
  };


  const getLinkImagem = (imagem: string) => {
    if (!imagem) return '';

    if (imagem.slice(0, 4) === 'data') {
      return imagem;
    }

    return LOCAL_STORAGE_URL + '/' + imagem;
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <FormControl isInvalid={touched && error ? true : false}>
        <FormLabel>{label}</FormLabel>
        <ButtonGroup>
          <Button borderWidth={error && '2px'} borderColor="red" colorScheme="green" onClick={open}>Selecionar nova imagem</Button>
          {value && <Button colorScheme="teal" onClick={onOpen}>Pré visualizar</Button>}
          <input type="file" onChange={ajustImage} style={{ display: 'none' }} id="image-field" />
        </ButtonGroup>
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Pré visualização da imagem</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={getLinkImagem(value)} alt='imagem' />
            <Spacer marginY={5} />
            <Button colorScheme="teal" onClick={onClose}>Fechar</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default InputImage;