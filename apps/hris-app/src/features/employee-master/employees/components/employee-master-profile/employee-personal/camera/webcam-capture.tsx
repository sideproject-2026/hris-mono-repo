import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@hris/shared-ui'
import { useEmployeeProfileContext } from '@/features/employee-master/employees/components/employee-master-profile/providers/employee-personal-provider'
import { Camera, CameraIcon, Loader2, AlertCircle } from 'lucide-react'
import { useRef, useState } from 'react'
import Webcam from 'react-webcam'
import { toast } from 'sonner'
import { useUploadPhoto } from '@/features/employee-master/employees/hooks/mutations/useUploadPhoto'

const videoConstraints = {
  width: 500,
  height: 500,
  facingMode: 'user',
}

// Converts a base64 data URL (from the webcam screenshot) into a File.
const dataUrlToFile = (dataUrl: string, fileName: string): File => {
  const [header, base64] = dataUrl.split(',')
  const mime = header.match(/:(.*?);/)?.[1] ?? 'image/jpeg'
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new File([bytes], fileName, { type: mime })
}

const WebCamCapture = () => {
  
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  const [cameraError, setCameraError] = useState(false)

  const { employeeId } = useEmployeeProfileContext()
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const webcamRef = useRef<Webcam>(null)

  const { mutation, onSubmit, setPhotoFile } = useUploadPhoto({
    employeeId: employeeId ?? '',
    onSuccess: () => {
      toast.success('Picture uploaded successfully')
      setOpen(false)
    },
    onError: (error) => {
      console.error('Failed to upload picture:', error)
      toast.error('Failed to upload picture. Please try again.', {
        style: { color: 'red' },
      })
    },
  })

  const capture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot()
    if (!imageSrc) return

    setImgSrc(imageSrc)
    const file = dataUrlToFile(imageSrc, `webcam-capture-${Date.now()}.jpg`)
    setPhotoFile(file)
    await onSubmit()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        // Reset capture state on close so re-opening shows the live camera.
        if (!next) {
          setImgSrc(null)
          setLoading(true)
          setCameraError(false)
        }
      }}
    >
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
            disabled={loading || cameraError || mutation.isPending}
            className="w-full h-11 gap-2"
          >
            {mutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <CameraIcon className="h-4 w-4" />
            )}
            {mutation.isPending ? 'Uploading...' : 'Capture Photo'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default WebCamCapture
