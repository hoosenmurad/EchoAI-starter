import { FC } from 'react';
import { Stack } from '@chakra-ui/react';
import FileDrop from '@/components/ui/Input/FileDrop';
import Info from '@/components/ui/Display/Info';

interface Props {
  videoFile: File | string;
  onFilesAdded: (files: File[]) => void;
  requirements: {
    label: string;
    items: string[];
  };
  accept?: string[];
}

const MediaFileDrop: FC<Props> = ({ videoFile, onFilesAdded, requirements, accept }) => {
  return (
    <Stack spacing={2}>
      <FileDrop
        onFilesAdded={onFilesAdded}
        accept={accept}
        file={videoFile}
      />
      <Info label={requirements.label} info={requirements.items} />
    </Stack>
  );
};

export default MediaFileDrop;
