import OSWrapper from "@/components/os/OSWrapper";
import { clientNavigation } from "@/config/navigation";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <OSWrapper navigation={clientNavigation}>{children}</OSWrapper>;
}
