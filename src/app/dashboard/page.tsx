import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardRedirect() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/dashboard/login");
    }

    const slug = (session.user as any).slug;
    if (slug) {
        redirect(`/dashboard/${slug}`);
    }

    redirect("/");
}
