import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'

type ConfirmDialogOptions = {
	title?: ReactNode
	description?: ReactNode
	confirmLabel?: string
	cancelLabel?: string
	variant?: 'default' | 'destructive'
	onConfirm?: () => void | Promise<void>
	onCancel?: () => void
}

type ConfirmDialogContextValue = {
	requestConfirmation: (options?: ConfirmDialogOptions) => Promise<boolean>
}

const ConfirmDialogContext = createContext<ConfirmDialogContextValue | undefined>(undefined)

const DEFAULT_OPTIONS: Required<Omit<ConfirmDialogOptions, 'onConfirm' | 'onCancel'>> = {
	title: 'Are you sure?',
	description: 'This action cannot be undone.',
	confirmLabel: 'Confirm',
	cancelLabel: 'Cancel',
	variant: 'default',
}

type ConfirmDialogState = {
	open: boolean
	options: ConfirmDialogOptions
}

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
	const [dialogState, setDialogState] = useState<ConfirmDialogState>({
		open: false,
		options: DEFAULT_OPTIONS,
	})
	const [isProcessing, setIsProcessing] = useState(false)
	const resolverRef = useRef<((value: boolean) => void) | null>(null)

	const requestConfirmation = useCallback((options?: ConfirmDialogOptions) => {
		return new Promise<boolean>((resolve) => {
			resolverRef.current = resolve
			setDialogState({
				open: true,
				options: { ...DEFAULT_OPTIONS, ...options },
			})
		})
	}, [])

	const closeDialog = useCallback(() => {
		setDialogState((prev) => ({ ...prev, open: false }))
	}, [])

	const handleCancel = useCallback(() => {
		if (!dialogState.open) return
		dialogState.options.onCancel?.()
		resolverRef.current?.(false)
		resolverRef.current = null
		closeDialog()
	}, [dialogState, closeDialog])

	const handleConfirm = useCallback(async () => {
		if (!dialogState.open || isProcessing) return

		try {
			setIsProcessing(true)
			if (dialogState.options.onConfirm) {
				await dialogState.options.onConfirm()
			}
			resolverRef.current?.(true)
			resolverRef.current = null
			closeDialog()
		} catch (error) {
			console.error('Confirmation handler failed', error)
		} finally {
			setIsProcessing(false)
		}
	}, [dialogState, closeDialog, isProcessing])

	const value = useMemo<ConfirmDialogContextValue>(
		() => ({
			requestConfirmation,
		}),
		[requestConfirmation],
	)

	const { title, description, confirmLabel, cancelLabel, variant } = dialogState.options
	const confirmButtonClass = cn(
		variant === 'destructive'
			? 'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive'
			: '',
	)

	return (
		<ConfirmDialogContext.Provider value={value}>
			{children}

			<AlertDialog
				open={dialogState.open}
				onOpenChange={(nextOpen) => {
					if (!nextOpen && dialogState.open) {
						handleCancel()
					}
				}}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>{title}</AlertDialogTitle>
						{description ? <AlertDialogDescription>{description}</AlertDialogDescription> : null}
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel
							disabled={isProcessing}
							onClick={(event) => {
								event.preventDefault()
								handleCancel()
							}}
						>
							{cancelLabel}
						</AlertDialogCancel>
						<AlertDialogAction
							disabled={isProcessing}
							className={confirmButtonClass}
							onClick={(event) => {
								event.preventDefault()
								handleConfirm()
							}}
						>
							{isProcessing ? 'Working...' : confirmLabel}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</ConfirmDialogContext.Provider>
	)
}

export function useConfirmationContext() {
	const context = useContext(ConfirmDialogContext)

	if (!context) {
		throw new Error('useConfirationContext must be used within ConfirmDialogProvider')
	}

	return context
}


