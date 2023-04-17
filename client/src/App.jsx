import { RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux'
import router from './routes'
import store from './redux/store';

function App() {
  return (
    <div className="App w-full">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  )
}

export default App
