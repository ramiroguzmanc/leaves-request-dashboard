import './App.css'
import { AppLayout } from './layout/AppLayout'
import { LeaveRequestView } from './views/LeaveRequestView'

function App() {

  return (
    <main>
      <AppLayout>
        <LeaveRequestView />
      </AppLayout>
    </main>
  )
}

export default App
