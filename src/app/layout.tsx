import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            Sports Betting Evaluation
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/sports/basketball" className="text-sm font-medium transition-colors hover:text-primary">
              Basketball
            </Link>
            <Link href="/sports/baseball" className="text-sm font-medium transition-colors hover:text-primary">
              Baseball
            </Link>
            <Link href="/sports/hockey" className="text-sm font-medium transition-colors hover:text-primary">
              Hockey
            </Link>
            <Link href="/sports/golf" className="text-sm font-medium transition-colors hover:text-primary">
              Golf
            </Link>
            <Link href="/sports/tennis" className="text-sm font-medium transition-colors hover:text-primary">
              Tennis
            </Link>
          </nav>
          
          <div className="flex items-center gap-2">
            <Link href="/subscription">
              <Button variant="outline" size="sm">
                Upgrade
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="sm">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1">{children}</main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Sports Betting Evaluation. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
              Terms
            </Link>
            <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
              Privacy
            </Link>
            <Link href="/contact" className="underline underline-offset-4 hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
