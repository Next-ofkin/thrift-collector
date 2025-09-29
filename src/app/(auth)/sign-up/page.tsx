'use client'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { toast } from 'sonner'

export default function SignUp() {
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'agent' | 'customer'>('customer')

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role } },
    })
    if (error) return toast.error(error.message)
    toast.success('Check your email for confirmation link!')
  }

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <h2 className="text-2xl font-bold">Create account</h2>
      <label className="form-control">
        <span className="label">Email</span>
        <input
          type="email"
          required
          className="input input-bordered"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label className="form-control">
        <span className="label">Password</span>
        <input
          type="password"
          required
          className="input input-bordered"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <div className="form-control">
        <span className="label">I am a...</span>
        <div className="flex gap-4">
          <label className="cursor-pointer label">
            <input
              type="radio"
              name="role"
              className="radio radio-primary"
              checked={role === 'agent'}
              onChange={() => setRole('agent')}
            />
            <span className="label-text ml-2">Agent</span>
          </label>
          <label className="cursor-pointer label">
            <input
              type="radio"
              name="role"
              className="radio radio-primary"
              checked={role === 'customer'}
              onChange={() => setRole('customer')}
            />
            <span className="label-text ml-2">Customer</span>
          </label>
        </div>
      </div>
      <button className="btn btn-primary w-full">Sign up</button>
      <p className="text-center text-sm">
        Already have an account?{' '}
        <a href="/sign-in" className="link link-primary">
          Sign in
        </a>
      </p>
    </form>
  )
}