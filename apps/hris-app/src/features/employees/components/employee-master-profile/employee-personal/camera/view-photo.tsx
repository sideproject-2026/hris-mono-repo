import ImagePhoto from '@/components/custom/misc/ImagePhoto'

const ViewPhoto = ({
  employeeId,
  hasPhoto = false,
}: {
  employeeId: string
  hasPhoto?: boolean
}) => {
  const photoUrl = `${import.meta.env.VITE_API_URL}/employees/view-photo/${employeeId}`

  return (
    <div className="w-full border rounded-lg bg-gray-200 flex flex-col items-center justify-center">
      <ImagePhoto
        src={photoUrl} // Cache buster to ensure latest photo is fetched
        alt={hasPhoto ? 'Employee Photo' : 'No Photo Available'}
        className="w-full object-cover rounded-lg"
        isCaptured={hasPhoto} // Indicate that this is a captured photo to bypass cache
      />
    </div>
  )
}

export default ViewPhoto
