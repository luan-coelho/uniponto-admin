import { InputMask, InputMaskProps } from 'primereact/inputmask';
import { InputText, InputTextProps } from 'primereact/inputtext';
import { useFormContext } from 'react-hook-form';

type TextFieldMaskProps = InputMaskProps & {
    name: string;
    mask?: string;
};

type TextFieldProps = InputTextProps & TextFieldMaskProps;

export function TextField(props: TextFieldProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            {'mask' in props ? (
                <InputMask
                    id={props.name}
                    {...register(props.name)}
                    {...props}
                    mask={props.mask}
                    className={errors[props.name] ? 'p-invalid' : ''}
                />
            ) : (
                <InputText
                    id={props.name}
                    {...register(props.name)}
                    {...props}
                    className={errors[props.name] ? 'p-invalid' : ''}
                />
            )}
        </>
    );
}
