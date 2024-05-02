import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
  } from "@chakra-ui/react";
  import { MODULES } from "../constants.js";
  
  const modules = Object.entries(MODULES);
  const ACTIVE_COLOR = "blue.400";
  
  const ModuleSelector = ({ module, onSelectModule }) => {
    return (
      <Box ml={4} mb={2}>
        <Menu isLazy>
          <MenuButton as={Button}>{module}</MenuButton>
          <MenuList bg="#110c1b">
            {modules.map(([mod, description]) => (
              <MenuItem
                key={mod}
                color={mod === module ? ACTIVE_COLOR : ""}
                bg={mod === module ? "gray.900" : "transparent"}
                _hover={{
                  color: ACTIVE_COLOR,
                  bg: "gray.900",
                }}
                onClick={() => onSelectModule(mod)}
              >
                {mod}
                &nbsp;
                <Text as="span" color="gray.600" fontSize="sm">
                  ({description})
                </Text>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    );
  };
  export default ModuleSelector;
  