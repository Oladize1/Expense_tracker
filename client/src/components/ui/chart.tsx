"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Tooltip } from "recharts"

export type ChartConfig = {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  children: React.ReactNode
}

export function ChartContainer({
  config,
  className,
  children,
  ...props
}: ChartContainerProps) {
  return (
    <div className={cn("w-full h-[300px] text-sm", className)} {...props}>
      {children} {/* This was missing */}
    </div>
  )
}

interface ChartTooltipProps {
  content: React.ReactNode
  cursor?: boolean
}

export function ChartTooltip({ content, cursor }: ChartTooltipProps) {
  return <Tooltip content={content} cursor={cursor} />
}

export function ChartTooltipContent({
  label,
  hideLabel,
}: {
  label?: string
  hideLabel?: boolean
}) {
  return (
    <div className="p-2 bg-background border rounded shadow-sm text-foreground text-xs">
      {!hideLabel && label && <div className="font-medium">{label}</div>}
    </div>
  )
}
