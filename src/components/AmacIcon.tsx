import { Image } from "@chakra-ui/image";
import { Circle } from "@chakra-ui/layout";

export const AmacIcon: React.FC = () => {
  return (
    <Circle w="5" h="5" bg="gray.800" display="inline-flex" ml="2px" mr="2">
      <Image src="amac.svg" w="90%" />
    </Circle>
  );
};
