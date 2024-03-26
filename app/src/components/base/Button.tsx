import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utils/classnames'

const buttonVariants = cva(
  'focus-visible:ring-ring inline-flex items-center justify-center gap-x-2 rounded text-sm font-semibold leading-6 text-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'text-foreground border border-gray-200 font-medium transition-colors hover:bg-gray-50',
        primary: 'bg-primary hover:bg-primary-hover',
        outline: 'border border-primary/50 bg-transparent text-primary-dark hover:bg-primary/20',
        flat: 'text-primary-dark hover:bg-primary/20',
        navlink: 'justify-start text-white/50',
        link: 'text-primary underline-offset-4 hover:underline',
        success: 'bg-success hover:bg-success-dark text-white',
        error: 'bg-error hover:bg-error-dark text-white',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
      },
      size: {
        sm: 'h-8 px-2 text-[13px]',
        md: 'h-10 px-4',
        lg: 'h-11 px-6 text-[15px]',
        icon: 'size-8 rounded-full p-0'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type = 'button', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} type={type} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

