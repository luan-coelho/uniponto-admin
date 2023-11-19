'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../../../components/form';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';

export interface User {
    name: string;
    cpf: string;
}

export default function EventPage() {
    const toast = useRef<Toast>(null);

    const schema = z.object({
        name: z.string().min(1, 'O nome é obrigatório'),
        cpf: z.string().min(1, 'O CPF é obrigatório'),
    });

    const createUserForm = useForm<User>({
        resolver: zodResolver(schema),
        shouldUnregister: true,
    });

    const { handleSubmit, reset } = createUserForm;

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
