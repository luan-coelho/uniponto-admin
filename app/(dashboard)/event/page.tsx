'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../../../components/form';

export interface User {
    name: string;
    cpf: string;
    birthday: Date;
}

export default function EventPage() {
    const toast = useRef<Toast>(null);

    const schema = z.object({
        name: z.string().min(1, {
            message: 'O nome é obrigatório',
        }),
        cpf: z.string().min(1, {
            message: 'O CPF é obrigatório',
        }),
        birthday: z.date({
            required_error: 'A data de nascimento é obrigatória',
        }),
    });

    const createUserForm = useForm<User>({
        resolver: zodResolver(schema),
        shouldUnregister: true,
    });

    const { handleSubmit, control, reset } = createUserForm;

    async function createNewUser(user: User) {
        console.log(user);
        reset();

        toast.current?.show({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuário cadastrado com sucesso',
            life: 3000,
        });
    }

    return (
        <>
            <div className="card">
                <Toast ref={toast} />
                <h5>Cadastrar evento</h5>
                <FormProvider {...createUserForm}>
                    <form onSubmit={handleSubmit(createNewUser)}>
                        <div className="grid gap-3 m-0">
                            <Form.Field className="col field">
                                <Form.Label htmlFor="name">Nome</Form.Label>
                                <Form.TextField name="name" />
                                <Form.ErrorMessage field="name" />
                            </Form.Field>
                            <Form.Field className="col field">
                                <Form.Label htmlFor="cpf">CPF</Form.Label>
                                <Form.TextField
                                    name="cpf"
                                    mask="999.999.999-99"
                                />
                                <Form.ErrorMessage field="cpf" />
                            </Form.Field>
                            <Form.Field className="col-2 field">
                                <Form.Label htmlFor="birthday">Data de nascimento</Form.Label>
                                <Form.DatePicker
                                    name="birthday"
                                    control={control}
                                />
                                <Form.ErrorMessage field="birthday" />
                            </Form.Field>
                        </div>

                        <div className="flex align-items-center justify-content-end">
                            <Button
                                label="Cadastrar"
                                type="submit"
                            />
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    );
}
