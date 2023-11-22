import { RadioButton, RadioButtonProps } from 'primereact/radiobutton';
import { Control, Controller, useFormContext } from 'react-hook-form';

type OptionButtonProps = RadioButtonProps & {
    name: string;
    control: Control<any, any>;
    options: any[];
    optionLabel: string;
    optionValue: string;
};

export function MultiRadioButton(props: OptionButtonProps) {
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <div className="grid">
                {props.options.map((opt, index) => {
                    return (
                        <div key={index} className="col">
                            <div className="field-radiobutton">
                                <Controller
                                    control={props.control}
                                    name={props.name}
                                    render={({ field }) => (
                                        <RadioButton
                                            inputId={`radio-button-${opt[props.optionLabel].toLowerCase()}`}
                                            className={errors[props.name] ? 'p-invalid' : ''}
                                            name={props.name}
                                            value={opt}
                                            checked={field.value === opt[props.optionValue]}
                                            onChange={_ => field.onChange(opt[props.optionValue])}
                                        />
                                    )}
                                />
                                <label htmlFor={props.name}>{opt[props.optionLabel]}</label>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
