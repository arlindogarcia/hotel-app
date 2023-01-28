import { Flex, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CheckField, InputField } from "../../../components/Inputs";
import { Error, FooterForm, ListHeader, Success, Wrapper } from "../../../components/Layout";
import { useIsAuth } from "../../../hooks/useIsAuth";
import { validateForm } from "../../../utils/validationForm";
import { RootState } from "../../app/mainReducer";
import { SubcategoriaList } from "../components";
import { itemActions } from "../reducer";

const CategoriaEdit = () => {
  const { id } = useParams();

  useIsAuth();

  const categoria = useSelector((state: RootState) => state.item.categoria)
  const error = useSelector((state: RootState) => state.item.error)
  const success = useSelector((state: RootState) => state.item.success)
  const isLoading = useSelector((state: RootState) => state.item.isLoading)
  const usuario = useSelector((state: RootState) => state.login.user);

  const dispatch = useDispatch()

  useEffect(() => {
    if (!id) return;

    dispatch(itemActions.requestCategoria({ id }))
  }, [dispatch, id])

  return (
    <Wrapper>
      <ListHeader label="Categoria" button_back={true} isLoading={isLoading} />
      <Flex  px="1rem" py="1rem" mt="1rem" direction="column">
        <Error error={error} />
        <Success success={success} />
        {categoria && <Formik
          enableReinitialize
          initialValues={categoria}
          onSubmit={(val, { setErrors }) => {
            const validation = validateForm({ nome: 'required' }, val)
            if (validation) {
              setErrors(validation)
              return;
            }

            dispatch(itemActions.requestSaveCategoria({
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
              <CheckField
                name="ativo"
                label="Categoria ativa?"
                mb={2}
              />

              <SubcategoriaList subcategorias={values.subcategorias} />

              <Spacer />

              <FooterForm isLoading={isLoading} />
            </Form>
          )}
        </Formik>}
      </Flex>
    </Wrapper >
  )
}

export default CategoriaEdit;