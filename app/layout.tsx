import "./globals.css";
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
    title: 'Assuvar OS',
    description: 'Enterprise Operating System',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${outfit.variable} font-sans bg-structura-light text-structura-black`}>
                {children}
            </body>
        </html>
    );
}
