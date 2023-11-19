import { Dropdown, DropdownProps } from 'primereact/dropdown';
import { Control, Controller, useFormContext } from 'react-hook-form';

type SelectProps = DropdownProps & {
    name: string;
    control: Control<any, any>;
};

export function Select(props: SelectProps) {
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <Controller
                control={props.control}
                name={props.name}
                render={({ field }) => (
                    <Dropdown
                        className={errors[props.name] ? 'p-invalid' : ''}
                        value={field}
                        onChange={option => field.onChange(option)}
                        {...props}
                    />
                )}
            />
        </>
    );
}
