import { Button, Flex, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import CheckField from "../../../components/CheckField";
import InputImage from "../../../components/InputImage";
import { validateForm } from "../../../utils/validationForm";
import { ItemImagem } from "../types/item_imagem";

interface IProps {
  value: ItemImagem | null;
  onClose: () => void;
  onSave: (values: ItemImagem) => void;
}

const ItemImagemForm = ({ onClose, onSave, value }: IProps) => {
  return (
    <>
      <Flex bgColor="white" px="1rem" pb="1rem" mb="1rem" direction="column">
        {value && <Formik
          enableReinitialize
          initialValues={value}
          onSubmit={(val, { setErrors }) => {
            const validation = validateForm({ imagem: 'required' }, val)
            if (validation) {
              setErrors(validation)
              return;
            }

            onSave(val);
          }}
        >
          {({ values }) => (
            <Form>
              <InputImage label="Imagem" name="imagem" />
              <CheckField
                name="principal"
                label="Imagem principal?"
                mb={2}
              />

              <Spacer my="2rem" />

              <Button type="submit" colorScheme='blue' mr={3}>
                Salvar
              </Button>
              <Button onClick={() => typeof onClose == "function" && onClose()}>Cancelar</Button>
            </Form>
          )}
        </Formik>}
      </Flex>
    </>
  )
}

export default ItemImagemForm;