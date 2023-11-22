import { Dropdown, DropdownProps } from 'primereact/dropdown';
import { Control, Controller, useFormContext } from 'react-hook-form';

type SelectProps = DropdownProps & {
    name: string;
    control: Control<any, any>;
    propertyValue?: string;
    isLoading?: boolean;
};

export function Select(props: SelectProps) {
    const {
        formState: { errors },
    } = useFormContext();

    const { name, control, propertyValue, isLoading } = props;

    return (
        <>
            {!isLoading ? (
                <Controller
                    control={control}
                    name={name}
                    render={({ field }) => (
                        <Dropdown
                            className={
                                errors[name] || (propertyValue ? errors[propertyValue!] : false) ? 'p-invalid' : ''
                            }
                            onChange={option => field.onChange(option.value)}
                            value={field.value}
                            {...props}
                        />
                    )}
                />
            ) : (
                <div className="flex align-items-center gap-2">
                    <i className="pi pi-spin pi-spinner"></i> Carregando...
                </div>
            )}
        </>
    );
}
