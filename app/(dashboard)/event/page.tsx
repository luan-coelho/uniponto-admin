'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../../../components/form';
import { useFetch } from '../../../hooks/useFetch';
import { Gender, ITProfession, User } from '../../../types/types';

export default function EventPage() {
    const toast = useRef<Toast>(null);
    const fetchProfessions = useFetch<ITProfession[]>('http://localhost:8080/professions');
    const fetchGenders = useFetch<Gender[]>('http://localhost:8080/genders');

    const schema = z.object({
        name: z.string().min(1, { message: 'Informe o nome' }),
        cpf: z.string().min(1, { message: 'Informe o CPF' }),
        email: z.string().min(1, { message: 'Informe o email' }).email({ message: 'Informe um email válido' }),
        birthday: z.date({
            required_error: 'Informe a data de nascimento',
        }),
        profession: z.unknown().refine(p => p != undefined, { message: 'Informe a profissão' }),
        gender: z.unknown().refine(g => g != undefined, { message: 'Informe o sexo' }),
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
                            <Form.Field>
                                <Form.Label htmlFor="name">Nome</Form.Label>
                                <Form.TextField name="name" />
                                <Form.ErrorMessage field="name" />
                            </Form.Field>

                            <Form.Field>
                                <Form.Label htmlFor="cpf">CPF</Form.Label>
                                <Form.TextField name="cpf" mask="999.999.999-99" />
                                <Form.ErrorMessage field="cpf" />
                            </Form.Field>
                        </div>

                        <div className="grid gap-3 m-0">
                            <Form.Field>
                                <Form.Label htmlFor="email">Email</Form.Label>
                                <Form.TextField name="email" />
                                <Form.ErrorMessage field="email" />
                            </Form.Field>

                            <Form.Field className="col-2">
                                <Form.Label htmlFor="profession">Profissão</Form.Label>
                                <Form.Select
                                    control={control}
                                    name="profession"
                                    options={fetchProfessions.data!}
                                    optionLabel="description"
                                    placeholder="Selecione..."
                                    isLoading={fetchProfessions.isLoading}
                                />
                                <Form.ErrorMessage field="profession" />
                            </Form.Field>
                        </div>

                        <div className="grid gap-3 m-0">
                            <Form.Field>
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

                            <Form.Field>
                                <Form.Label htmlFor="gender">Sexo</Form.Label>
                                <Form.MultiRadioButton
                                    control={control}
                                    name="gender"
                                    options={fetchGenders.data!}
                                    optionLabel="name"
                                    optionValue="id"
                                    isLoading={fetchGenders.isLoading}
                                />
                                <Form.ErrorMessage field="gender" />
                            </Form.Field>
                        </div>

                        <div className="flex align-items-center justify-content-end">
                            <Button label="Cadastrar" type="submit" />
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    );
}
