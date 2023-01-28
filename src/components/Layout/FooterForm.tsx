import { Button, ButtonGroup } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import './FooterForm.css'
import { LoaderButton } from '../Buttons';

interface IProps {
  isLoading: boolean;
}

const FooterForm = ({ isLoading }: IProps) => {
  const navigate = useNavigate();

  return (
    <div className='footer-form'>
      <ButtonGroup>
        <LoaderButton
          className='button-footer-form'
          isLoading={isLoading}
          colorScheme="teal"
          type="submit"
        >
          Salvar
        </LoaderButton>
        <Button
          colorScheme="gray"
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default FooterForm;