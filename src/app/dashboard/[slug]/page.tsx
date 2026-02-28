import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DonationForm from "@/components/DonationForm";
import LogoutButton from "@/components/LogoutButton";

interface Props {
    params: { slug: string };
}

export default async function SchoolDashboardPage({ params }: Props) {
    const session = await getServerSession(authOptions);
    const { slug } = params;

    if (!session || (session.user as any).slug !== slug) {
        redirect("/dashboard/login");
    }

    const school = await prisma.school.findUnique({
        where: { slug },
        include: {
            donations: {
                orderBy: { createdAt: 'desc' },
                take: 10
            }
        }
    });

    if (!school) {
        redirect("/");
    }

    // Calculate metrics
    const availableFunds = school.raisedAmount; // In a real app this would be more complex
    const mealCost = 3.50;
    const mealsAvailable = Math.floor(availableFunds / mealCost);

    return (
        <div className="admin-mode">
            <style dangerouslySetInnerHTML={{
                __html: `
        body { background-color: var(--admin-bg); }
        header { display: none; }
        footer { display: none; }
      `}} />

            <header className="admin-header" style={{
                backgroundColor: 'var(--admin-primary)',
                color: 'var(--white)',
                padding: '1rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <a href="/" className="logo" style={{ color: 'var(--white)' }}>LunchForward</a>
                <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span style={{ color: '#9ca3af', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {school.name} Portal
                    </span>
                    <LogoutButton />
                </nav>
            </header>

            <main className="dashboard-wrapper">
                <h1 className="dashboard-title">Financial Overview</h1>

                <div className="dashboard-metrics">
                    <div className="metric-card">
                        <div className="metric-label">Available Meal Funds</div>
                        <div className="metric-value">\${availableFunds.toFixed(2)}</div>
                        <div className="metric-sub">Net funds ready to use</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">Avg Meal Cost</div>
                        <div className="metric-value">\${mealCost.toFixed(2)}</div>
                        <div className="metric-sub">Current set cost per meal</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">Meals Available</div>
                        <div className="metric-value" style={{ color: "#3b82f6" }}>{mealsAvailable}</div>
                        <div className="metric-sub">Based on current funds</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">Activity This Month</div>
                        <div className="metric-value">{school.donations.length}</div>
                        <div className="metric-sub">Recent donations tracked</div>
                    </div>
                </div>

                <div className="dashboard-main">
                    <div className="main-left">
                        <div className="panel">
                            <div className="panel-header">
                                <h2 className="panel-title">Recent Donations</h2>
                            </div>
                            <div style={{ overflowX: "auto" }}>
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Gross</th>
                                            <th>Processing</th>
                                            <th>Platform</th>
                                            <th>Net to School</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {school.donations.map((donation) => {
                                            const processingFee = donation.amount * 0.03 + 0.30;
                                            const netAmount = donation.amount - processingFee;
                                            return (
                                                <tr key={donation.id}>
                                                    <td style={{ color: "#6b7280" }}>{new Date(donation.createdAt).toLocaleDateString()}</td>
                                                    <td>\${donation.amount.toFixed(2)}</td>
                                                    <td style={{ color: "#9ca3af" }}>-\${processingFee.toFixed(2)}</td>
                                                    <td><span className="status-badge" style={{ background: "#f1f5f9", color: "#475569" }}>Stripe</span></td>
                                                    <td style={{ fontWeight: 600, color: "#16a34a" }}>\${netAmount.toFixed(2)}</td>
                                                </tr>
                                            );
                                        })}
                                        {school.donations.length === 0 && (
                                            <tr>
                                                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#6b7280' }}>No donations yet.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="main-right">
                        <div className="panel">
                            <div className="panel-header">
                                <h2 className="panel-title">Record Meals Used</h2>
                            </div>
                            <div className="panel-body">
                                <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1.5rem" }}>
                                    Log funds withdrawn or applied to negative lunch balances.
                                </p>
                                <form className="admin-form">
                                    <label>Date</label>
                                    <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />

                                    <label>Meals Count</label>
                                    <input type="number" placeholder="e.g., 20" />

                                    <label>Cost per Meal ($)</label>
                                    <input type="number" step="0.01" defaultValue="3.50" />

                                    <button type="submit" className="admin-btn" disabled>
                                        Record Usage (Coming Soon)
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="admin-footer">
                <div className="dashboard-wrapper" style={{ padding: 0 }}>
                    <p style={{ marginBottom: "0.5rem", color: "#4b5563" }}><strong>No student data stored. Funds tracked transparently.</strong></p>
                    <p>&copy; 2026 LunchForward Admin. <a href="/" style={{ color: "var(--admin-accent)" }}>Return to Public Site</a></p>
                </div>
            </footer>
        </div>
    );
}
