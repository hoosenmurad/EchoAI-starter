import { FC } from 'react';
import { Stack, Text, List, ListItem, ListIcon } from '@chakra-ui/react';
import { MdInfo } from 'react-icons/md';

interface Props {
  label: string;
  info: string[];
}

const Info: FC<Props> = ({ label, info }) => {
  return (
    <Stack spacing={1}>
      <Text fontWeight="bold">{label}</Text>
      <List spacing={1}>
        {info.map((item, index) => (
          <ListItem key={index} display="flex" alignItems="center">
            <ListIcon as={MdInfo} color="purple.500" />
            <Text fontSize="sm">{item}</Text>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default Info; 