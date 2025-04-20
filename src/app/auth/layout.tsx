import Link from 'next/link'

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            Sports Betting Evaluation
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}
