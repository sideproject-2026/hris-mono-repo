import * as React from "react"
import { SearchXIcon } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type ActionConfig = {
	label: string
	onClick?: () => void
	icon?: LucideIcon
	variant?: React.ComponentProps<typeof Button>["variant"]
}

type NotFoundErrorsProps = {
	title?: string
	description?: string
	hint?: string
	className?: string
	icon?: LucideIcon
	primaryAction?: ActionConfig
	secondaryAction?: ActionConfig
	actions?: React.ReactNode
}

const renderActionButton = (
	action?: ActionConfig,
	fallbackVariant: React.ComponentProps<typeof Button>["variant"] = "default"
) => {
	if (!action) return null
	const Icon = action.icon
	return (
		<Button
			key={action.label}
			onClick={action.onClick}
			variant={action.variant ?? fallbackVariant}
			className="min-w-[9rem] justify-center"
		>
			{Icon ? <Icon className="size-4" /> : null}
			<span>{action.label}</span>
		</Button>
	)
}

const NotFoundErrors = ({
	title = "Nothing matches your search",
	description = "We looked everywhere but could not find the resource you are after.",
	hint = "Double-check the filters or try refreshing the page.",
	icon: Icon = SearchXIcon,
	className,
	primaryAction,
	secondaryAction,
	actions,
}: NotFoundErrorsProps) => {
	return (
		<section
			className={cn(
				"relative flex w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-background via-background to-muted/40 px-8 py-16 text-center shadow-inner",
				"dark:from-muted/30 dark:via-muted/20 dark:to-background/30",
				className
			)}
		>
			<div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.15),_transparent_55%)]" aria-hidden />

			<div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
				<Icon className="size-7" strokeWidth={1.8} />
			</div>

			<div className="space-y-2">
				<h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
				<p className="mx-auto max-w-xl text-base text-muted-foreground">{description}</p>
			</div>

			{hint ? <p className="mt-4 text-sm text-muted-foreground/80">{hint}</p> : null}

			{actions ? (
				<div className="mt-8 flex flex-wrap items-center justify-center gap-3">{actions}</div>
			) : primaryAction || secondaryAction ? (
				<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
					{renderActionButton(primaryAction, "default")}
					{renderActionButton(secondaryAction, "outline")}
				</div>
			) : null}
		</section>
	)
}

NotFoundErrors.displayName = "NotFoundErrors"

export default NotFoundErrors
