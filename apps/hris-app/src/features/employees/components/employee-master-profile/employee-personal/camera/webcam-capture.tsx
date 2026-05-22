import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useEmployeeProfileContext } from '@/features/employees/components/employee-master-profile/employee-personal/employee-personal-provider'
import { useUploadPictureMutation } from '@/features/employees/hooks/useEmployee'
import { Camera, CameraIcon, Loader2, AlertCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { toast } from 'sonner'

const videoConstraints = {
  width: 500,
  height: 500,
  facingMode: 'user',
}

const WebCamCapture = () => {
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [cameraError, setCameraError] = useState(false)
  const { employeePersonalInfo, onRefresh } = useEmployeeProfileContext()
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const { mutateAsync: uploadPicture, isPending } = useUploadPictureMutation()

  const webcamRef = useRef(null)

  const capture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (imageSrc && employeePersonalInfo?.id) {
      try {
        await uploadPicture({
          employeeId: employeePersonalInfo?.id,
          base64Image: imageSrc,
        })
        toast.success('Picture uploaded successfully')
        onRefresh?.()
        setOpen(false)
      } catch (error) {
        console.error('Failed to upload picture:', error)
        toast.error('Failed to upload picture. Please try again.', {
          style: { color: 'red' },
        })
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={'default'}
          size={'lg'}
          className="w-full h-11"
        >
          <Camera className="h-4 w-4" />
          Camera
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Camera Capture</DialogTitle>
          <DialogDescription>
            {cameraError
              ? 'Camera access denied. Please enable permissions in your browser.'
              : 'Ensure your face is clearly visible.'}
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex items-center justify-center min-h-[300px] bg-muted rounded-lg overflow-hidden">
          {loading && !imgSrc && !cameraError && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm mt-2 font-medium">Initializing Camera...</p>
            </div>
          )}
          {cameraError && (
            <div className="flex flex-col items-center p-6 text-center">
              <AlertCircle className="h-10 w-10 text-destructive mb-2" />
              <p className="text-sm font-semibold">Camera Unavailable</p>
            </div>
          )}

          {imgSrc ? (
            <img src={imgSrc} alt="Captured" className="w-full h-auto" />
          ) : (
            !cameraError && (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                onUserMedia={() => setLoading(false)}
                onUserMediaError={() => {
                  setLoading(false)
                  setCameraError(true)
                }}
                className="w-full h-auto"
              />
            )
          )}
        </div>

        <div className="mt-4">
          <Button
            type="button"
            onClick={capture}
            disabled={loading || cameraError}
            className="w-full h-11 gap-2"
          >
            <CameraIcon className="h-4 w-4" />
            Capture Photo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WebCamCapture
