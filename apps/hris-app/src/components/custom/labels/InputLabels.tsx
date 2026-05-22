import React from 'react'

interface InputLabelsProps {
  label: string
  text: string | number
}
const InputLabels = ({ label, text }: InputLabelsProps) => {
  return (
    <div className="flex flex-col w-full gap-3">
      <span className="text-md text-muted-foreground">{label}</span>
      <span className="text-md text-muted-foreground rounded-md border p-3 font-semibold uppercase">
        {text}
      </span>
    </div>
  )
}

export default InputLabels
