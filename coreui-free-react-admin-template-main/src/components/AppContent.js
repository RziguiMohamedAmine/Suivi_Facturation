import React, { Suspense, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// routes config
import routes from '../routes'
import { UserContext } from 'src'

const AppContent = () => {
  const { user } = React.useContext(UserContext);
  const [loading, setLoading] = useState(true);
 // console.log(user.username)
  
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            return (
              
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  element={ !user ? (<Navigate to="/login" />) :(<route.element />) }
                />
              )
            )
          })}
          <Route path="/" element={!user ? (<Navigate to="login" replace />) : (<Navigate to="login" replace />) } />
          
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
