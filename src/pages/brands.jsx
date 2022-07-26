import { Fragment } from 'react'
import { Button } from '../components/Button'
import { Container } from '@/components/Container'

const locations = [
  {
    name: 'Events',
    people: [
      {
        name: 'Makeup Happy Hour',
        title: 'Express manicure & makeup application.',
        email: '$200 MATIC',
        role: '40/50',
        status: 'Active',
      },
    ],
  },
  {
    name: 'Services',
    people: [
      {
        name: 'Oasis Day Spa',
        title: 'Total Body Wellness Spa Package',
        email: '$500 USD',
        role: '500/1000',
        status: 'Active',
      },
    ],
  },
  {
    name: 'Products',
    people: [
      {
        name: 'The INKEY List',
        title: 'Retinol Anti-Aging Serum',
        email: '$175 MATIC',
        role: '1000/1500',
        status: 'Active',
      },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Brands() {
  return (
    <Container>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Oasis Day Spa's GoodyBag Campaigns
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all your brand's Events, Services, and Product
              Campaigns.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Button href="" color="blue">
              <span>Create a New Campaign</span>
            </Button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full">
                  <thead className="bg-white">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Reward
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Redeemed
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {locations.map((location) => (
                      <Fragment key={location.name}>
                        <tr className="border-t border-gray-200">
                          <th
                            colSpan={5}
                            scope="colgroup"
                            className="bg-gray-50 px-4 py-2 text-left text-sm font-semibold text-gray-900 sm:px-6"
                          >
                            {location.name}
                          </th>
                        </tr>
                        {location.people.map((person, personIdx) => (
                          <tr
                            key={person.email}
                            className={classNames(
                              personIdx === 0
                                ? 'border-gray-300'
                                : 'border-gray-200',
                              'border-t'
                            )}
                          >
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {person.name}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {person.title}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {person.email}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {person.role}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                {person.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Brands
