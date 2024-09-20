import React from 'react'
import { useRoutes, useNavigate, Outlet } from 'shared/react-router-dom'
export const StartApp = ({routes}) => {
  const elem = useRoutes(routes)
  const navigate = useNavigate()

  const takeMetoAbc = () => {
    navigate('/abc/xyz')
  }
  return (
      <div className='StartApp'>
        <button onClick={takeMetoAbc}>abc</button>
        {elem}
    </div>
  )
}
