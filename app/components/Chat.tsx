'use client'

import { useChat } from 'ai/react'
import parse from 'html-react-parser';

import {
  SparklesIcon,
  PaperAirplaneIcon,
  UserIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid'

import { InitMessage } from '@/components/InitMessage';
import { AnyARecord } from 'dns';

const icon = {
  'user': {
    icon: UserIcon,
    iconBackground: 'bg-gray-400',
  },
  'function': {
    icon: SparklesIcon,
    iconBackground: 'bg-blue-500',
  },
  'assistant': {
    icon: SparklesIcon,
    iconBackground: 'bg-blue-500',
  },
  'system': {
    icon: SparklesIcon,
    iconBackground: 'bg-green-500',
  },
}

type IconType = keyof typeof icon

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function testIcon(type: IconType) {
  const Icon = icon[type].icon
  return <Icon className="h-5 w-5 text-white" aria-hidden="true"/>
}

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <div className="relative h-full flow-root">

        { (messages.length > 0) ? (
          <>
            <ul role="list" className="space-y-6">
            {messages.map((m, id) => (
              <li key={m.id} className="relative flex gap-x-4">
                <div
                  className={classNames(
                    id === messages.length - 1 ? 'h-6' : '-bottom-6',
                    'absolute left-0 top-0 flex w-6 justify-center'
                  )}
                >
                  <div className="w-px bg-gray-200" />
                </div>
                  <>
                    { m.role === 'user' ? (
                      <img
                        src="https://www.gravatar.com/avatar/0000?d=retro"
                        alt=""
                        className="relative h-6 w-6 flex-none rounded-full bg-gray-50"
                      />
                    ) : (
                      <img
                        src="data:image/png;base64,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"
                        alt=""
                        className="relative h-6 w-6 flex-none rounded-full bg-gray-50"
                      />
                    )}
                    <div className="flex-auto w-auto -mt-1.5 rounded-lg p-2 ring-1 ring-inset ring-gray-100">
                      <div className="flex justify-between gap-x-4">
                      </div>
                      <p className="text-sm leading-5 text-gray-500">{parse(m.content)}{' '}</p>
                    </div>
                  </>
              </li>
              ))}
            </ul>
            </>
          )
            : ( <InitMessage />)
        }
        <form onSubmit={handleSubmit} className="fixed w-[98%] ml-[1%] left-0 sm:ml-[-2%] sm:left-auto sm:w-full max-w-3xl bottom-0">
            <input
            className="text-md text-gray-500 w-full border border-gray-300 rounded-xl mb-8 shadow-xl p-3 pl-5 focus:outline-none"
            value={input}
            placeholder="Yep, I'm listening..."
            onChange={handleInputChange}/>
            <button
            type="submit"
            className="absolute right-1 mt-[6.5px] mr-[3px] rounded-lg bg-white px-2 pr-1.5 py-1.5 text-sm font-semibold bg-green-600 text-white shadow-sm ring-0 hover:bg-green-700"
            >
              <PaperAirplaneIcon className="h-6 w-6 ml-[2px] mt-[0.25px] inline" aria-hidden="true"/>
            </button>
        </form>
      </div>
    </div>
  )
}
