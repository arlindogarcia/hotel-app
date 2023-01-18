import { Flex, Spacer } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CheckField from "../../../components/CheckField";
import Error from "../../../components/Error";
import { InputField } from "../../../components/InputField";
import ListHeader from "../../../components/ListHeader";
import { LoaderButton } from "../../../components/LoaderButton";
import Success from "../../../components/Success";
import Wrapper from "../../../components/Wrapper"
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
      <Flex bgColor="white" px="1rem" py="1rem" mt="1rem" direction="column">
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

              <LoaderButton
                isLoading={isLoading}
                colorScheme="teal"
                type="submit"
                mt="1rem"
              >
                Salvar
              </LoaderButton>
            </Form>
          )}
        </Formik>}
      </Flex>
    </Wrapper >
  )
}

export default CategoriaEdit;