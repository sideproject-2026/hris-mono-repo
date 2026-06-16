import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { getEmployeePhotoQueryOptions } from '@/features/employee-master/employees/hooks/queries/useEmployee'

const FALLBACK_SRC = '/img/no-picture.svg'

const ViewPhoto = ({
  employeeId,
  hasPhoto = false,
}: {
  employeeId: string
  hasPhoto?: boolean
}) => {
  
  const { data: photoBlob, isLoading } = useQuery(
    getEmployeePhotoQueryOptions(employeeId, hasPhoto),
  )

  // Derive a fresh object URL from the cached blob and revoke only our own URL
  // on unmount, so the cached blob survives tab switches without refetching.
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)
  useEffect(() => {
    if (!photoBlob) {
      setPhotoUrl(null)
      return
    }
    const objectUrl = URL.createObjectURL(photoBlob)
    setPhotoUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [photoBlob])

  return (
    <div className="w-full border rounded-lg bg-gray-200 flex flex-col items-center justify-center">
      {isLoading ? (
        <div className="flex items-center justify-center w-full aspect-square">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <img
          src={photoUrl ?? FALLBACK_SRC}
          alt={hasPhoto ? 'Employee Photo' : 'No Photo Available'}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            if (e.currentTarget.src !== FALLBACK_SRC) {
              e.currentTarget.src = FALLBACK_SRC
            }
          }}
          className={cn('w-full object-cover rounded-lg')}
        />
      )}
    </div>
  )
}

export default ViewPhoto
