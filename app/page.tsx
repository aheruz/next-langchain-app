'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  PaperClipIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline'

import {
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/react/24/solid'
import { Chat } from '@/components/Chat'

const navigation = [
  { name: 'Resume chatter', href: '/', icon: ChatBubbleOvalLeftEllipsisIcon, current: true },
]
const teams = [
  { id: 1, name: 'LinkedIn', href: 'https://www.linkedin.com/in/alfonsohernandezu/', initial: 'L', current: false },
  { id: 2, name: 'GitHub', href: 'https://github.com/aheruz', initial: 'G', current: false },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-zinc-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-900 px-6 pb-2 ring-1 ring-white/10">
                    <nav className="flex flex-1 flex-col mt-24">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  target="_blank"
                                  className={classNames(
                                    item.current
                                      ? 'bg-zinc-800 text-white'
                                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                        <ul role="list" className="-mx-2 space-y-1 text-white divide-y divide-white/10 rounded-md border border-white/20">
                          <li className="flex items-center justify-between py-3 pl-4 pr-5 text-xs leading-6">
                            <div className="flex w-0 flex-1 items-center">
                              <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                <span className="truncate font-medium">resume.pdf</span>
                                <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a href="/alfonso_hernandez_resume_202307.pdf" target="_blank" className="font-medium text-indigo-400 hover:text-indigo-300">
                                <ArrowDownTrayIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                              </a>
                            </div>
                          </li>
                          <li className="flex items-center justify-between py-3 pl-4 pr-5 text-xs leading-6">
                            <div className="flex w-0 flex-1 items-center">
                              <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                <span className="truncate font-medium">covert_letter.pdf</span>
                                <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a href="/alfonso_hernandez_resume_202307.pdf" target="_blank" className="font-medium text-indigo-400 hover:text-indigo-300">
                                <ArrowDownTrayIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                              </a>
                            </div>
                          </li>
                        </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">Social Media</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  target="_blank"
                                  className={classNames(
                                    team.current
                                      ? 'bg-zinc-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-zinc-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-zinc-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-80 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-900 px-6">
            <nav className="flex flex-1 flex-col mt-24">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          target="_blank"
                          className={classNames(
                            item.current
                              ? 'bg-zinc-800 text-white'
                              : 'text-zinc-400 hover:text-white hover:bg-zinc-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <ul role="list" className="-mx-2 space-y-1 text-white divide-y divide-white/10 rounded-md border border-white/20">
                    <li className="flex items-center justify-between py-3 pl-4 pr-5 text-xs leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">resume.pdf</span>
                          <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a href="/alfonso_hernandez_resume_202307.pdf" target="_blank" className="font-medium text-indigo-400 hover:text-indigo-300">
                          <ArrowDownTrayIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        </a>
                      </div>
                    </li>
                    <li className="flex items-center justify-between py-3 pl-4 pr-5 text-xs leading-6">
                      <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                          <span className="truncate font-medium">covert_letter.pdf</span>
                          <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                        </div>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <a href="/alfonso_hernandez_resume_202307.pdf" target="_blank" className="font-medium text-indigo-400 hover:text-indigo-300">
                          <ArrowDownTrayIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                        </a>
                      </div>
                    </li>
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">Social media</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          target="_blank"
                          className={classNames(
                            team.current
                              ? 'bg-zinc-800 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-zinc-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-zinc-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="https://www.linkedin.com/in/alfonsohernandezu/"
                    target="_blank"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-tight text-white hover:bg-zinc-800"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-zinc-800"
                      src="https://www.gravatar.com/avatar/319e81817bf5fedae4cd74d4b370a70217e3fe19f19d5eaff34f8dd71524d014"
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <p aria-hidden="true">Alfonso Hernández<br/><span className="text-xs font-light leading-none text-gray-400">Software Engineer</span></p>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-zinc-900 px-4 py-2 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-zinc-400 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-tight text-white">
            Alfonso Hernández
            <p className="text-xs font-light leading-none text-zinc-400">Software Engineer</p>
          </div>
          <a href="https://www.linkedin.com/in/alfonsohernandezu/" target="_blank">
            <span className="sr-only">Your profile</span>
            <img
              className="h-9 w-9 rounded-full bg-zinc-800"
              src="https://www.gravatar.com/avatar/319e81817bf5fedae4cd74d4b370a70217e3fe19f19d5eaff34f8dd71524d014"
              alt=""
            />
          </a>
        </div>

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">
            <Chat />
          </div>
        </main>
      </div>
    </>
  )
}
