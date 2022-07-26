import { Container } from '@/components/Container'
import { NFTStorage } from 'nft.storage'

const endpoint = 'https://api.nft.storage'
const NFTSTORAGE_KEY = process.env.NFTSTORAGE_KEY

async function mintNFT({
  contract,
  ownerAddress,
  provider,
  gasPrice,
  setStatus,
  image,
  name,
  description,
  type,
  contractnumber,
  price,
  redeemablenumber,
}) {
  const client = new NFTStorage({ token: NFTSTORAGE_KEY })
  setStatus('Uploading to nft.storage...')
  const metadata = await client.store({
    name,
    description,
    image,
    type,
    contractnumber,
    price,
    redeemablenumber,
  })
  setStatus(`Upload complete! Minting token with metadata URI: ${metadata.url}`)
  const metadataURI = metadata.url.replace(/^ipfs:\/\//, '')
  const transactor = Transactor(provider, gasPrice)
  const tx = await transactor(contract.mintToken(ownerAddress, metadataURI))

  setStatus('Blockchain transaction sent, waiting confirmation...')
  const receipt = await tx.wait()
  let tokenId = null
  for (const event of receipt.events) {
    if (event.event !== 'Transfer') {
      continue
    }
    tokenId = event.args.tokenId.toString()
    break
  }
  setStatus(`Minted token #${tokenId}`)
  return tokenId
}

export default function NewCampaign({ gasPrice, signer, provider, price }) {
  const address = contract ? contract.address : ''

  const [file, setFile] = useState(null)
  const [previewURL, setPreviewURL] = useState(null)
  const [nftName] = useState('')
  const [description] = useState('')

  const [minting, setMinting] = useState(false)
  const [status, setStatus] = useState('')
  const [tokenId, setTokenId] = useState(null)

  const beforeUpload = (file, fileList) => {
    console.log(file, fileList)
    setFile(file)
    setPreviewURL(URL.createObjectURL(file))
    return false
  }
  const mintEnabled = file != null && !!nftName

  const preview = previewURL ? (
    <img src={previewURL} style={{ maxWidth: '800px' }} />
  ) : (
    <div />
  )

  const startMinting = () => {
    console.log(`minting nft with name ${nftName}`)
    setMinting(true)
    signer.getAddress().then((ownerAddress) => {
      mintNFT({
        contract,
        provider,
        ownerAddress,
        gasPrice,
        setStatus,
        name: nftName,
        image: file,
        description,
        type,
        contractnumber,
        price,
        redeemablenumber,
      }).then((newTokenId) => {
        setMinting(false)
        console.log('minting complete')
        setTokenId(newTokenId)
      })
    })
  }

  const minterForm = (
    <Container>
      <form className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Create a New Campaign
              </h3>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rare Reward Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="rewardname"
                    id="rewardname"
                    autoComplete="rewardname"
                    className="block  min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rare Reward Type
                </label>
                <div className="mt-1">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option>Event</option>
                    <option>Service</option>
                    <option>Product</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Polygon NFT community Contract #
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block  min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rare Reward Price
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block  min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  # of Redeemable Rewards
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block  min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rare Reward Details
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={''}
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rare Reward Hero Image
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              disabled={!mintEnabled}
              onClick={startMinting}
            >
              {' '}
              {minting}
              Create
            </button>
          </div>
        </div>
      </form>
    </Container>
  )
}
