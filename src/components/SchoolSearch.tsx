"use client";
import { useState } from 'react';

interface School {
    id: string;
    name: string;
    location: string;
    slug: string;
}

export default function SchoolSearch({ initialQuery, schools }: { initialQuery: string, schools: School[] }) {
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    // Filter schools based on search
    const filteredSchools = schools.filter(school =>
        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const totalSchools = filteredSchools.length;
    const totalPages = Math.ceil(totalSchools / itemsPerPage);
    const indexOfLastSchool = currentPage * itemsPerPage;
    const indexOfFirstSchool = indexOfLastSchool - itemsPerPage;
    const currentSchools = filteredSchools.slice(indexOfFirstSchool, indexOfLastSchool);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        const section = document.getElementById('schools-list');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="schools" style={{ backgroundColor: '#ffffff', padding: '4rem 0' }}>
            <div className="container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <header style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginBottom: '3.5rem',
                    borderBottom: 'none',
                    position: 'static',
                    padding: 0,
                    backgroundColor: 'transparent'
                }}>
                    <h2 style={{ fontSize: '2.25rem', fontWeight: '800', color: '#111827', marginBottom: '2rem' }}>Find a School to Support</h2>

                    <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '999px', padding: '0.75rem 1.5rem', backgroundColor: '#ffffff', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', transition: 'all 0.2s' }}>
                            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#9ca3af', marginRight: '0.75rem' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <input
                                type="text"
                                placeholder="Search by school or district (ex: Hawk Elementary or Denton ISD)"
                                style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '1rem', color: '#111827' }}
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </header>

                <div id="schools-list">
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem', borderBottom: '2px solid #f3f4f6', paddingBottom: '0.5rem' }}>All Schools</h3>

                    <div className="grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '2rem',
                        marginTop: '0'
                    }}>
                        <style dangerouslySetInnerHTML={{
                            __html: `
                            @media (max-width: 639px) {
                                #schools .grid { grid-template-columns: 1fr !important; }
                            }
                            @media (min-width: 640px) and (max-width: 1023px) {
                                #schools .grid { grid-template-columns: repeat(2, 1fr) !important; }
                            }
                            @media (min-width: 1024px) {
                                #schools .grid { grid-template-columns: repeat(3, 1fr) !important; }
                            }
                        `}} />

                        {currentSchools.length > 0 ? (
                            currentSchools.map((school) => (
                                <div key={school.id} style={{
                                    backgroundColor: '#ffffff',
                                    borderRadius: '12px',
                                    padding: '2rem',
                                    border: '1px solid #e5e7eb',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    height: '100%',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }} onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-4px)';
                                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                                }} onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.05)';
                                }}>
                                    <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>{school.name}</h4>
                                    <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1.5rem' }}>{school.location}</p>

                                    <a
                                        href={`/${school.slug}`}
                                        className="btn"
                                        style={{
                                            width: '100%',
                                            marginTop: 'auto',
                                            padding: '0.625rem 1rem',
                                            borderRadius: '8px',
                                            fontSize: '0.875rem'
                                        }}
                                    >
                                        Donate Lunches
                                    </a>
                                </div>
                            ))
                        ) : (
                            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                                <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>No schools found matching <strong>"{searchQuery}"</strong>.</p>
                                <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={() => { setSearchQuery(''); setCurrentPage(1); }}>Clear Search</button>
                            </div>
                        )}
                    </div>
                </div>

                {totalSchools > 0 && (
                    <div style={{ marginTop: '3rem', borderTop: '1px solid #e5e7eb', paddingTop: '2rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                            <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                                Showing <strong>{indexOfFirstSchool + 1}–{Math.min(indexOfLastSchool, totalSchools)}</strong> of <strong>{totalSchools}</strong> Schools
                            </p>

                            {totalPages > 1 && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '6px',
                                            border: '1px solid #d1d5db',
                                            backgroundColor: '#ffffff',
                                            color: currentPage === 1 ? '#d1d5db' : '#374151',
                                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                            fontSize: '0.875rem',
                                            fontWeight: '500'
                                        }}
                                    >
                                        &larr; Previous
                                    </button>

                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                                        <button
                                            key={number}
                                            onClick={() => handlePageChange(number)}
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '6px',
                                                border: '1px solid',
                                                borderColor: currentPage === number ? 'var(--primary-color)' : '#d1d5db',
                                                backgroundColor: currentPage === number ? 'var(--primary-color)' : '#ffffff',
                                                color: currentPage === number ? '#ffffff' : '#374151',
                                                cursor: 'pointer',
                                                fontSize: '0.875rem',
                                                fontWeight: '600'
                                            }}
                                        >
                                            {number}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '6px',
                                            border: '1px solid #d1d5db',
                                            backgroundColor: '#ffffff',
                                            color: currentPage === totalPages ? '#d1d5db' : '#374151',
                                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                            fontSize: '0.875rem',
                                            fontWeight: '500'
                                        }}
                                    >
                                        Next &rarr;
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
