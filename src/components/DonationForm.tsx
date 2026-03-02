"use client";
import { useState } from 'react';

interface School {
    id: string;
    name: string;
    slug: string;
    location: string;
    description: string | null;
    targetAmount: number;
    raisedAmount: number;
}

function pluralizeLunch(count: number) {
    return count === 1 ? 'lunch' : 'lunches';
}

export default function DonationForm({ school }: { school: School; mealsFunded?: number; goalMeals?: number }) {
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

    const totalRaised = Number.isFinite(school.raisedAmount) ? school.raisedAmount : 0;
    const goalAmount = Number.isFinite(school.targetAmount) ? school.targetAmount : 0;
    const mealsFunded = Math.floor(totalRaised / mealCost);
    const goalMeals = Math.ceil(goalAmount / mealCost);
    const mealsRemaining = Math.max(0, goalMeals - mealsFunded);
    const progressPercent = goalAmount > 0 ? Math.min(100, Math.round((totalRaised / goalAmount) * 100)) : 0;

    // Derive display values for CTA
    const ctaMeals = donationType === 'monthly' ? selectedAmount : Math.floor(selectedAmount / mealCost);
    const ctaAmount = donationType === 'monthly' ? (selectedAmount * mealCost).toFixed(2) : selectedAmount;

    return (
        <div style={{ padding: "var(--spacing-md) var(--spacing-md) var(--spacing-lg)" }}>
            {/* Goal Progress - Elevated Design */}
            <div style={{ marginBottom: "2.5rem", padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', alignItems: 'baseline' }}>
                    <div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: 0, marginBottom: 0 }}>
                            {mealsFunded.toLocaleString()} of {goalMeals.toLocaleString()} lunches
                        </p>
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-color)' }}>{progressPercent}%</span>
                </div>
                <div style={{ backgroundColor: '#e5e7eb', borderRadius: '999px', height: '12px', width: '100%', overflow: 'hidden' }}>
                    <div style={{ backgroundColor: 'var(--primary-color)', height: '100%', width: `${progressPercent}%`, borderRadius: '999px', transition: 'width 1s ease-in-out' }}></div>
                </div>
                <p style={{
                    fontSize: '0.8125rem', color: '#059669', fontWeight: 600,
                    marginTop: '0.75rem', marginBottom: 0, textAlign: 'center'
                }}>
                    {mealsFunded === 0
                        ? `${goalMeals.toLocaleString()} ${pluralizeLunch(goalMeals)} still needed`
                        : mealsRemaining > 0
                            ? `${mealsRemaining.toLocaleString()} ${pluralizeLunch(mealsRemaining)} still needed • Goal: ${goalMeals.toLocaleString()}`
                            : 'Goal reached — thank you!'
                    }
                </p>
                <p style={{
                    fontSize: '0.75rem', color: 'var(--text-muted)',
                    marginTop: '0.25rem', marginBottom: 0, textAlign: 'center'
                }}>
                    Each lunch costs $3.50.
                </p>
            </div>

            {/* 7) SOCIAL PROOF */}
            <div style={{
                textAlign: 'center', marginBottom: '1.5rem', padding: '0.75rem',
                backgroundColor: '#fffbeb', borderRadius: '10px', border: '1px solid #fde68a'
            }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#92400e', margin: 0 }}>
                    💛 Be one of the first supporters this month.
                </p>
            </div>

            {/* 3) WHY THIS MATTERS */}
            <div style={{
                marginBottom: '2rem', padding: '1.25rem 1.5rem',
                backgroundColor: '#fefce8', borderRadius: '12px',
                border: '1px solid #fef08a', textAlign: 'center'
            }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#854d0e', marginBottom: '0.5rem' }}>
                    Why this matters
                </h3>
                <p style={{
                    fontSize: '0.875rem', color: '#713f12', lineHeight: 1.6,
                    marginBottom: '0.5rem', maxWidth: '450px', margin: '0 auto 0.5rem auto'
                }}>
                    For some students, school lunch may be the only warm meal they receive that day. Your support helps students stay focused and feel included with their friends.
                </p>
                <p style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#854d0e', margin: 0 }}>
                    Even one lunch makes a difference.
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
                    {/* 4) UPGRADED HELPER TEXT */}
                    <p style={{ textAlign: 'center', marginBottom: '0.25rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        Just <strong>${mealCost.toFixed(2)}</strong> provides one student with a healthy school lunch.
                    </p>
                    <p style={{ textAlign: 'center', marginBottom: '1rem', color: '#6b7280', fontSize: '0.8125rem', fontStyle: 'italic' }}>
                        Pick a monthly amount to reliably cover lunches all month.
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

            {/* 5) CTA BUTTON WITH DYNAMIC COPY */}
            <button
                className="btn"
                style={{
                    width: "100%", fontSize: "1.125rem", padding: "1rem", borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(46, 125, 50, 0.4)'
                }}
                onClick={() => alert(`Redirecting to Stripe Checkout for ${donationType === 'monthly' ? '$' + (selectedAmount * mealCost).toFixed(2) + '/mo' : '$' + selectedAmount} ...`)}
            >
                {donationType === 'monthly'
                    ? `Feed ${selectedAmount} students every month — $${(selectedAmount * mealCost).toFixed(2)}`
                    : `Give ${ctaMeals} lunches today — $${ctaAmount}`
                }
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '1rem', marginBottom: 0 }}>
                Includes 0% LunchForward fee. 100% directly funds meals.
            </p>
        </div>
    );
}
