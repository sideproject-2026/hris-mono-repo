export const getDialogType = (text: string) => {
  const textLower = text.toLowerCase()
  if (textLower.includes('leave')) return 'leave'
  if (textLower.includes('business') || textLower.includes('official'))
    return 'official-business'
  if (textLower.includes('overtime')) return 'overtime'
  return textLower // fallback
}


