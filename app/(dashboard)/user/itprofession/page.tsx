'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../../../../components/form';
import { ITProfession } from '../../../../types/types';

export default function ITProfessionCreatePage() {
    const toast = useRef<Toast>(null);

    const schema = z.object({
        description: z.string().min(1, { message: 'Informe a descrição' }),
    });

    const createITProfessionForm = useForm<ITProfession>({
        resolver: zodResolver(schema),
        shouldUnregister: true,
    });

    const { handleSubmit, reset } = createITProfessionForm;

    async function createNewITProfession(itProfession: ITProfession) {
        console.log(itProfession);
        reset();

        toast.current?.show({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Profissão de TI cadastrada com sucesso',
            life: 3000,
        });
    }

    return (
        <>
            <div className="card">
                <Toast ref={toast} />
                <h5>Cadastrar Profissão de TI</h5>
                <FormProvider {...createITProfessionForm}>
                    <form onSubmit={handleSubmit(createNewITProfession)}>
                        <div className="grid gap-3 m-0">
                            <Form.Field>
                                <Form.Label htmlFor="description">Descrição</Form.Label>
                                <Form.TextField name="description" />
                                <Form.ErrorMessage field="description" />
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
