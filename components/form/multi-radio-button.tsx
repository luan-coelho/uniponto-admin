import { RadioButton, RadioButtonProps } from 'primereact/radiobutton';
import { Control, Controller, useFormContext } from 'react-hook-form';

type OptionButtonProps = RadioButtonProps & {
    name: string;
    control: Control<any, any>;
    options: any[];
    optionLabel: string;
    optionValue: string;
    isLoading?: boolean;
};

export function MultiRadioButton(props: OptionButtonProps) {
    const {
        formState: { errors },
    } = useFormContext();

    const { name, control, options, optionLabel, optionValue, isLoading } = props;

    return (
        <>
            {!isLoading ? (
                <div className="grid">
                    {options &&
                        options.map((opt, index) => {
                            return (
                                <div key={index} className="col">
                                    <div className="field-radiobutton">
                                        <Controller
                                            control={control}
                                            name={name}
                                            render={({ field }) => (
                                                <RadioButton
                                                    inputId={`radio-button-${opt[optionLabel].toLowerCase()}`}
                                                    className={errors[name] ? 'p-invalid' : ''}
                                                    name={name}
                                                    value={opt}
                                                    checked={
                                                        field.value != undefined &&
                                                        field.value[optionValue] === opt[optionValue]
                                                    }
                                                    onChange={_ => field.onChange(opt)}
                                                />
                                            )}
                                        />
                                        <label htmlFor={name}>{opt[optionLabel]}</label>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            ) : (
                <div className="flex align-items-center gap-2">
                    <i className="pi pi-spin pi-spinner"></i> Carregando...
                </div>
            )}
        </>
    );
}
