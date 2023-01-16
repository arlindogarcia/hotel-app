import React from "react";
import { Button, ButtonGroup, ButtonProps } from "@chakra-ui/button";
import { useState } from "react";

type ConfirmButtonProps = ButtonProps;

const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  onClick,
  children,
  ...props
}) => {
  const [isConfirming, setIsConfirming] = useState(false);

  if (isConfirming) {
    return (
      <ButtonGroup>
        <Button
          onClick={(e) => {
            setIsConfirming(false);
            typeof onClick == "function" && onClick(e);
          }}
          type="button"
          colorScheme="blue"
        >
          Confirmar
        </Button>
        <Button type="button" onClick={() => setIsConfirming(false)}>
          Não
        </Button>
      </ButtonGroup>
    );
  }

  return (
    <Button onClick={() => setIsConfirming(true)} {...props}>
      {children}
    </Button>
  );
};

export default ConfirmButton;
