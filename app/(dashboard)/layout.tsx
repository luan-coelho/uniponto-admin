import { Metadata } from 'next';
import Layout from '../../layout/layout';
import { ToastProvider } from '../../layout/context/toastcontext';

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
    return (
        <Layout>
            <ToastProvider>{children}</ToastProvider>
        </Layout>
    );
}
