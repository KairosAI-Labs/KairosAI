"use client"

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import React from 'react';
import { Children } from 'react';

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonGlassVariant> {}

const buttonGlassVariant = cva(
  'glass-effect  px-[10px] py-[10px] rounded-2xl',
  {
    variants: {
      variant: {
        textIcon: 'flex gap-2 items-center justify-center',
        icon: 'max-w-fit rounded-full',
        default: '',
      },
      size: {
        sm: 'mx-w-[70px] w-[70px] py-1 text-sm',
        default: 'w-[160px]',
      },
    },

    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export const ButtonGlass = ({variant, size, className, children, ...props }:Props) => {
 
  return (
    <button {...props} className={cn(buttonGlassVariant({ variant, size }), className)}>
      {Children.map(children, child =>
        <>
          {child}
        </>
      )}
    </button>
  )
}




