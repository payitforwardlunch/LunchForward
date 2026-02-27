"use client";
import { useState } from 'react';

export default function ProvidencePage() {
    const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('monthly');
    const [selectedAmount, setSelectedAmount] = useState<number>(20); // Default 20 meals
    const mealCost = 3.50;

    const monthlyOptions = [
        { meals: 5, label: '5 meals/mo' },
        { meals: 10, label: '10 meals/mo' },
        { meals: 20, label: '20 meals/mo', popular: true },
        { meals: 50, label: '50 meals/mo' },
    ];

    const oneTimeOptions = [
        { amount: 10 },
        { amount: 25 },
        { amount: 50 },
        { amount: 100 },
    ];

    return (
        <section className="container" style={{ maxWidth: "700px", paddingTop: "var(--spacing-lg)", paddingBottom: "var(--spacing-lg)" }}>
            <div className="card" style={{ padding: 0, overflow: 'hidden', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}>
                {/* Header Banner */}
                <div style={{ backgroundColor: 'var(--primary-hover)', color: 'white', padding: 'var(--spacing-lg) var(--spacing-md)', textAlign: 'center', position: 'relative' }}>

                    {/* Decorative Background Pattern */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                    <h1 style={{ color: 'white', marginBottom: '0.5rem', position: 'relative', zIndex: 1 }}>Providence Elementary</h1>
                    <p style={{ fontSize: "1.125rem", color: '#e5e7eb', margin: 0, maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', position: 'relative', zIndex: 1 }}>
                        Sponsor school lunches to clear student debt and ensure every child in our Providence community gets a healthy meal.
                    </p>
                </div>

                <div style={{ padding: "var(--spacing-md) var(--spacing-md) var(--spacing-lg)" }}>

                    {/* Goal Progress - Elevated Design */}
                    <div style={{ marginBottom: "2.5rem", padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'baseline' }}>
                            <div>
                                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary-color)' }}>$650</span>
                                <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginLeft: '0.375rem' }}>raised of $1,000 goal</span>
                            </div>
                            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-color)' }}>65%</span>
                        </div>
                        <div style={{ backgroundColor: '#e5e7eb', borderRadius: '999px', height: '12px', width: '100%', overflow: 'hidden' }}>
                            <div style={{ backgroundColor: 'var(--primary-color)', height: '100%', width: '65%', borderRadius: '999px', transition: 'width 1s ease-in-out' }}></div>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.75rem', marginBottom: 0, textAlign: 'center' }}>
                            <strong>94</strong> community members have joined this month.
                        </p>
                    </div>

                    <h2 style={{ textAlign: 'center', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Choose your impact</h2>

                    {/* Donation Type Toggle */}
                    <div style={{ display: 'flex', backgroundColor: '#f3f4f6', padding: '0.375rem', borderRadius: '999px', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem auto' }}>
                        <button
                            onClick={() => { setDonationType('monthly'); setSelectedAmount(20); }}
                            style={{
                                flex: 1, padding: '0.75rem 1rem', borderRadius: '999px', border: 'none',
                                fontSize: '0.9375rem', fontWeight: 600, transition: 'all 0.2s', cursor: 'pointer',
                                backgroundColor: donationType === 'monthly' ? 'white' : 'transparent',
                                color: donationType === 'monthly' ? 'var(--primary-color)' : 'var(--text-muted)',
                                boxShadow: donationType === 'monthly' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                            }}
                        >
                            Monthly Subscription ✨
                        </button>
                        <button
                            onClick={() => { setDonationType('one-time'); setSelectedAmount(50); }}
                            style={{
                                flex: 1, padding: '0.75rem 1rem', borderRadius: '999px', border: 'none',
                                fontSize: '0.9375rem', fontWeight: 600, transition: 'all 0.2s', cursor: 'pointer',
                                backgroundColor: donationType === 'one-time' ? 'white' : 'transparent',
                                color: donationType === 'one-time' ? 'var(--text-color)' : 'var(--text-muted)',
                                boxShadow: donationType === 'one-time' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                            }}
                        >
                            One-time Gift
                        </button>
                    </div>

                    {/* Monthly Options Grid */}
                    {donationType === 'monthly' ? (
                        <div>
                            <p style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                A meal costs exactly <strong>${mealCost.toFixed(2)}</strong>. How many students do you want to feed each month?
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                {monthlyOptions.map(opt => (
                                    <button
                                        key={opt.meals}
                                        onClick={() => setSelectedAmount(opt.meals)}
                                        style={{
                                            position: 'relative',
                                            padding: '1.25rem 1rem',
                                            borderRadius: '12px',
                                            border: `2px solid ${selectedAmount === opt.meals ? 'var(--primary-color)' : 'var(--border-color)'}`,
                                            backgroundColor: selectedAmount === opt.meals ? '#f0fdf4' : 'white',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {opt.popular && (
                                            <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--primary-color)', color: 'white', fontSize: '0.625rem', fontWeight: 700, padding: '0.125rem 0.5rem', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                Most Popular
                                            </div>
                                        )}
                                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-color)', marginBottom: '0.25rem' }}>
                                            {opt.label}
                                        </div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                            ${(opt.meals * mealCost).toFixed(2)}/mo
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '1.5rem' }}>
                                {oneTimeOptions.map(opt => (
                                    <button
                                        key={opt.amount}
                                        onClick={() => setSelectedAmount(opt.amount)}
                                        style={{
                                            padding: '1rem 0',
                                            borderRadius: '12px',
                                            border: `2px solid ${selectedAmount === opt.amount ? 'var(--text-color)' : 'var(--border-color)'}`,
                                            backgroundColor: selectedAmount === opt.amount ? '#f3f4f6' : 'white',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            textAlign: 'center',
                                            fontSize: '1.125rem',
                                            fontWeight: 600,
                                            color: 'var(--text-color)'
                                        }}
                                    >
                                        ${opt.amount}
                                    </button>
                                ))}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '0.75rem 1rem', marginBottom: '1.5rem' }}>
                                <span style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-muted)', marginRight: '0.5rem' }}>$</span>
                                <input
                                    type="number"
                                    placeholder="Other Amount"
                                    style={{ border: 'none', padding: 0, fontSize: '1.125rem', fontWeight: 600, width: '100%', outline: 'none' }}
                                    onChange={(e) => {
                                        const val = parseInt(e.target.value);
                                        if (!isNaN(val)) setSelectedAmount(val);
                                    }}
                                    onFocus={() => setSelectedAmount(0)}
                                />
                            </div>
                        </div>
                    )}

                    {/* Checkout Button */}
                    <button
                        className="btn"
                        style={{
                            width: "100%", fontSize: "1.125rem", padding: "1rem", borderRadius: '12px',
                            boxShadow: '0 4px 6px -1px rgba(46, 125, 50, 0.4)'
                        }}
                        onClick={() => alert(`Redirecting to Stripe Checkout for ${donationType === 'monthly' ? '$' + (selectedAmount * mealCost).toFixed(2) + '/mo' : '$' + selectedAmount} ...`)}
                    >
                        {donationType === 'monthly'
                            ? `Subscribe Monthly &mdash; $${(selectedAmount * mealCost).toFixed(2)}`
                            : `Donate $${selectedAmount} Once`
                        }
                    </button>

                    <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '1rem', marginBottom: 0 }}>
                        Includes 0% LunchForward fee. 100% directly funds meals.
                    </p>

                    {/* Trust Indicators */}
                    <div style={{ marginTop: "2.5rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border-color)", display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ flexShrink: 0, padding: '0.75rem', backgroundColor: '#f0fdf4', borderRadius: '50%', color: 'var(--primary-color)' }}>
                            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        <div>
                            <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem", color: "var(--text-color)" }}>Bank-Grade Security</h3>
                            <p style={{ fontSize: "0.875rem", marginBottom: 0, color: "var(--text-muted)", lineHeight: 1.5 }}>Payments are securely processed by Stripe. We never store credit card information or individual student data. Funds are distributed directly to Providence District.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
