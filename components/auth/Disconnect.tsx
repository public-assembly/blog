import { useAuth } from 'hooks/useAuth'

export default function Disconnect() {
  const { logout, isConnected, ensName } = useAuth()
  if (!isConnected) return null
  return (
    <div className="flex flex-wrap">
      <div className="flex w-full justify-end gap-2 text-[14px]">
        {ensName}
      </div>
      <button
        className="connect__button flex w-full justify-end text-[14px] text-gray-600 "
        onClick={() => logout()}>
        disconnect
      </button>
    </div>
  )
}