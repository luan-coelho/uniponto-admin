import { Gender, ITProfession } from '../../types/types';

export const UserService = {
    getProfissions(): ITProfession[] {
        return [
            { description: 'Desenvolvedor de Software', id: 1 },
            { description: 'Analista de Sistemas', id: 2 },
            { description: 'Administrador de Banco de Dados', id: 3 },
            { description: 'Engenheiro de Redes', id: 4 },
            { description: 'Cientista de Dados', id: 5 },
        ];
    },
    getGenders(): Gender[] {
        return [
            { id: 1, name: 'Masculino' },
            { id: 2, name: 'Feminino' },
            { id: 3, name: 'Não Binário' },
        ];
    },
};
