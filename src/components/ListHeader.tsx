import { Button, CircularProgress, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface IProps {
  label: string;
  isLoading?: boolean;
  label_novo?: string;
  href_novo?: string;
  button_back?: boolean;
}

const ListHeader = ({ label, isLoading, label_novo, href_novo, button_back }: IProps) => {
  const navigate = useNavigate();

  return (
    <Heading borderBottom="1px" borderColor="gray.400" size="lg">{label}
      {label_novo && href_novo &&
        <span>
          &nbsp;
          <Button
            colorScheme="teal"
            my="0.5rem"
            onClick={() => navigate(href_novo)}
          >
            {label_novo}
          </Button>
        </span>
      }
      {button_back &&
        <span>
          &nbsp;
          <Button
            colorScheme="teal"
            my="0.5rem"
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>
        </span>
      }
      {isLoading && <span>&nbsp;<CircularProgress isIndeterminate color="blue.600" /></span>}
    </Heading>
  )
}

export default ListHeader;