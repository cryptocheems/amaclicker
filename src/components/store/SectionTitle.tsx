import { Heading, HeadingProps } from "@chakra-ui/layout";

export const SectionTitle: React.FC<HeadingProps> = props => {
  return <Heading fontSize="lg" w="100%" ml="2" {...props} />;
};
