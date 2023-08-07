import { ComponentProps } from 'react';

export const InputField = ({
  value,
  onChange,
  placeholder,
  type,
  className,
  ...props
}: ComponentProps<'input'>) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    className={className}
    {...props}
  />
);
