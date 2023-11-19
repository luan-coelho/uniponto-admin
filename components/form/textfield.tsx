import { InputMask, InputMaskProps } from 'primereact/inputmask';
import { InputText, InputTextProps } from 'primereact/inputtext';
import { useFormContext } from 'react-hook-form';

type TextFieldProps = InputTextProps &
    InputMaskProps & {
        name: string;
    };

export function TextField(props: TextFieldProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const textFieldProps = {
        id: props.name,
        ...register(props.name),
        ...props,
        mask: props.mask,
        className: errors[props.name] ? 'p-invalid' : '',
    };

    return <>{'mask' in props ? <InputMask {...textFieldProps} /> : <InputText {...textFieldProps} />}</>;
}
