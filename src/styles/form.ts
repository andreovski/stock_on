import { formAnatomy } from "@chakra-ui/anatomy"
import { theme } from "@chakra-ui/react"

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-12px) translateX(-6px)",
  fontSize: "12px",
  color: theme.colors.gray[400],
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  parts: formAnatomy.keys,
  baseStyle: {},
  variants: {
    floating: {
      container: {
        _focusWithin: {
          label: {
            ...activeLabelStyles,
          },
        },
        "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
          {
            ...activeLabelStyles,
          },
        label: {
          top: 2,
          left: 0,
          zIndex: 2,
          position: "absolute",
          color: theme.colors.gray[400],
          fontSize: theme.fontSizes.lg,
          fontWeight: "300",
          backgroundColor: "transparent",
          pointerEvents: "none",
          mx: 3,
          px: 1,
          my: 2,
          transformOrigin: "left top",
        },
      },
    },
  },
}
