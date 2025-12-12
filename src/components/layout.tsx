import { Outlet } from 'react-router-dom'
import Navbar from '@/components/navbar'
import ProductDrawer from '@/components/product-drawer'

export default function Layout() {
  return (
    <>
    <Navbar />
      <main className='py-3'>
        <Outlet />
      </main>
      <ProductDrawer />
    </>
      
  )
}