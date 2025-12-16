import OSWrapper from "@/components/os/OSWrapper";
import { partnerNavigation } from "@/config/navigation";

export default function PartnerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <OSWrapper navigation={partnerNavigation}>{children}</OSWrapper>;
}
