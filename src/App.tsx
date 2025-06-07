import { useState } from 'react'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      // TODO: Replace with actual API call
      const response = await new Promise<string>(resolve => 
        setTimeout(() => resolve("I'm a mock AI response. Replace this with actual API integration."), 1000)
      )

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Failed to get AI response:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen p-4 flex flex-col">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Chat Interface</h1>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full flex flex-col">
        <div className="flex-1 space-y-4 mb-4 overflow-y-auto">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="text-center text-gray-500">
              AI is thinking...
            </div>
          )}
        </div>

        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </main>
    </div>
  )
}

export default App 