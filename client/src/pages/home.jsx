import { useAuth } from 'hooks/auth'

function Home() {
  // Redirect to /login if user is not logged in or redirect to /dashboard if user is logged in
  useAuth({ middleware: 'auth', redirect: '/login' })
  useAuth({ middleware: 'guest', redirect: '/dashboard' })

  return null
}

export default Home;
