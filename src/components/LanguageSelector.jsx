import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { LANGUAGE_VERSIONS } from "../constants.js";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "#00cccc";

const LanguageSelector = ({ language, onSelect,isDisabledLanguage }) => {
  return (
    <Box ml={4} mb={2}>
      <Menu isLazy>
        <MenuButton 
          as={Button} 
          isDisabled={isDisabledLanguage}
          rightIcon={<ChevronDownIcon />}
          bg="linear-gradient(135deg, rgba(0, 153, 153, 0.15), rgba(0, 204, 204, 0.1))"
          color="white"
          border="1px solid rgba(0, 153, 153, 0.4)"
          backdropFilter="blur(10px)"
          fontWeight="600"
          fontSize="sm"
          textTransform="capitalize"
          px={6}
          py={5}
          borderRadius="12px"
          boxShadow="0 4px 12px rgba(0, 153, 153, 0.2)"
          transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          _hover={{
            bg: "linear-gradient(135deg, rgba(0, 153, 153, 0.25), rgba(0, 204, 204, 0.2))",
            transform: "translateY(-2px)",
            boxShadow: "0 6px 20px rgba(0, 153, 153, 0.4)",
            borderColor: "rgba(0, 204, 204, 0.6)",
          }}
          _active={{
            transform: "translateY(0)",
            boxShadow: "0 2px 8px rgba(0, 153, 153, 0.3)",
          }}
          _disabled={{
            opacity: 0.5,
            cursor: "not-allowed",
            transform: "none",
          }}
        >
          {language}
        </MenuButton>
        <MenuList 
          bg="rgba(17, 12, 27, 0.98)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(0, 153, 153, 0.3)"
          borderRadius="16px"
          boxShadow="0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 153, 153, 0.1)"
          p={3}
          zIndex={1500}
          overflow="hidden"
        >
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              color={lang === language ? ACTIVE_COLOR : "gray.300"}
              bg={lang === language ? "rgba(0, 153, 153, 0.25)" : "transparent"}
              borderRadius="10px"
              mb={2}
              px={4}
              py={3}
              fontWeight={lang === language ? "600" : "500"}
              transition="all 0.2s ease"
              _hover={{
                color: "white",
                bg: "linear-gradient(90deg, rgba(0, 153, 153, 0.3), rgba(0, 204, 204, 0.2))",
                transform: "translateX(6px)",
                boxShadow: "0 4px 12px rgba(0, 153, 153, 0.2)",
              }}
              _focus={{
                bg: "rgba(0, 153, 153, 0.2)",
              }}
              onClick={() => onSelect(lang)}
            >
              <Text textTransform="capitalize" fontSize="sm">{lang}</Text>
              &nbsp;
              <Text as="span" color="gray.500" fontSize="xs" fontWeight="400">
                (v{version})
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
export default LanguageSelector;
