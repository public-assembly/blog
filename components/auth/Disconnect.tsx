import { useAuth } from 'hooks/useAuth'

export default function Disconnect() {
  const { logout, isConnected, ensName } = useAuth()
  if (!isConnected) return null
  return (
    <div>
      <button
        className="connect__button"
        onClick={() => logout()}>
        disconnect
      </button>
            <div className="flex justify-end gap-2 text-sm">
      {ensName}
      </div>
    </div>
  )
}