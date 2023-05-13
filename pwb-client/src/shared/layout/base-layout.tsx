import { Container } from "@mantine/core";

type Props = React.PropsWithChildren;
const BaseLayout = ({ children }: Props) => {
  return <Container>{children}</Container>;
};
export default BaseLayout;
