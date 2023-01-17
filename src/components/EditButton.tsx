import { Button } from "@chakra-ui/react"
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

interface IProps {
  label?: string;
  href?: string;
}

const EditButton = ({ label = 'Editar', href = "" }: IProps) => {
  const navigate = useNavigate();

  return (
    <Button colorScheme="teal" onClick={() => href && navigate(href)} leftIcon={<FiEdit2 />}>{label}</Button>
  )
}

export default EditButton;