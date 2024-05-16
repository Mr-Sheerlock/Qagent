import {
    Box,
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
  } from "@chakra-ui/react";
  import { AIOUTPUTS } from "../constants.js";
  
  const outputTypes = Object.entries(AIOUTPUTS);
  const ACTIVE_COLOR = "blue.400";
  
  const OutputSelector = ({ outputType, onSelectOutputType, isDisabledOutputType}) => {
    return (
      <Box ml={4} mb={2}>
        <Menu isLazy>
          <MenuButton as={Button} isDisabled={isDisabledOutputType}>{outputType}</MenuButton>
          <MenuList bg="#110c1b">
            {outputTypes.map(([out, description]) => (
              <MenuItem
                key={out}
                color={out === outputType ? ACTIVE_COLOR : ""}
                bg={out === outputType ? "gray.900" : "transparent"}
                _hover={{
                  color: ACTIVE_COLOR,
                  bg: "gray.900",
                }}
                onClick={() => onSelectOutputType(out)}
              >
                {out}
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
  export default OutputSelector;
  