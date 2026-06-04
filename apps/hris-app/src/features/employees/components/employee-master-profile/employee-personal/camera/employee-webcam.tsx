import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@hris/shared-ui'
import {
  Camera,
  CameraIcon,
  RefreshCcw,
  Save,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'

const EmployeeWebcam = () => {
  const videoConstraints = {
    width: 500,
    height: 500,
    facingMode: 'user',
  }

  const webcamRef = useRef(null)
  const [imgSrc, setImgSrc] = useState(null)
  const [loading, setLoading] = useState(true)
  const [cameraError, setCameraError] = useState(false)

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot()
    setImgSrc(imageSrc)
  }, [webcamRef])

  const retake = () => {
    setImgSrc(null)
    setLoading(true)
  }

  const handleSavePhoto = () => {
    console.log(imgSrc)
  }

  return (
    <Dialog onOpenChange={(open) => !open && setImgSrc(null)}>
      <DialogTrigger asChild>
        <Button variant={'default'} size={'lg'} className="w-full h-11">
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
          {imgSrc ? (
            <div className="flex flex-col gap-2">
              <Button
                onClick={retake}
                variant="outline"
                className="w-full h-11 gap-2"
              >
                <RefreshCcw className="h-4 w-4" />
                Retake Photo
              </Button>
              <Button onClick={handleSavePhoto} className="w-full h-11 gap-2">
                <Save className="h-4 w-4" />
                Save Photo
              </Button>
            </div>
          ) : (
            <Button
              onClick={capture}
              disabled={loading || cameraError}
              className="w-full h-11 gap-2"
            >
              <CameraIcon className="h-4 w-4" />
              Capture Photo
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EmployeeWebcam
