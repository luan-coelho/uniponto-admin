import { useFormContext } from 'react-hook-form';

interface ErrorMessageProps {
    field: string;
}

function get(obj: Record<any, any>, path: string) {
    const travel = (regexp: RegExp) =>
        String.prototype.split
            .call(path, regexp)
            .filter(Boolean)
            .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);

    return travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
}

export function ErrorMessage({ field }: ErrorMessageProps) {
    const {
        formState: { errors },
    } = useFormContext();

    const fieldError = get(errors, field);

    if (!fieldError) {
        return null;
    }

    return <span className="field-error-message">{fieldError.message?.toString()}</span>;
}
