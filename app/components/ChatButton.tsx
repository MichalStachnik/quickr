'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function ChatButton() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        className="fixed bottom-4 right-4 rounded-full h-12 w-12 shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="sr-only">Open chat</span>
      </Button>

      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-80 md:w-96 shadow-lg z-50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Expense Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </CardHeader>
          <CardContent className="h-80 overflow-y-auto">
            <div className="space-y-4">
              <div className={'flex justify-start'}>
                <div className={`rounded-lg px-3 py-2 max-w-[80%] bg-muted`}>
                  Hi, I am your personal expense assistant, what can I help
                  with?
                </div>
              </div>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`rounded-lg px-3 py-2 max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={handleInputChange}
                className="flex-1"
              />
              <Button type="submit" size="sm">
                Send
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
