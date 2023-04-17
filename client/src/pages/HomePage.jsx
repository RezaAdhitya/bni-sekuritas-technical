import React, { useEffect } from 'react'
import  {useDispatch, useSelector} from 'react-redux'
import { doFetchData } from '../redux/reducers/fetchDataReducer'
import MainTable from '../components/MainTable'
import Preloader from '../components/Preloader'

function HomePage() {
  const dispatch = useDispatch()
  const { data, isLoading } = useSelector(state => state.fetchData)

  useEffect(() => {
    if(data.length === 0) {
      dispatch(doFetchData())
    }
  },[])

  if(isLoading) {
    return <Preloader />
  }

  return (
    <div className='homepage'>
      <div className="title-section">
        <p>User List</p>
      </div>
      <MainTable userData={data} />
    </div>
  )
}

export default HomePage