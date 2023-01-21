import { Box, CircularProgress, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../../components/Error";
import { RootState } from "../../app/mainReducer";
import { sistemaActions } from "../reducer";

const UsuarioTemporarioLogin = () => {
  const { id } = useParams();

  const isLogged = useSelector((state: RootState) => state.login.isLogged);
  const error = useSelector((state: RootState) => state.sistema.error)
  const isLoading = useSelector((state: RootState) => state.sistema.isLoading)

  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    dispatch(sistemaActions.requestUsuarioTemporarioLogin({ id }))
  }, [dispatch, id])

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Flex px="1rem" py="1rem" mt="1rem" direction="column" justifyContent="center" align="center">
          <Heading>Bem vindo!</Heading>
          <Heading my="10" size="sm">Você está sendo redirecionado...</Heading>
          {isLoading && <CircularProgress mx="auto" isIndeterminate color="blue.600" />}
          <Error error={error} />
        </Flex>
      </Box>
    </Box>
  )
}

export default UsuarioTemporarioLogin;