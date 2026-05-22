import { useEffect, useMemo, useState } from 'react'
import { useAuthContext } from '@/features/auth/components/AuthProvider'

const GreetingCard = () => {
  const { userProfile } = useAuthContext()
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const hour = now.getHours()

  // Determine greeting and gradient
  const { greeting } = useMemo(() => {
    if (hour < 12) {
      return {
        greeting: 'GOOD MORNING',
      }
    } else if (hour < 18) {
      return {
        greeting: 'GOOD AFTERNOON',
      }
    } else {
      return {
        greeting: 'GOOD EVENING',
      }
    }
  }, [hour])

  const today = new Date()
  const dayName: string = today.toLocaleDateString('en-US', {
    weekday: 'long',
  })

  return (
    <div className="w-full bg-primary p-6 md:p-8 rounded-lg flex flex-col md:flex-row items-center justify-between relative gap-6 md:gap-4">
      <div className="w-full flex flex-col items-center md:items-start text-center md:text-left gap-3 md:gap-5">
        <h1 className="text-xl md:text-2xl font-bold text-white font-sans">
          {greeting} {userProfile?.firstName}!
        </h1>
        <p className="text-gray-200 md:text-gray-300 font-sans md:max-w-md lg:max-w-lg">
          Welcome to your HRIS dashboard. Here you can manage your attendance,
          leave, and other HR-related tasks.
        </p>
      </div>
      <div className="w-full md:w-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between md:justify-end gap-4 sm:gap-6 md:gap-3">
        <div className="flex flex-col gap-1 md:gap-2 text-center sm:text-right md:text-left">
          <h1 className="text-xl md:text-2xl font-bold text-white font-sans">
            {dayName.toUpperCase()}
          </h1>
          <h1 className="text-lg md:text-xl font-semibold text-white font-sans text-nowrap">
            {now.toLocaleTimeString()}
          </h1>
        </div>
        {greeting === 'GOOD MORNING' ? (
          <img
            src="/img/morning.png"
            className="relative size-[80px] md:size-[120px] md:right-5 sm:-order-1 md:order-none"
          />
        ) : greeting === 'GOOD AFTERNOON' ? (
          <img
            src="/img/afternoon.png"
            className="relative size-[80px] md:size-[120px] md:right-5 sm:-order-1 md:order-none"
          />
        ) : (
          <img
            src="/img/evening.png"
            className="relative size-[80px] md:size-[120px] md:right-5 sm:-order-1 md:order-none"
          />
        )}
      </div>
    </div>
  )
}

export default GreetingCard
