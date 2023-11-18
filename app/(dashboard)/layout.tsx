import { Metadata } from 'next';
import Layout from '../../layout/layout';

export const metadata: Metadata = {
    title: 'UniPonto',
    description: 'Gerência de aplicação de ponto',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },
    icons: {
        icon: '/favicon.ico',
    },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return <Layout>{children}</Layout>;
}
