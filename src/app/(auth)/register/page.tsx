import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm bg-card border border-border p-6 rounded-2xl">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="text-zinc-400">Sign up to get started</p>
        </div>

        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-zinc-300">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="name"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-violet-500 mt-2"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="email"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-violet-500 mt-2"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-violet-500 mt-2"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-violet-600 py-3 font-medium text-white transition hover:bg-violet-500 cursor-pointer"
          >
            Register
          </button>
          <p className="mt-6 text-center text-sm text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-violet-400 hover:text-violet-300"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
