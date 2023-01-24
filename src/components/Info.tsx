import { Alert, AlertIcon, AlertTitle, CircularProgress } from "@chakra-ui/react";

interface IProps {
  info: string;
  isLoading?: boolean;
}

const Info = ({ info, isLoading = false }: IProps) => {
  return (
    <>
      {info && (
        <Alert status="info" mt="2rem" width="full">
          {isLoading && <CircularProgress size="2rem" isIndeterminate mr={2} />}
          {!isLoading && <AlertIcon />}
          <AlertTitle>{info}</AlertTitle>
        </Alert>
      )}
    </>
  )
}

export default Info;