'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../../../components/form';
import { UserService } from '../../../demo/service/UserService';
import { User } from '../../../types/types';

export default function EventPage() {
    const toast = useRef<Toast>(null);

    const profissions = UserService.getProfissions();
    const genders = UserService.getGenders();

    const schema = z.object({
        name: z.string().min(1, 'O nome é obrigatório'),
        cpf: z.string().min(1, 'O CPF é obrigatório'),
        email: z.string().min(1, 'O email é obrigatório').email('Informe um email válido'),
        birthday: z.date({
            required_error: 'A data de nascimento é obrigatória',
        }),
        profession: z.any().refine(p => p == !undefined, 'Informe a profissão'),
        gender: z.any().refine(g => g == !undefined, 'Informe o sexo'),
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
                                    options={profissions}
                                    optionLabel="description"
                                    placeholder="Selecione..."
                                />
                                <Form.ErrorMessage field="profession" />
                            </Form.Field>
                        </div>

                        <div className="grid gap-3 m-0">
                            <Form.Field className="">
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
                                    options={genders}
                                    optionLabel="name"
                                    optionValue="id"
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
