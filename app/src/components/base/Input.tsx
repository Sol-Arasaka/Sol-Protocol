import * as React from 'react'
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from 'lucide-react'
import {
  useController,
  type Control,
  type FieldPath,
  type FieldPathValue,
  type FieldValues,
  type RegisterOptions
} from 'react-hook-form'

import { cn } from '@/utils/classnames'
import { Button } from '@/components/base'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'bg-grey-input text-text flex h-9 w-full rounded px-3 text-sm',
        'placeholder:text-text-placeholder file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:font-light',
        'focus:ring-1 focus:ring-primary focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = 'Input'

interface FormInputProps<Values extends FieldValues, Path extends FieldPath<Values>> extends InputProps {
  label?: string
  hint?: string
  prefix?: string
  // controller props
  control: Control<Values>
  name: Path
  rules?: RegisterOptions<Values, Path>
  defaultValue?: FieldPathValue<Values, Path>
}

export function FormInput<Values extends FieldValues, Path extends FieldPath<Values>>({
  label,
  hint,
  prefix,
  name,
  control,
  rules,
  type,
  className,
  defaultValue,
  ...props
}: FormInputProps<Values, Path>) {
  const id = React.useId()
  const [inputType, setInputType] = React.useState(type)
  const {
    field,
    fieldState: { error }
  } = useController({ control, name, rules, defaultValue })
  const isPasswordField = type === 'password'

  return (
    <div className={cn('grid gap-y-1', className)}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            'text-xs text-second',
            rules?.required !== undefined && 'after:text-error after:ml-0.5 after:content-["*"]'
          )}
        >
          {label}
        </label>
      )}
      <div className={'relative flex items-center rounded border bg-white'}>
        {prefix && (
          <div className={'flex h-full basis-16 items-center justify-center border-r font-light text-gray-400'}>
            {prefix}
          </div>
        )}
        <Input
          id={id}
          className={cn({ 'pr-10': isPasswordField || error !== undefined })}
          type={inputType}
          {...field}
          {...props}
        />
        {error && !isPasswordField && <AlertCircleIcon className={'absolute right-2 text-red-500'} />}
        {isPasswordField && (
          <Button
            className={'absolute right-2 text-gray-700'}
            onClick={() => setInputType((prev) => (prev === 'password' ? 'text' : 'password'))}
          >
            {inputType === 'password' ? <EyeOffIcon /> : <EyeIcon />}
          </Button>
        )}
      </div>
      {error?.message && <p className={'text-xs text-red-500'}>{error.message}</p>}
      {hint && <p className={'text-xs text-white'}>{hint}</p>}
    </div>
  )
}
