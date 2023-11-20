import { Dropdown, DropdownProps } from 'primereact/dropdown';
import { Control, Controller, useFormContext } from 'react-hook-form';

type SelectProps = DropdownProps & {
    name: string;
    control: Control<any, any>;
    propertyValue?: string;
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
                        className={
                            errors[props.name] || (props.propertyValue ? errors[props.propertyValue!] : false)
                                ? 'p-invalid'
                                : ''
                        }
                        onChange={option => field.onChange(option.value)}
                        value={field.value}
                        {...props}
                    />
                )}
            />
        </>
    );
}
