import { theme } from "@chakra-ui/react"

const dividerTheme = {
  variants: {
    solid: {
      borderWidth: "1.5px", // change the width of the border
      borderStyle: "solid", // change the style of the border
      borderRadius: 10, // set border radius to 10
      borderColor: theme.colors.blackAlpha[300],
    },
  },
}

export default dividerTheme
