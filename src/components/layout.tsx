import { Outlet } from 'react-router-dom'
import Navbar from '@/components/navbar'
export default function Layout() {
  return (
    <>
    <Navbar />
      <main className='py-3'>
        <Outlet />
      </main>
    </>
      
  )
}