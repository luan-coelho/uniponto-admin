import { Calendar, CalendarProps } from 'primereact/calendar';
import { Control, Controller, useFormContext } from 'react-hook-form';

type DatePickerProps = CalendarProps & {
    name: string;
    control: Control<any, any>;
};

export function DatePicker(props: DatePickerProps) {
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <Controller
                control={props.control}
                name={props.name}
                render={({ field }) => (
                    <Calendar
                        className={errors[props.name] ? 'p-invalid' : ''}
                        showIcon
                        showButtonBar
                        dateFormat="dd/mm/yy"
                        onChange={date => field.onChange(date)}
                        onClearButtonClick={_ => field.onChange(undefined)}
                    />
                )}
            />
        </>
    );
}
