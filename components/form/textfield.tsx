import { InputText, InputTextProps } from 'primereact/inputtext';
import { useFormContext } from 'react-hook-form';

interface InputProps extends InputTextProps {
    name: string;
}

export function TextField(props: InputProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <InputText
            id={props.name}
            {...register(props.name)}
            {...props}
            className={errors[props.name] ? 'p-invalid' : ''}
        />
    );
}
