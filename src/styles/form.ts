import { formAnatomy } from "@chakra-ui/anatomy"

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px) translateX(-10px)",
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
        "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label":
          {
            ...activeLabelStyles,
          },
        label: {
          top: 0,
          left: 0,
          zIndex: 2,
          position: "absolute",
          backgroundColor: "white",
          mx: 3,
          px: 1,
          my: 2,
        },
      },
    },
  },
}
