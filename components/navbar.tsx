import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Navbar = () => {
  const navigation = [
    { name: 'Progetto', href: '/progetto', prod: true },
    { name: 'Sentieri', href: '/sentieri', prod: true },
    { name: 'Sentieri Aumentati', href: '/sentieri-aumentati', prod: true },
    { name: 'Contatti', href: '/contatti', prod: true },
  ]
  const router = useRouter()
  const currentRoute = router.pathname
  return (
    <div className="container flex justify-between">
      <Link href="/">
        <Image src="/logo_sentieri.png" height={250} width={100} alt="" />
      </Link>

      <ul className="hidden sm:flex sm:flex-row">
        {navigation.map((item, index) => (
          <li key={index} className="p-4">
            <Link href={item.href}>
              <span
                className={`
                              ${
                                currentRoute === item.href
                                  ? 'bg-gray-300 text-black'
                                  : 'text-black hover:bg-secondary-400/80 hover:text-gray-500'
                              }
                              rounded-md px-3 py-2 `}
                aria-current={item.prod ? 'page' : undefined}
              >
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <input type="text" className="h-5 p-4 my-3 bg-gray-400 text-black rounded-lg" placeholder="search" />
    </div>
  )
}

export default Navbar
