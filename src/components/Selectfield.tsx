import { Select, SelectProps, FormControlProps, FormControl as ChakraFormControl } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { FC, ReactNode } from 'react';
// import { FormControl } from '../form-control';

export interface BaseProps extends FormControlProps {
    name: string;
    label?: string;
    helperText?: string;
}

export type SelectControlProps = BaseProps & {
    selectProps?: SelectProps;
    children: ReactNode;
};

export const SelectControl: FC<SelectControlProps> = (
    props: SelectControlProps
) => {
    const { name, label, selectProps, children, ...rest } = props;
    const [field] = useField(name);

    return (
        <ChakraFormControl name={name} label={label} {...rest}>
            <Select {...field} id={name} {...selectProps}>
                {children}
            </Select>
        </ChakraFormControl>
    );
};

export default SelectControl;