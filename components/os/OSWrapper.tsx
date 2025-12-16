import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { NavigationItem } from '@/config/navigation';

interface OSWrapperProps {
    children: React.ReactNode;
    navigation: NavigationItem[];
}

export default function OSWrapper({ children, navigation }: OSWrapperProps) {
    return (
        <div className="flex h-screen w-full bg-structura-light">
            <Sidebar items={navigation} />
            <div className="flex flex-1 flex-col overflow-hidden">
                <TopBar />
                <main className="flex-1 overflow-y-auto p-6">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
