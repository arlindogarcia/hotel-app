import { Button, Menu, MenuButton, MenuButtonProps, MenuDivider, MenuGroup, MenuItem, MenuItemOption, MenuList, MenuOptionGroup } from "@chakra-ui/react";

interface Item {
  label: string;
  value: string;
}

interface MultiSelectMenuProps {
  label: string;
  options: Item[];
  error: boolean;
  onChange?: (selectedValues: string) => void;
  buttonProps?: MenuButtonProps;
  value: string;
};

const MultiSelectInput = (props: MultiSelectMenuProps): JSX.Element => {
  const style = {
    boxShadow: '0 0 0 1px #E53E3E',
    border: '1px solid #E53E3E',
  }

  const { label, options, buttonProps } = props;

  const getValuesArray = () => {
    if (!props.value) {
      return [];
    }

    if (props.value.split(',').length === 1 && !props.value.split(',')[0]) {
      return [];
    }

    return props.value.split(',');
  }

  return (
    <Menu closeOnSelect={false}>
      {({ onClose }) => (
        <>
          <MenuButton
            style={props.error ? style : {}}
            as={Button}
            colorScheme="teal"
            type="button"
            {...buttonProps}
          >

            {`${label} (${getValuesArray().length})`}

          </MenuButton>
          <MenuList>
            <MenuGroup title={undefined}>
              <MenuItem
                onClick={() => {
                  typeof props.onChange === 'function' && props.onChange('');
                  onClose();
                }}
              >
                Limpar
              </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuOptionGroup
              title={undefined}
              // defaultValue={getValuesArray()}
              value={getValuesArray()}
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

                typeof props.onChange === 'function' && props.onChange(retorno);
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
