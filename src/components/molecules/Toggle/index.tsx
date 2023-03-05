import React from 'react'

type ToggleProps = {
  text?: string
  isChecked: boolean
  onChange: (value?: boolean) => void
}

export default function Toggle({ text, isChecked, onChange }: ToggleProps) {
  return (
    <div className="inline-flex items-center space-x-4">
      {text && text?.length > 0 && (
        <span className="text-xs font-light font-gotham text-kplkWhite dark:text-kplkWhite">
          {text}
        </span>
      )}
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="w-[50px] h-[30px] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[2px] peer-checked:after:left-[-8px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[28px] after:w-[28px] after:transition-all peer-checked:bg-[#34C759] bg-[#787880]"></div>
      </label>
    </div>
  )
}
