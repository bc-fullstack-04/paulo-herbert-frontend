import React from 'react'

interface Props {
  children: React.ReactNode,
  type: string,
  required?:boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputForm({ children, type, onChange ,required} : Props) {
  return (
    <>
      <label htmlFor={type} className="text-sm font-normal">{children}</label>
      <input type={type} required={required} onChange={onChange} className="bg-zinc-50 p-2 rounded-md ring-1 ring-zinc-900/20 mb-3" />
    </>
  )
}
