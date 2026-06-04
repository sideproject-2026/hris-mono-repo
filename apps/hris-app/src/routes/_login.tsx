import { Outlet, createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { useTheme } from '@hris/shared-ui'

export const Route = createFileRoute('/_login')({
  component: LoginLayout,
})

import { motion } from 'framer-motion'

function LoginLayout() {
  const version = import.meta.env.VITE_APP_VERSION || '1.0.0'
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme('dark')
  }, [setTheme])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <img
        src="/img/background.jpg"
        className="w-full bg-cover"
        alt="Background Image"
      />
      <div className="absolute inset-0 z-10 bg-black/40" />

      {/* Login Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="flex flex-col w-full max-w-[460px] bg-secondary rounded-md p-3 items-center gap-4 z-10 absolute shadow-2xl"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-5 mt-5">
          <img
            src="/img/logo.png"
            className="w-[208px] object-contain"
            alt="Company Logo"
          />
          <span className="text-[#004663] text-center font-sans font-semibold">
            HUMAN RESOURCES INFORMATION SYSTEM
          </span>
        </div>

        {/* Outlet for nested routes (login form, forgot password, etc.) */}
        <div className="w-full -mt-5">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground font-poppins">
          <p>CROSSWORLD HRIS {version.toUpperCase()}</p>
        </div>
        <img
          src="/img/crossworld-line.png"
          className="w-full h-1 absolute bottom-0 rounded-b-md"
        />
      </motion.div>
    </div>
  )
}
