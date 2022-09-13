import { Flex, Spinner, SpinnerProps } from "@chakra-ui/react"

interface ISpinnerFullProps extends SpinnerProps {}

export const SpinnerFull = ({ ...props }: ISpinnerFullProps) => {
  return (
    <Flex justify="center" width="100%" height="100%">
      <Spinner color="primary" alignSelf="center" {...props} />
    </Flex>
  )
}
