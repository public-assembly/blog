import Link from 'next/link'
import { useRouter } from 'next/router'

const pages = [
  {
    slug: '/',
    title: 'index',
  },  
]

export function Navigation() {
  const router = useRouter()

  return (
    <nav className="text-[45px] flex flex-row items-center gap-8 ">
      {pages.map((page) => (
        <Link passHref href={page.slug} key={page.slug}>
          {/* <a
            className="hover:underline"
            style={{
              fontWeight: router.asPath === page.slug ? 'bold' : 'normal',
            }}>
            {page.title}
          </a> */}
          <div
            className="hover:cursor-pointer"
            style={{
              fontWeight: router.asPath === page.slug ? 'normal' : 'normal',
            }}>
            {page.title}
          </div>            
        </Link>
      ))}
    </nav>
  )
}
