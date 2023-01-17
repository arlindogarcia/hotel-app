import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

interface IProps {
  error: string;
}

const Error = ({ error }: IProps) => {
  return (
    <div>
      {error && (
        <Alert status="error" mt="2rem">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
    </div>
  )
}

export default Error;