import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

interface IProps {
  success: string | undefined;
}

const Success = ({ success }: IProps) => {
  return (
    <div>
      {success && (
        <Alert status="success" mt="2rem">
          <AlertIcon />
          <AlertTitle>{success}</AlertTitle>
        </Alert>
      )}
    </div>
  )
}

export default Success;