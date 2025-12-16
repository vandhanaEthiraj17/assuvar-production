import OSWrapper from "@/components/os/OSWrapper";
import { adminNavigation } from "@/config/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <OSWrapper navigation={adminNavigation}>{children}</OSWrapper>;
}
