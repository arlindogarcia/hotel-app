import { Button, Flex, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import CheckField from "../../../components/CheckField";
import { InputField } from "../../../components/InputField";
import { validateForm } from "../../../utils/validationForm";
import { Subcategoria } from "../types/subcategoria";


interface IProps {
  value: Subcategoria | null;
  onClose: () => void;
  onSave: (values: Subcategoria) => void;
}

const SubcategoriaForm = ({ onClose, onSave, value }: IProps) => {
  return (
    <>
      <Flex bgColor="white" px="1rem" pb="1rem" mb="1rem" direction="column">
        {value && <Formik
          enableReinitialize
          initialValues={value}
          onSubmit={(val, { setErrors }) => {
            const validation = validateForm({ nome: 'required' }, val)
            if (validation) {
              setErrors(validation)
              return;
            }

            onSave(val);
          }}
        >
          {({ values }) => (
            <Form>
              <InputField
                autoFocus
                name="nome"
                label="Nome"
              />
              <CheckField
                name="ativo"
                label="Sub-categoria ativa?"
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

export default SubcategoriaForm;