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

    const mealCost = 3.50;
    const mealsFunded = Math.floor(school.raisedAmount / mealCost);
    const goalMeals = Math.ceil(school.targetAmount / mealCost);

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

                {/* 1) HERO STORY SECTION */}
                <div style={{
                    padding: '2rem 1.5rem',
                    background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0f9ff 100%)',
                    borderBottom: '1px solid #d1fae5'
                }}>
                    <h2 style={{
                        fontSize: '1.5rem', fontWeight: 800, color: '#065f46',
                        marginBottom: '0.5rem', textAlign: 'center', lineHeight: 1.3
                    }}>
                        Help feed students at {school.name}
                    </h2>
                    <p style={{
                        fontSize: '1.0625rem', color: '#047857', textAlign: 'center',
                        fontStyle: 'italic', marginBottom: '1rem', fontWeight: 500
                    }}>
                        No child should have to learn on an empty stomach.
                    </p>
                    <p style={{
                        fontSize: '0.9375rem', color: '#374151', textAlign: 'center',
                        maxWidth: '500px', margin: '0 auto 1.25rem auto', lineHeight: 1.6
                    }}>
                        Some students come to school without enough to eat. A warm lunch helps them focus, learn, and feel included.
                    </p>

                    {/* Trust Chips */}
                    <div style={{
                        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
                        gap: '0.5rem', marginBottom: '0.75rem'
                    }}>
                        {['$3.50 = 1 lunch', '100% goes to lunches', 'PTA partnered'].map(chip => (
                            <span key={chip} style={{
                                display: 'inline-block', padding: '0.3rem 0.75rem',
                                backgroundColor: 'white', borderRadius: '999px',
                                fontSize: '0.8125rem', fontWeight: 600, color: '#047857',
                                border: '1px solid #a7f3d0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                            }}>
                                {chip}
                            </span>
                        ))}
                    </div>

                    <p style={{
                        textAlign: 'center', fontSize: '0.75rem', color: '#6b7280',
                        margin: 0, fontStyle: 'italic'
                    }}>
                        🔒 Student identities are always protected.
                    </p>
                </div>

                <DonationForm school={school} mealsFunded={mealsFunded} goalMeals={goalMeals} />

                {/* 6) WHAT HAPPENS NEXT */}
                <div style={{ padding: '0 1.5rem 2rem' }}>
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem',
                        textAlign: 'center', padding: '1.5rem', backgroundColor: '#f9fafb',
                        borderRadius: '12px', border: '1px solid #e5e7eb'
                    }}>
                        {[
                            {
                                icon: <svg width="28" height="28" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                                label: 'You donate'
                            },
                            {
                                icon: <svg width="28" height="28" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
                                label: 'PTA confirms lunch credits'
                            },
                            {
                                icon: <svg width="28" height="28" fill="none" stroke="#059669" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
                                label: 'Students receive meals'
                            }
                        ].map((step, i) => (
                            <div key={i}>
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '50%',
                                    backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', margin: '0 auto 0.5rem'
                                }}>
                                    {step.icon}
                                </div>
                                <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151', margin: 0, lineHeight: 1.3 }}>
                                    {step.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 8) TRANSPARENCY + TRUST FOOTER */}
                <div style={{ padding: "0 1.5rem 2rem" }}>
                    <div style={{
                        padding: '1.5rem', backgroundColor: '#fafafa', borderRadius: '12px',
                        border: '1px solid #e5e7eb'
                    }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', marginBottom: '0.75rem', textAlign: 'center' }}>
                            Your donation is secure and impactful
                        </h3>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            {[
                                '100% of your donation goes to student lunches',
                                'Managed in partnership with the school PTA',
                                'Student identities remain private',
                                'Secure payment processing'
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <svg width="16" height="16" fill="none" stroke="#059669" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span style={{ fontSize: '0.8125rem', color: '#374151' }}>{item}</span>
                                </div>
                            ))}
                        </div>
                        <p style={{
                            textAlign: 'center', fontSize: '0.75rem', color: '#6b7280',
                            marginTop: '1rem', marginBottom: 0
                        }}>
                            Questions? Contact the school PTA
                        </p>
                    </div>
                </div>

                {/* Original Trust Indicators */}
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
