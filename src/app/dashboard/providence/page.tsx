"use client";

export default function ProvidenceDashboardPage() {
    return (
        <div className="admin-mode">
            {/* We inline an overriding style tag here since we want the body to have correct admin background 
          In a fuller app we would use layouts and nested layouts, but keeping this simple per requirements */}
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
                <nav style={{ color: '#9ca3af', fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Providence Elementary Portal</nav>
            </header>

            <main className="dashboard-wrapper">
                <h1 className="dashboard-title">Financial Overview</h1>

                {/* A) Summary Cards */}
                <div className="dashboard-metrics">
                    <div className="metric-card">
                        <div className="metric-label">Available Meal Funds</div>
                        <div className="metric-value">$845.72</div>
                        <div className="metric-sub">Net funds ready to use</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">Avg Meal Cost</div>
                        <div className="metric-value">$3.50</div>
                        <div className="metric-sub">Current set cost per meal</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">Meals Available</div>
                        <div className="metric-value" style={{ color: "#3b82f6" }}>241</div>
                        <div className="metric-sub">Based on current funds</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-label">Activity This Month</div>
                        <div className="metric-value">215</div>
                        <div className="metric-sub">Meals sponsored in October</div>
                    </div>
                </div>

                <div className="dashboard-main">

                    {/* Left Column: Tables & Feed */}
                    <div className="main-left">

                        {/* B) Recent Donations Table */}
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
                                        <tr>
                                            <td style={{ color: "#6b7280" }}>Oct 26, 2026</td>
                                            <td>$50.00</td>
                                            <td style={{ color: "#9ca3af" }}>-$1.75</td>
                                            <td><span className="status-badge" style={{ background: "#f1f5f9", color: "#475569" }}>Stripe</span></td>
                                            <td style={{ fontWeight: 600, color: "#16a34a" }}>$48.25</td>
                                        </tr>
                                        <tr>
                                            <td style={{ color: "#6b7280" }}>Oct 26, 2026</td>
                                            <td>$10.00</td>
                                            <td style={{ color: "#9ca3af" }}>-$0.59</td>
                                            <td><span className="status-badge" style={{ background: "#f1f5f9", color: "#475569" }}>Stripe</span></td>
                                            <td style={{ fontWeight: 600, color: "#16a34a" }}>$9.41</td>
                                        </tr>
                                        <tr>
                                            <td style={{ color: "#6b7280" }}>Oct 25, 2026</td>
                                            <td>$100.00</td>
                                            <td style={{ color: "#9ca3af" }}>-$3.20</td>
                                            <td><span className="status-badge" style={{ background: "#f1f5f9", color: "#475569" }}>Stripe</span></td>
                                            <td style={{ fontWeight: 600, color: "#16a34a" }}>$96.80</td>
                                        </tr>
                                        <tr>
                                            <td style={{ color: "#6b7280" }}>Oct 25, 2026</td>
                                            <td>$25.00</td>
                                            <td style={{ color: "#9ca3af" }}>-$1.03</td>
                                            <td><span className="status-badge" style={{ background: "#f1f5f9", color: "#475569" }}>Stripe</span></td>
                                            <td style={{ fontWeight: 600, color: "#16a34a" }}>$23.97</td>
                                        </tr>
                                        <tr>
                                            <td style={{ color: "#6b7280" }}>Oct 24, 2026</td>
                                            <td>$50.00</td>
                                            <td style={{ color: "#9ca3af" }}>-$1.75</td>
                                            <td><span className="status-badge" style={{ background: "#f1f5f9", color: "#475569" }}>Stripe</span></td>
                                            <td style={{ fontWeight: 600, color: "#16a34a" }}>$48.25</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* D) Ledger / Activity Feed */}
                        <div className="panel">
                            <div className="panel-header">
                                <h2 className="panel-title">Ledger & Activity Feed</h2>
                                <span style={{ fontSize: "0.875rem", color: "#3b82f6", cursor: "pointer" }}>View All Activity &rarr;</span>
                            </div>
                            <div className="panel-body">
                                <ul className="feed-list">
                                    <li className="feed-item">
                                        <div className="feed-icon">↓</div>
                                        <div className="feed-content">
                                            <div className="feed-title">Donation Received</div>
                                            <div className="feed-desc">Oct 26, 2026 • Anonymous Donor</div>
                                        </div>
                                        <div className="feed-amount text-green">+$48.25</div>
                                    </li>
                                    <li className="feed-item">
                                        <div className="feed-icon">↓</div>
                                        <div className="feed-content">
                                            <div className="feed-title">Donation Received</div>
                                            <div className="feed-desc">Oct 26, 2026 • Anonymous Donor</div>
                                        </div>
                                        <div className="feed-amount text-green">+$9.41</div>
                                    </li>
                                    <li className="feed-item">
                                        <div className="feed-icon negative">↑</div>
                                        <div className="feed-content">
                                            <div className="feed-title">Meals Recorded</div>
                                            <div className="feed-desc">Oct 25, 2026 • 50 meals applied to student accounts</div>
                                        </div>
                                        <div className="feed-amount text-red">-$175.00</div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Actions & Tools */}
                    <div className="main-right">

                        {/* C) Record Meals Used (Mock Form) */}
                        <div className="panel">
                            <div className="panel-header">
                                <h2 className="panel-title">Record Meals Used</h2>
                            </div>
                            <div className="panel-body">
                                <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1.5rem" }}>
                                    Log funds withdrawn or applied to negative lunch balances.
                                </p>

                                <form className="admin-form" onSubmit={(e) => e.preventDefault()}>
                                    <label>Date</label>
                                    <input type="date" defaultValue="2026-10-27" />

                                    <label>Meals Count</label>
                                    <input type="number" placeholder="e.g., 20" />

                                    <label>Cost per Meal ($)</label>
                                    <input type="number" step="0.01" defaultValue="3.50" />

                                    <label>Internal Notes (Optional)</label>
                                    <textarea rows={3} placeholder="e.g., Cleared outstanding balances for 3rd and 4th grade."></textarea>

                                    <button type="submit" className="admin-btn" disabled>
                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                        Record Usage (Coming Soon)
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* E) Reports Placeholders */}
                        <div className="panel">
                            <div className="panel-header">
                                <h2 className="panel-title">Generate Reports</h2>
                            </div>
                            <div className="panel-body">
                                <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "1.5rem" }}>
                                    Export financial data for district accounting and reconciliation.
                                </p>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                    <button className="admin-btn admin-btn-outline">
                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: "#ef4444", marginRight: "0.5rem" }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                                        Download Monthly Summary (PDF)
                                    </button>
                                    <button className="admin-btn admin-btn-outline">
                                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: "#10b981", marginRight: "0.5rem" }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                        Export Complete Ledger (CSV)
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </main>

            {/* F) Footer trust text */}
            <footer className="admin-footer">
                <div className="dashboard-wrapper" style={{ padding: 0 }}>
                    <p style={{ marginBottom: "0.5rem", color: "#4b5563" }}><strong>No student data stored. Funds tracked transparently.</strong></p>
                    <p>&copy; 2026 LunchForward Admin. <a href="/" style={{ color: "var(--admin-accent)" }}>Return to Public Site</a></p>
                </div>
            </footer>
        </div>
    );
}
