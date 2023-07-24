'use client'

import { useChat } from 'ai/react'
import parse from 'html-react-parser';

import { SparklesIcon, PaperAirplaneIcon, UserIcon } from '@heroicons/react/24/solid'

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
            <ul role="list" className="absolute overflow-y-scroll bottom-0 h-full pt-10 pb-20">
                {messages.map((m, id) => (
                    <li key={m.id}>
                        <div className="relative pb-8">
                        {id !== messages.length - 1 ? (
                            <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                        ) : null}
                        <div className="relative flex space-x-3">
                            <div>
                            <span
                                className={classNames(
                                icon[m.role].iconBackground,
                                'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                                )}
                            >
                            {testIcon(m.role)}
                            </span>
                            </div>
                            <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                            <div>
                                <p className="text-sm text-gray-500">
                                {parse(m.content)}{' '}
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                    </li>
                ))}
            </ul>)
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
