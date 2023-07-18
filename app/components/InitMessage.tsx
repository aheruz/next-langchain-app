import { SparklesIcon } from '@heroicons/react/24/solid'
import {
    CommandLineIcon,
    NewspaperIcon,
    CursorArrowRippleIcon,
    CubeTransparentIcon,
  } from '@heroicons/react/24/outline'
  
  const items = [
    {
      title: 'Download my Resume',
      description: 'Alfonso Hernandez\'s SWE Resume',
      icon: CommandLineIcon,
      background: 'bg-green-400',
    },
    {
      title: 'Download my Cover Letter',
      description: 'This is my primary cover letter, similar to my resume but more personal.',
      icon: NewspaperIcon,
      background: 'bg-indigo-400',
    },
    {
      title: 'Visit my Linkedin',
      description: 'Full of experience and things — good to connect.',
      icon: CursorArrowRippleIcon,
      background: 'bg-sky-900',
    },
    {
      title: 'Visit my GitHub',
      description: 'Get a birds-eye-view of my repositories.',
      icon: CubeTransparentIcon,
      background: 'bg-neutral-900',
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}  

export function InitMessage() {
    return (
        <div className="h-screen-5/8 grid gap-y-1 grid-cols-1 content-end">
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-2xl text-center">
                    <div className='flex justify-center'>
                        <SparklesIcon className="h-5 w-5 mt-1" aria-hidden="true"/>
                        <h1 className="text-4xl font-black tracking-tight text-black sm:text-6xl">
                            Resume Chatter
                        </h1>
                    </div>
                    <p className="max-w-xl mt-6 text-lg leading-8 text-gray-800">
                    This chat has my resume embedded. You can download it or visit my social media profiles displayed in the sidebar.
                    </p>
                </div>
            </div>
            <ul role="list" className="mt-6 grid grid-cols-1 gap-6 border-b border-t border-gray-200 py-6 sm:grid-cols-2">
        {items.map((item, itemIdx) => (
          <li key={itemIdx} className="flow-root">
            <div className="relative -m-2 flex items-center space-x-4 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 hover:bg-gray-50">
              <div
                className={classNames(
                  item.background,
                  'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg'
                )}
              >
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  <a href="#" className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <span>{item.title}</span>
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
        </div>
    )
}