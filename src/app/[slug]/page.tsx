import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import DonationForm from '@/components/DonationForm';

export const dynamic = 'force-dynamic';

interface Props {
    params: { slug: string };
}

export default async function SchoolPage({ params }: Props) {
    const slug = params?.slug;
    console.log('[SchoolPage] Received slug: ', slug);

    if (!slug) {
        notFound();
    }

    const school = await prisma.school.findUnique({
        where: { slug: slug },
    });

    if (!school) {
        console.error('[SchoolPage] School not found for slug: ', slug);
        notFound();
    }

    return (
        <section className="container" style={{ maxWidth: "700px", paddingTop: "var(--spacing-lg)", paddingBottom: "var(--spacing-lg)" }}>
            <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
                {/* Header Banner */}
                <div style={{ backgroundColor: 'var(--primary-hover)', color: 'white', padding: 'var(--spacing-lg) var(--spacing-md)', textAlign: 'center', position: 'relative' }}>
                    {/* Decorative Background Pattern */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                    <h1 style={{ color: 'white', marginBottom: '0.5rem', position: 'relative', zIndex: 1 }}>{school.name}</h1>
                    <p style={{ fontSize: "1.125rem", color: '#e5e7eb', margin: 0, maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', position: 'relative', zIndex: 1 }}>
                        {school.description || "Sponsor school lunches to clear student debt and ensure every child in our " + school.name.split(' ')[0] + " community gets a healthy meal."}
                    </p>
                </div>

                <DonationForm school={school} />

                {/* Trust Indicators */}
                <div style={{ padding: "0 var(--spacing-md) var(--spacing-lg)" }}>
                    <div style={{ marginTop: "0.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-color)", display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ flexShrink: 0, padding: '0.75rem', backgroundColor: '#f0fdf4', borderRadius: '50%', color: 'var(--primary-color)' }}>
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        <div>
                            <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem", color: "var(--text-color)" }}>Bank-Grade Security</h3>
                            <p style={{ fontSize: "0.875rem", marginBottom: 0, color: "var(--text-muted)", lineHeight: 1.5 }}>Payments are securely processed by Stripe. We never store credit card information or individual student data. Funds are distributed directly to the school district.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
