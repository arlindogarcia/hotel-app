import { Flex, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Error from "../../../components/Error";
import FooterForm from "../../../components/FooterForm";
import { InputEditor } from "../../../components/InputEditor";
import { InputField } from "../../../components/InputField";
import ListHeader from "../../../components/ListHeader";
import SelectField from "../../../components/SelectField";
import Success from "../../../components/Success";
import Wrapper from "../../../components/Wrapper"
import { useIsAuth } from "../../../hooks/useIsAuth";
import { validateForm } from "../../../utils/validationForm";
import { RootState } from "../../app/mainReducer";
import { ItemImagemList } from "../components";
import { itemActions } from "../reducer";

const ItemEdit = () => {
  const { id } = useParams();

  useIsAuth();

  const item = useSelector((state: RootState) => state.item.item);
  const categorias = useSelector((state: RootState) => state.item.categorias);
  const error = useSelector((state: RootState) => state.item.error);
  const success = useSelector((state: RootState) => state.item.success);
  const isLoading = useSelector((state: RootState) => state.item.isLoading);
  const usuario = useSelector((state: RootState) => state.login.user);

  const dispatch = useDispatch()

  useEffect(() => {
    if (!id) return;

    dispatch(itemActions.requestItem({ id }))
    dispatch(itemActions.requestCategorias())

  }, [dispatch, id])

  const getSubcategorias = (categoria_id: string | undefined) => {
    if (!categoria_id) return [];

    return categorias.find((i) => i.id === categoria_id)?.subcategorias || [];
  }

  return (
    <Wrapper>
      <ListHeader label="Item" button_back={true} isLoading={isLoading} />
      <Flex px="1rem" py="1rem" mt="1rem" direction="column">
        <Error error={error} />
        <Success success={success} />
        {item && <Formik
          enableReinitialize
          initialValues={item}
          onSubmit={(val, { setErrors }) => {
            const validation = validateForm({
              nome: 'required',
              categoria_id: 'required',
              subcategoria_id: 'required',
              descricao_html: 'required',
            }, val)
            if (validation) {
              setErrors(validation)
              return;
            }

            dispatch(itemActions.requestSaveItem({
              ...val,
              cliente_id: usuario?.cliente_id as string,
            }));
          }}
        >
          {({ values }) => (
            <Form>
              <InputField
                autoFocus
                name="nome"
                label="Nome"
              />

              <SelectField
                name="categoria_id"
                label="Categoria"
              >
                <option value="">Selecione...</option>
                {categorias && categorias.map(i => (
                  <option key={i.id} value={i.id as string}>{i.nome}</option>
                ))}
              </SelectField>

              <SelectField
                name="subcategoria_id"
                label="Sub-categoria"
              >
                {values.categoria_id && <option value="">Selecione...</option>}
                {!values.categoria_id && <option value="">Seleciona a categoria...</option>}
                {getSubcategorias(values.categoria_id).map(i => (
                  <option key={i.id} value={i.id as string}>{i.nome}</option>
                ))}
              </SelectField>

              <InputEditor
                name="descricao_html"
                label="Descrição detalhada"
              />

              <ItemImagemList imagens={values.imagens} imagem_principal={values.imagem_principal} />

              <Spacer />

              <FooterForm isLoading={isLoading} />
            </Form>
          )}
        </Formik>}
      </Flex>
    </Wrapper >
  )
}

export default ItemEdit;