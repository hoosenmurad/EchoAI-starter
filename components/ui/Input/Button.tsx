import { FC, ReactNode } from 'react';
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

interface Props extends ButtonProps {
  children: ReactNode;
}

const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <ChakraButton
      colorScheme="purple"
      {...props}
    >
      {children}
    </ChakraButton>
  );
};

export default Button; 