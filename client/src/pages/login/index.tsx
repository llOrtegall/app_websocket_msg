export default function Login() {
  return (
    <section className='h-screen w-screen flex items-center justify-center'>
      <h1>Login</h1>
      <form>
        <input type='email' placeholder='Email' />
        <input type='password' placeholder='Password' />
        <button type='submit'>Login</button>
      </form>
    </section>
  )
}