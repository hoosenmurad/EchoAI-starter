import { FC, useRef } from 'react';
import { Stack, Input, Box, Flex } from '@chakra-ui/react';
import { MdOutlineFileUpload } from 'react-icons/md';

interface Props {
  onFilesAdded: (files: File[]) => void;
  accept?: string[];
  disabled?: boolean;
  title?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  file?: File | string;
}

const FileDrop: FC<Props> = ({
  onFilesAdded,
  accept,
  title,
  icon,
  disabled,
  children,
  file
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;

    if (e.dataTransfer.items) {
      const files: File[] = [];
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile();
          if (file && (!accept || accept.includes(file.type))) {
            files.push(file);
          }
        }
      }
      onFilesAdded(files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = e.target.files;
      onFilesAdded(Array.from(files));
    }
  };

  return (
    <Stack
      w="full"
      h="full"
      px={4}
      py={'2'}
      rounded="lg"
      border={2}
      borderStyle={'dashed'}
      borderColor="RGBA(255,255,255,0.4)"
      bgColor="blackAlpha.400"
      bgGradient="linear(to-b, RGBA(255,255,255,0.05), transparent)"
      alignItems="center"
      justifyContent="center"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => !disabled && fileInputRef.current?.click()}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      _hover={{
        bgColor: disabled ? undefined : 'RGBA(0,0,0,0.4)'
      }}
      gap={0}
      position="relative"
    >
      <Input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept={accept?.join(',')}
        disabled={disabled}
      />
      <Stack alignItems={'center'}>
        <Box fontSize="4xl">{icon || <MdOutlineFileUpload />}</Box>
        <Flex>{title || 'drag and drop files.'}</Flex>
        {file && <Box mt={2}>{typeof file === 'string' ? file : file.name}</Box>}
      </Stack>
      {children}
    </Stack>
  );
};

export default FileDrop;
