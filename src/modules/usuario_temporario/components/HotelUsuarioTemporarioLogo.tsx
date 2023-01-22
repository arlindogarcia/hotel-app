import { Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { LOCAL_STORAGE_URL } from "../../app/config";
import { RootState } from "../../app/mainReducer";

const HotelUsuarioTemporarioLogo = () => {
  const configuracao = useSelector((state: RootState) => state.usuario_temporario.configuracao);

  const getLinkImage = (id: string) => {
    return LOCAL_STORAGE_URL + '/' + id;
  }

  return (
    <>
      {configuracao && configuracao.imagem_logo && <Image height="50px" src={getLinkImage(configuracao.imagem_logo)} alt='Logo' />}
    </>
  )
}

export default HotelUsuarioTemporarioLogo;