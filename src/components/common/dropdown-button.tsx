'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

interface DropdownOption {
  label: string
  value: string
  icon?: React.ReactNode
  disabled?: boolean
}

interface DropdownButtonProps {
  options: DropdownOption[]
  value?: string
  placeholder?: string
  onSelect: (option: DropdownOption) => void
  disabled?: boolean
  className?: string
  variant?: 'default' | 'outline' | 'ghost' | 'primary'
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

export function DropdownButton({
  options,
  value,
  placeholder = 'Select option',
  onSelect,
  disabled = false,
  className = '',
  variant = 'default',
  size = 'md'
}: DropdownButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find(option => option.value === value)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleSelect = (option: DropdownOption) => {
    if (!option.disabled) {
      onSelect(option)
      setIsOpen(false)
    }
  }

  const getVariantStyles = () => {
    switch (variant) {
      case 'outline':
        return 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-900'
      case 'ghost':
        return 'border-none bg-transparent hover:bg-gray-100 text-gray-700'
      case 'primary':
        return 'border border-blue-600 bg-blue-600 hover:bg-blue-700 text-white'
      default:
        return 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-900'
    }
  }

  const getSizeStyles = () => {
    switch (size) {
        case 'xs':
        return 'px-2 py-1 text-xs'
      case 'sm':
        return 'px-3 py-2 text-sm'
      case 'lg':
        return 'px-4 py-3 text-base'
      default:
        return 'px-4 py-2.5 text-sm'
    }
  }

  const getDropdownSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'text-sm'
      case 'lg':
        return 'text-base'
      default:
        return 'text-sm'
    }
  }

  return (
    <div className={`relative inline-block ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          flex items-center justify-between w-full rounded-md font-medium
          transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${getVariantStyles()} ${getSizeStyles()}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <div className="flex items-center space-x-2">
          {selectedOption?.icon && (
            <span className="flex-shrink-0">{selectedOption.icon}</span>
          )}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown 
          className={`flex-shrink-0 ml-2 h-4 w-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={option.value || index}
                onClick={() => handleSelect(option)}
                disabled={option.disabled}
                className={`
                  w-full px-4 py-2 text-left flex items-center space-x-2
                  transition-colors duration-150 ${getDropdownSizeStyles()}
                  ${option.disabled 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-900 hover:bg-gray-100 cursor-pointer'
                  }
                  ${value === option.value ? 'bg-blue-50 text-blue-700' : ''}
                `}
              >
                <span className="truncate">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
