import Link from 'next/link'
import { headers, cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default function Signup({
  searchParams,
}: {
  searchParams: { message: string }
}) {

    const signUp = async (formData: FormData) => {
        'use server'
    
        const origin = headers().get('origin')
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
    
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${origin}/auth/callback`,
          },
        })
    
        if (error) {
          return redirect(`/signup?message=Could not create new account for user because ${error.message}`)
        }
    
        return redirect('/login?message=Check email to continue sign in process')
      }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
    
      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signUp}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="btn btn-primary">
          Sign Up
        </button>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
        <button
          className="btn btn-primary"
        >
            <Link
            href="/login"
        >
          Sign In
          </Link>
        </button>
    </div>
  )
}
