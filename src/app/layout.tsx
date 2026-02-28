import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LunchForward | Sponsor a school lunch in your community',
  description: 'Join LunchForward to clear lunch debt and ensure every child has access to a nutritious meal, no questions asked.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <a href="/" className="logo">LunchForward</a>
          <nav>
            <a href="/#schools">Schools</a>
            <a href="/#pilot">Pilot</a>
          </nav>
        </header>

        <main>
          {children}
        </main>

        <footer>
          <div className="container">
            <p>&copy; 2026 LunchForward. All rights reserved.</p>
            <p><a href="/#privacy">Privacy</a> • <a href="mailto:hello@lunchforward.net">Contact</a> • <a href="/dashboard">School Portal</a></p>
          </div>
        </footer>
      </body>
    </html>
  )
}
