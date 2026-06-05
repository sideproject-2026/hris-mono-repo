import { GroupContainer } from '@hris/shared-ui'
import EmployeeWebcam from './camera/employee-webcam'

const EmployeeProfilePicture = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <GroupContainer title="profile picture">
        <div className="w-full border rounded-lg bg-gray-200 flex flex-col items-center justify-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png"
            alt=""
            className="w-full object-cover rounded-lg"
          />
        </div>
        <EmployeeWebcam />
      </GroupContainer>
    </div>
  )
}

export default EmployeeProfilePicture
