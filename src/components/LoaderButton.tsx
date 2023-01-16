import { Button, ButtonProps, CircularProgress } from "@chakra-ui/react";

export const LoaderButton: React.FC<{ isLoading?: boolean } & ButtonProps> = ({
  isLoading,
  disabled,
  children,
  ...props
}) => {
  return (
    <Button disabled={isLoading || disabled} {...props}>
      {isLoading && <CircularProgress isIndeterminate color="white" />}
      {!isLoading && children}
    </Button>
  );
};
