import { cn } from "@/lib/utils"

type FactProps = {
  label: string
  figure: string
  unit?: string
  line: string
  className?: string
}

export default function Fact({
  label,
  figure,
  unit,
  line,
  className,
}: FactProps) {
  return (
    <div
      className={cn(
        "flex min-h-60 w-full flex-col justify-between p-5 md:min-h-64 md:p-8",
        className
      )}
    >
      <h3 className="sans-heading max-w-56 text-base md:text-lg">{label}</h3>
      <div>
        <p className="display-type figures text-5xl leading-none md:text-7xl">
          {figure}
          {unit && (
            <span className="ms-1.5 text-xl md:ms-2 md:text-3xl">{unit}</span>
          )}
        </p>
        <p className="mt-4 max-w-56 text-sm text-balance text-muted-foreground">
          {line}
        </p>
      </div>
    </div>
  )
}
