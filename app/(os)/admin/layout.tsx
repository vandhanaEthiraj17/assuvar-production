import OSWrapper from "@/components/os/OSWrapper";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { adminNavigation } from "@/config/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute allowedRoles={['admin']}>
            <OSWrapper navigation={adminNavigation}>
                {children}
            </OSWrapper>
        </ProtectedRoute>
    );
}
