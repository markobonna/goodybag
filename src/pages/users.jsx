import Head from 'next/head'
import Link from 'next/link'
import { Container } from '@/components/Container'

const products = [
  {
    id: 1,
    name: 'Makeup Happy Hour',
    details:
      'One evening, two services! Get an express manicure featuring summer ready LE VERNIS shades and a 20-minute makeup application with a beauty pro in this special edition of our classic Makeup Happy Hour.',
    href: '#',
    imageSrc:
      'https://images.prismic.io/atelier/2bbddc62-7b6b-44e0-898e-a2ba52df79b3_Events-Landing_Desktop.gif',
    imageAlt: 'Express manicure & makeup application.',
    price: '$200 MATIC',
  },
  {
    id: 2,
    name: 'Total Body Wellness Spa Package',
    details:
      '30 Minute Body Scrub, 60 Minute Body Wrap, 90 Minute Swedish Massage, 60 Minute Signature Facial, Revitalizing Eye Treatment',
    href: '#',
    imageSrc:
      'https://www.oasisdayspanyc.com/wp-content/uploads/2016/04/lounge-room-1.jpg',
    imageAlt: 'Total Body Wellness Spa Package.',
    price: '$500 USD',
  },
  {
    id: 3,
    name: 'Retinol Anti-Aging Serum',
    details:
      'A powerful retinol that is released slowly to help promote a smoother, more radiant complexion—with less irritation.',
    href: '#',
    imageSrc:
      'https://www.sephora.com/productimages/sku/s2211498-main-zoom.jpg?imwidth=1224',
    imageAlt: 'The INKEY List.',
    price: '$175 MATIC',
  },
]

function Users() {
  return (
    <Container>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-xl font-bold text-gray-900">Your GoodyBag</h2>

          <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id}>
                <div className="relative">
                  <div className="relative h-72 w-full overflow-hidden rounded-lg">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="relative mt-4">
                    <h3 className="text-sm font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.details}
                    </p>
                  </div>
                  <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                    />
                    <p className="relative text-lg font-semibold text-white">
                      {product.price}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <a
                    href={product.href}
                    className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                  >
                    Redeem<span className="sr-only">, {product.name}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Users
