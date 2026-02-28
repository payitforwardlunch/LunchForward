import prisma from '@/lib/prisma';
import SchoolSearch from '@/components/SchoolSearch';

export default async function Home() {
  // Fetch schools from Prisma
  const schools = await prisma.school.findMany({
    orderBy: {
      name: 'asc'
    }
  });

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

      <SchoolSearch initialQuery="" schools={schools} />

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
        <form action="#" method="get">
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
