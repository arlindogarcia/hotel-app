import { Button, ButtonGroup, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../components/EditButton";
import Error from "../../../components/Error";
import ListHeader from "../../../components/ListHeader";
import ResponsiveTable, { TableHeaders } from "../../../components/ResponsiveTable";
import Wrapper from "../../../components/Wrapper";
import { useIsAuth } from "../../../hooks/useIsAuth";
import { formatDateTime } from "../../../utils/formatDate";
import { APPURL } from "../../app/config";
import { RootState } from "../../app/mainReducer";
import ButtonViewQrCode from "../components/ButtonViewQrCode";
import { sistemaActions } from "../reducer";

const UsuarioTemporarioList = () => {
  useIsAuth();

  const usuarios_temporarios = useSelector((state: RootState) => state.sistema.usuarios_temporarios)
  const error = useSelector((state: RootState) => state.sistema.error)
  const isLoadingList = useSelector((state: RootState) => state.sistema.isLoadingList)

  const [tipoEscopo, setTipoEscopo] = useState("somenteSessaoAtiva")

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(sistemaActions.requestUsuariosTemporarios({ escopo: tipoEscopo }))
  }, [dispatch, tipoEscopo])

  const mostrarApenasAtivas = () => {
    setTipoEscopo('somenteSessaoAtiva')
    dispatch(sistemaActions.requestUsuariosTemporarios({ escopo: tipoEscopo }))
  }

  const mostrarTodas = () => {
    setTipoEscopo('')
    dispatch(sistemaActions.requestUsuariosTemporarios({ escopo: tipoEscopo }))
  }

  const headers: TableHeaders<any>[] = [
    {
      label: "Nome",
      render: (reg) => reg.nome,
    },
    {
      label: "Quarto",
      render: (reg) => reg?.quarto?.nome,
    },
    {
      label: "Hotel",
      render: (reg) => reg?.quarto?.hotel?.nome,
    },
    {
      label: "Plano",
      render: (reg) => reg?.plano?.nome,
    },
    {
      label: "Início sessão",
      wrapped: true,
      render: (reg) => formatDateTime(reg.data_inicio_sessao),
    },
    {
      label: "Fim sessão",
      wrapped: true,
      render: (reg) => formatDateTime(reg.data_fim_sessao),
    },
    {
      label: "Data Criação",
      wrapped: true,
      render: (reg) => formatDateTime(reg.created_at),
    },
    {
      label: "Ações",
      wrapped: true,
      render: (reg) => (
        <ButtonGroup>
          <EditButton href={`/usuarios-temporarios/${reg.id}`} />
          <ButtonViewQrCode link={`${APPURL}/usuarios-temporarios/login/${reg.id}`} />
        </ButtonGroup>
      )
    }
  ]

  return (
    <Wrapper>
      <ListHeader isLoading={isLoadingList} label="Usuários temporários" label_novo="Gerar QRCode de acesso" href_novo="/usuarios-temporarios/novo" />
      {tipoEscopo === 'somenteSessaoAtiva' && <Heading mb="2" size="sm">Mostrando apenas sessões ativas <Button colorScheme="blue" onClick={mostrarTodas}>Mostrar todas</Button></Heading>}
      {tipoEscopo === '' && <Heading mb="2" size="sm">Mostrando todas as sessões <Button colorScheme="blue" onClick={mostrarApenasAtivas}>Mostrar apenas ativas</Button></Heading>}
      <Error error={error} />

      {usuarios_temporarios && (
        <ResponsiveTable headers={headers} data={usuarios_temporarios} />
      )}
    </Wrapper>
  )
}

export default UsuarioTemporarioList;