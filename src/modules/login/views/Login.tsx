import {
  Alert,
  AlertIcon,
  AlertTitle,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoaderButton } from "../../../components/Buttons";
import { InputField } from "../../../components/Inputs";
import { RootState } from "../../app/mainReducer";
import ApplicationLogo from "../components/ApplicationLogo";
import { loginActions } from "../reducer";

const Login: React.FC<{}> = () => {
  const navigate = useNavigate();
  const isLogged = useSelector((state: RootState) => state.login.isLogged);
  const error = useSelector((state: RootState) => state.login.error);
  const isLoggingIn = useSelector(
    (state: RootState) => state.login.isLoggingIn
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  return (
    <Flex maxW="30rem" minH="100vh" margin="auto" direction="column">
      <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
        <div style={{ width: '8em', marginLeft: 'auto', marginRight: 'auto' }}>
          <ApplicationLogo />
        </div>
        {
          error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
          )
        }
        <Flex
          direction="column"
          bgColor="blue.600"
          color="white"
          py="2rem"
          px="1rem"
          marginTop="1rem"
          borderRadius="3px"
        >
          <Heading style={{ marginRight: 'auto', marginLeft: 'auto' }}>Portal do Hotel</Heading>
          <Formik
            initialValues={{ email: "", password: "" }}

            onSubmit={(values, { setErrors }) => {
              let errors = {};

              if (!values.email) {
                errors = {
                  ...errors,
                  email: 'Campo obrigatório'
                }
              }

              if (!values.password) {
                errors = {
                  ...errors,
                  password: 'Campo obrigatório'
                }
              }

              if (Object.keys(errors).length > 0) {
                setErrors(errors);
                return;
              }

              console.log("login form", values);
              dispatch(loginActions.requestLogin(values));
            }}
          >
            <Form>
              <InputField bgNone={true} label="E-mail" name="email" autoFocus type='email' />
              <InputField bgNone={true} label="Senha" name="password" type="password" />
              <LoaderButton
                isLoading={isLoggingIn}
                colorScheme="teal"
                size="lg"
                mt="1rem"
                type="submit"
                style={{ width: '100%' }}
              >
                Entrar
              </LoaderButton>
            </Form>
          </Formik>
        </Flex>
      </div>
    </Flex >
  );
};

export default Login;