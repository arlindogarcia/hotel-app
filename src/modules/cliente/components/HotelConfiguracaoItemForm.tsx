import { Button, Flex, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import CheckField from "../../../components/CheckField";
import { InputField } from "../../../components/InputField";
import InputNumber from "../../../components/InputNumber";
import { MultiSelectInputField } from "../../../components/MultiSelectInputField";
import SelectField from "../../../components/SelectField";
import { validateForm } from "../../../utils/validationForm";
import { RootState } from "../../app/mainReducer";
import { Item } from "../../item/types/item";
import { HotelConfiguracaoItem } from "../types/hotel_configuracao_item";


interface IProps {
  value: HotelConfiguracaoItem | null;
  onClose: () => void;
  onSave: (values: HotelConfiguracaoItem) => void;
  items: HotelConfiguracaoItem[];
}

const HotelConfiguracaoItemForm = ({ onClose, onSave, value, items }: IProps) => {
  const planos = useSelector((state: RootState) => {
    return state.cliente.planos.map(hotel => ({
      label: hotel.nome,
      value: hotel.id as string,
    }))
  })

  const itens = useSelector((state: RootState) => state.item.itens);

  const itensFormatados = () => {
    const retorno: Item[] = [];

    if (!itens) return [];

    itens.forEach((i) => {
      if (!items.find((j) => j.item_id === i.id)) retorno.push(i);
    })

    return retorno;
  }

  return (
    <>
      <Flex bgColor="white" px="1rem" pb="1rem" mb="1rem" direction="column">
        {value && <Formik
          enableReinitialize
          initialValues={value}
          onSubmit={(val, { setErrors }) => {
            const validation = validateForm({ cliente_plano_ids: 'required', item_id: 'required' }, val)
            if (validation) {
              setErrors(validation)
              return;
            }

            onSave(val);
          }}
        >
          {({ values }) => (
            <Form>
              <MultiSelectInputField
                name="cliente_plano_ids"
                label="Planos que verão este item"
                items={planos}
              />
              <InputNumber
                name="preco"
                label="Preço"
              />
              <CheckField
                name="gratuito"
                label="Gratuíto?"
              />
              <InputField
                type="number"
                name="tempo_entrega_estimado"
                label="Tempo de entrega estimado no quarto (minutos)"
              />
              <SelectField
                name="item_id"
                label="Item"
              >
                <option value="">Selecione...</option>
                {itensFormatados().map(i => (
                  <option key={i.id} value={i.id as string}>{i.nome}</option>
                ))}
              </SelectField>


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

export default HotelConfiguracaoItemForm;