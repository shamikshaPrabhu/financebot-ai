import { useState, KeyboardEvent } from 'react'
import clsx from 'clsx'

type ChatInputProps = {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message)
      setMessage('')
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex items-end gap-4 bg-white p-4 rounded-lg shadow-md">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className={clsx(
          'flex-1 resize-none rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none',
          'min-h-[80px] max-h-[200px]'
        )}
        disabled={disabled}
      />
      <button
        onClick={handleSubmit}
        disabled={disabled || !message.trim()}
        className={clsx(
          'rounded-md px-4 py-2 font-medium text-white',
          disabled || !message.trim()
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        )}
      >
        Send
      </button>
    </div>
  )
}

export default ChatInput 