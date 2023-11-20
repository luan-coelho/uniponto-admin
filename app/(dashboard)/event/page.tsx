'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../../../components/form';

export interface ITProfession {
    id: number;
    description: string;
}

export interface User {
    name: string;
    cpf: string;
    birthday: Date;
    profession: ITProfession;
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
        profession: z.any().refine(profession => {
            if (profession == undefined) {
                return false;
            }
            return true;
        }, 'Informe a profissão'),
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

    const profissions = [
        { description: 'Desenvolvedor de Software', id: 1 },
        { description: 'Analista de Sistemas', id: 2 },
        { description: 'Administrador de Banco de Dados', id: 3 },
        { description: 'Engenheiro de Redes', id: 4 },
        { description: 'Cientista de Dados', id: 5 },
    ] as ITProfession[];

    return (
        <>
            <div className="card">
                {/* <Toast ref={toast} /> */}
                <h5>Cadastrar evento</h5>
                <FormProvider {...createUserForm}>
                    <form onSubmit={handleSubmit(createNewUser)}>
                        <div className="grid gap-3 m-0">
                            <Form.Field>
                                <Form.Label htmlFor="name">Nome</Form.Label>
                                <Form.TextField name="name" />
                                <Form.ErrorMessage field="name" />
                            </Form.Field>
                            <Form.Field>
                                <Form.Label htmlFor="cpf">CPF</Form.Label>
                                <Form.TextField
                                    name="cpf"
                                    mask="999.999.999-99"
                                />
                                <Form.ErrorMessage field="cpf" />
                            </Form.Field>
                            <Form.Field className="col-2">
                                <Form.Label htmlFor="birthday">Data de nascimento</Form.Label>
                                <Form.DatePicker
                                    control={control}
                                    name="birthday"
                                    showIcon
                                    showButtonBar
                                    dateFormat="dd/mm/yy"
                                />
                                <Form.ErrorMessage field="birthday" />
                            </Form.Field>
                        </div>

                        <div className="grid gap-3 m-0">
                            <Form.Field>
                                <Form.Label htmlFor="profession">Profissão</Form.Label>
                                <Form.Select
                                    control={control}
                                    name="profession"
                                    options={profissions}
                                    optionLabel="description"
                                    placeholder="Selecione..."
                                    propertyValue="id"
                                />
                                <Form.ErrorMessage field="profession" />
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
