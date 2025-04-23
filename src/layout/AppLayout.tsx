import { FileUser } from "lucide-react";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode
}

export const AppLayout: FC<Props> = ({ children }) => {

  return (
    <div className='h-screen flex'>
      <aside className='w-80 bg-slate-200 p-4'>
        <h1 className='text-lg font-bold mb-4'>HR Dashboard</h1>
        <ul>
          <li className='gap-2 bg-slate-300 p-2 rounded-md flex items-center'>
            <FileUser />
            <p>Leave Requests</p>
          </li>
        </ul>
      </aside>
      <main className='flex-1 p-2 overflow-auto'>
        {children}
      </main>
    </div>
  )
}
