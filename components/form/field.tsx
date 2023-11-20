import { HTMLAttributes } from 'react';

interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

export function Field(props: FieldProps) {
    return (
        <div
            {...props}
            className="col field"
        />
    );
}
