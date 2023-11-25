'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form } from '../../../../components/form';
import api from '../../../../demo/service/api';
import { useFetch } from '../../../../hooks/useFetch';
import { ITProfession } from '../../../../types/types';

export default function ITProfessionCreatePage() {
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const [selectedProfissions, setSelectedProfissions] = useState<ITProfession[]>([]);
    const { isLoading, data, mutate } = useFetch<ITProfession[]>('/professions');
    const [openNewProfissionDialog, setopenNewProfissionDialog] = useState<boolean>(false);

    const schema = z.object({
        description: z.string().min(1, { message: 'Informe a descrição' }),
    });

    const createITProfessionForm = useForm<ITProfession>({
        resolver: zodResolver(schema),
        shouldUnregister: false,
    });

    const { handleSubmit, reset } = createITProfessionForm;

    async function createNewITProfession(itProfession: ITProfession) {
        const response = await api.post('professions', itProfession);

        if (response.status == 201) {
            reset();
            mutate();
            setopenNewProfissionDialog(false);

            toast.current?.show({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Profissão de TI cadastrada com sucesso',
                life: 3000,
            });
            return;
        }
        toast.current?.show({
            severity: 'error',
            summary: 'Algo inesperado aconteceu',
            detail: response.data.detail,
            life: 3000,
        });
    }

    const newProfissionToolbarTemplate = () => {
        return (
            <>
                <div className="my-2">
                    <Button
                        onClick={() => setopenNewProfissionDialog(true)}
                        label="Novo"
                        icon="pi pi-plus"
                        severity="success"
                        className=" mr-2"
                    />
                </div>
            </>
        );
    };

    const exportCSV = () => {
        if (dt.current) {
            dt.current.exportCSV();
        }
    };

    const exportTableToolbarTemplate = () => {
        return <Button label="Exportar dados" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Profissões de TI</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    type="search"
                    onInput={e => setGlobalFilter(e.currentTarget.value)}
                    placeholder="Search..."
                />
            </span>
        </div>
    );

    const actionBodyTemplate = (rowData: ITProfession) => {
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    rounded
                    severity="info"
                    className="mr-2"
                    onClick={() => {
                        /*editProduct(rowData)*/
                    }}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    severity="danger"
                    onClick={() => {
                        /*confirmDeleteProduct(rowData)*/
                    }}
                />
            </>
        );
    };

    return (
        <>
            <div className="card">
                <Toast ref={toast} />

                <Toolbar
                    className="mb-4"
                    start={newProfissionToolbarTemplate}
                    end={exportTableToolbarTemplate}></Toolbar>

                {!isLoading ? (
                    <DataTable
                        ref={dt}
                        value={data!}
                        selection={selectedProfissions}
                        onSelectionChange={e => setSelectedProfissions(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Exibindo {first} a {last} de {totalRecords} profissões"
                        globalFilter={globalFilter}
                        emptyMessage="No products found."
                        header={header}>
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="ID" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column field="description" header="Descrição" sortable style={{ minWidth: '12rem' }}></Column>
                        <Column body={actionBodyTemplate} style={{ minWidth: '12rem' }}></Column>
                    </DataTable>
                ) : (
                    <span>Carregando...</span>
                )}

                <Dialog
                    header="Cadastrar nova profissão"
                    visible={openNewProfissionDialog}
                    maximizable
                    closeOnEscape={true}
                    style={{ width: '50vw' }}
                    onHide={() => setopenNewProfissionDialog(false)}>
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
                </Dialog>
            </div>
        </>
    );
}
