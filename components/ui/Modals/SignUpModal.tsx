import { FC } from 'react';

import {
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Text
} from '@chakra-ui/react';

import AuthUI from '@/app/signin/AuthUI';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Sign up to continue</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AuthUI />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignUpModal;
