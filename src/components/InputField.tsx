import React, { InputHTMLAttributes } from 'react'
import { FormControl, FormLabel, Input, FormErrorMessage, Textarea, ComponentWithAs } from '@chakra-ui/react'
import { useField } from 'formik'

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
    defaultValue?: string
    textarea?: boolean
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    textarea,
    defaultValue,
    size: _,
    ...props
}) => {
    let InputOrTextarea: ComponentWithAs<"input"> = Input
    if (textarea) {
        InputOrTextarea = Textarea
    }
    const [field, { error }] = useField(props)
    return (
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <InputOrTextarea
                {...field}
                {...props}
                id={field.name}
            />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    )
}

export default InputField