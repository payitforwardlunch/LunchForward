"use client";
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock list of schools
  const allSchools = [
    { id: 'providence', name: 'Providence Elementary', location: 'Providence, RI', match: true },
    { id: 'lincoln', name: 'Lincoln High School', location: 'Lincoln, NE', match: false },
    { id: 'ps118', name: 'PS 118', location: 'Brooklyn, NY', match: false },
    { id: 'oakridge', name: 'Oakridge Middle', location: 'Austin, TX', match: false },
  ];

  // Simple filter logic based on name or location
  const filteredSchools = allSchools.filter(school =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <section className="hero text-center">
        <div className="container">
          <h1>Sponsor a school lunch for a student in your community.</h1>
          <p>Join LunchForward to clear lunch debt and ensure every child has access to a nutritious meal, no questions asked.</p>
          <div className="button-group">
            <a href="#schools" className="btn">Find a School</a>
            <a href="#pilot" className="btn btn-outline">Request a Pilot</a>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="container">
        <h2 className="text-center">How It Works</h2>
        <div className="grid text-center">
          <div className="card">
            <h3>1. Find Your School</h3>
            <p>Search for a local school struggling with unpaid lunch balances.</p>
          </div>
          <div className="card">
            <h3>2. Make a Donation</h3>
            <p>Give whatever you can. 100% of public donations go directly to the school program.</p>
          </div>
          <div className="card">
            <h3>3. Kids Eat Free</h3>
            <p>Schools use the funds to cover negative balances, keeping kids fed without stigma.</p>
          </div>
        </div>
      </section>

      <section id="schools" className="container" style={{ background: "var(--white)", padding: "var(--spacing-md)", borderRadius: "var(--border-radius)", marginBottom: "var(--spacing-lg)" }}>
        <h2 className="text-center">Find a School</h2>
        <p className="text-center">Search for a local school struggling with unpaid lunch balances.</p>

        <div style={{ maxWidth: '500px', margin: '0 auto 2rem auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '2px solid var(--border-color)', borderRadius: '999px', padding: '0.5rem 1.25rem', backgroundColor: '#f9fafb', transition: 'border-color 0.2s' }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-muted)', marginRight: '0.75rem' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input
              type="text"
              placeholder="Search by school name or city..."
              style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '1rem', padding: '0.5rem 0' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid">
          {filteredSchools.length > 0 ? (
            filteredSchools.map((school) => (
              <div key={school.id} className="card text-center" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>{school.name}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{school.location}</p>
                </div>
                <a
                  href={school.id === 'providence' ? '/providence' : '#'}
                  className="btn"
                  style={{ marginTop: '1rem', width: '100%' }}
                  onClick={(e) => {
                    if (school.id !== 'providence') {
                      e.preventDefault();
                      alert('Placeholder: This school page is not built yet (MVP scope). Try Providence Elementary!');
                    }
                  }}
                >
                  Donate to {school.name.split(' ')[0]}
                </a>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem 0', color: 'var(--text-muted)' }}>
              <p>No schools found matching <strong>"{searchQuery}"</strong>.</p>
              <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={() => setSearchQuery('')}>Clear Search</button>
            </div>
          )}
        </div>
      </section>

      <section id="privacy" className="container text-center">
        <h2>Privacy & Trust</h2>
        <p><strong>Zero Student Data:</strong> We never track, store, or receive individual student data.</p>
        <p><strong>Stripe-Ready:</strong> Industry-standard secure payments processing coming soon.</p>
        <p><strong>Transparent:</strong> We work directly with school districts to ensure funds go solely to student lunch accounts.</p>
      </section>

      <section id="faq" className="container">
        <h2 className="text-center">Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>Is my donation tax-deductible?</h3>
          <p>Yes, all donations go through our partnered 501(c)(3) programs or directly to the district.</p>
        </div>
        <div className="faq-item">
          <h3>Do you take a cut of the donation?</h3>
          <p>No. 100% of your listed donation amount goes directly to the school. We only add an optional tip covering processing fees.</p>
        </div>
        <div className="faq-item">
          <h3>How do you pick schools?</h3>
          <p>We pilot with schools that reach out to us and have an established need for lunch debt relief.</p>
        </div>
        <div className="faq-item">
          <h3>Can I track my specific student?</h3>
          <p>No. To protect student privacy, we pool funds to cover school-wide or district-wide negative balances.</p>
        </div>
      </section>

      <section id="pilot" className="container">
        <h2 className="text-center">Request a Pilot</h2>
        <p className="text-center">Are you a school administrator? Fill this out to start a pilot.</p>
        <form action="#" method="get" onSubmit={(e) => { e.preventDefault(); alert('Form submitted (Placeholder)'); }}>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="School Email" required />
          <input type="text" placeholder="School Name" required />
          <button type="submit" className="btn">Request Pilot</button>
        </form>
      </section>

      <section id="contact" className="container text-center" style={{ marginBottom: "var(--spacing-sm)" }}>
        <h2>Contact Us</h2>
        <p>Have questions? Reach out to us at <a href="mailto:hello@lunchforward.net">hello@lunchforward.net</a></p>
      </section>
    </>
  );
}
