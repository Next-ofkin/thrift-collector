export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid place-items-center bg-base-200">
      <div className="card w-full max-w-md shadow-lg bg-base-100 p-8">
        {children}
      </div>
    </div>
  )
}