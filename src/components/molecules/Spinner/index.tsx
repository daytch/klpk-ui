import React from 'react'

export default function Spinner() {
  return (
    <div className="p-6 flex justify-center items-center w-full">
      <div className="w-12 h-12 border-[5px] border-white border-b-transparent rounded-full animate-spin inline-block" />
    </div>
  )
}
