import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    heading:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: "#0a0118",
        color: "gray.300",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "600",
        borderRadius: "12px",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      },
      defaultProps: {
        colorScheme: "teal",
      },
    },
    Input: {
      baseStyle: {
        field: {
          borderRadius: "12px",
          bg: "rgba(10, 10, 30, 0.4)",
          backdropFilter: "blur(16px)",
          _focus: {
            borderColor: "rgba(0, 204, 204, 0.6)",
            boxShadow: "0 0 0 1px rgba(0, 204, 204, 0.6)",
          },
        },
      },
    },
    Textarea: {
      baseStyle: {
        borderRadius: "12px",
        bg: "rgba(10, 10, 30, 0.4)",
        backdropFilter: "blur(16px)",
        _focus: {
          borderColor: "rgba(0, 204, 204, 0.6)",
          boxShadow: "0 0 0 1px rgba(0, 204, 204, 0.6)",
        },
      },
    },
  },
  colors: {
    brand: {
      50: "#e6ffff",
      100: "#b3ffff",
      200: "#80ffff",
      300: "#4dffff",
      400: "#1affff",
      500: "#00e6e6",
      600: "#00b3b3",
      700: "#008080",
      800: "#004d4d",
      900: "#001a1a",
    },
  },
});

export default theme;
