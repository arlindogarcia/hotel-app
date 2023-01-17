import { Button, Menu, MenuButton, MenuButtonProps, MenuDivider, MenuGroup, MenuItem, MenuItemOption, MenuList, MenuOptionGroup } from "@chakra-ui/react";
import React, { useState } from "react";

interface Item {
  label: string;
  value: string;
}

interface MultiSelectMenuProps {
  label: string;
  options: Item[];
  onChange?: (selectedValues: string) => void;
  buttonProps?: MenuButtonProps;
  value: string;
};

const MultiSelectInput = (props: MultiSelectMenuProps): JSX.Element => {
  const setValue = () => {
    if (!props.value) return []

    const retorno = props.value.split(',');

    if (retorno.length == 1 && !retorno[0]) {
      return [];
    }

    return retorno;
  }
  const { label, options, buttonProps } = props;
  const [selectedOptions, setSelectedOptions] = useState<string[]>(setValue());

  return (
    <Menu closeOnSelect={false}>
      {({ onClose }) => (
        <>
          <MenuButton
            as={Button}
            colorScheme="teal"
            type="button"
            {...buttonProps}
          >

            {`${label} (${selectedOptions.length})`}

          </MenuButton>
          <MenuList>
            <MenuGroup title={undefined}>
              <MenuItem
                onClick={() => {
                  setSelectedOptions([]);
                  props.onChange?.("");
                  // Have to close, otherwise the defaultValue won't be reset correctly
                  // and so the UI won't immediately show the menu item options unselected.
                  onClose();
                }}
              >
                Limpar
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuOptionGroup
              title={undefined}
              defaultValue={selectedOptions}
              type="checkbox"
              /* eslint-disable @typescript-eslint/ban-ts-comment */
              // @ts-ignore Arguments type is just wrong upstream.
              onChange={(values: string[]) => {
                let retorno = "";
                values.forEach(i => {
                  if (retorno) {
                    retorno += `,${i}`
                  } else {
                    retorno = i;
                  }
                });
                setSelectedOptions(values.filter((_) => _.length));
                props.onChange?.(retorno);
              }}
            >
              {options.map((option) => {
                return (

                  <MenuItemOption
                    key={`multiselect-menu-${option.value}`}
                    /* eslint-disable @typescript-eslint/ban-ts-comment */
                    // @ts-ignore <MenuItemOption> does have a 'type' prop because it is just a button. This is to make sure clicking this doesn't submit any forms.
                    type="button"
                    /* eslint-enable @typescript-eslint/ban-ts-comment */
                    value={option.value}
                  >
                    {option.label}
                  </MenuItemOption>
                );
              })}
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

MultiSelectInput.displayName = "MultiSelectInput";

export default MultiSelectInput;
