import { Image } from "@chakra-ui/image";
import { Circle } from "@chakra-ui/layout";

interface AmacIconProps {
  size?: number;
}

export const AmacIcon: React.FC<AmacIconProps> = ({ size }) => {
  return (
    <Circle w={size || 5} h={size || 5} bg="gray.800" display="inline-flex" mx="2px">
      <Image src="amac.svg" w="90%" />
    </Circle>
  );
};
