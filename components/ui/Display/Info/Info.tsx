import { FC } from 'react';

import { Box, Flex, Tooltip, Text, Stack, List, ListItem } from '@chakra-ui/react';
import { FaInfo } from 'react-icons/fa';

interface Props {
  label: string;
  info: string[] | string | JSX.Element;
}

const Info: FC<Props> = ({ label, info }) => {
  return (
    <Stack spacing={1}>
      <Text fontWeight="bold">{label}</Text>
      {Array.isArray(info) ? (
        <List spacing={1}>
          {info.map((item, index) => (
            <ListItem key={index}>{item}</ListItem>
          ))}
        </List>
      ) : (
        info
      )}
    </Stack>
  );
};

export default Info;
