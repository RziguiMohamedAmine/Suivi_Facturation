import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import logo  from 'src/assets/images/ili.jpg'
import { UserContext } from 'src/index'
import { loginUser } from 'src/api'





const Login = () => {

  const [user, setuser] = useState({
    email: "",
    password: "",
  });


  const { setUser } = React.useContext(UserContext);
  const navigate = useNavigate();
  const [error, seterror] = useState("");


  const handleFormInput = ({ currentTarget: input }) => {
    setuser({
      ...user,
      [input.name]: input.value,
    });
  };

  const SignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(user);
     // const data = await response.json();
       // console.log(response)
      
        localStorage.setItem("token", response.data.token);
      //  console.log(localStorage.getItem("token"));
        console.log(response);
        seterror("");
        navigate("/forms/MenuPage");
      
    } catch (error) {
      seterror("Email or password incorect.");
      console.error("Error occurred during login:", error);
    }
  };




  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={SignIn} style={{ marginTop: '20px' }}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleFormInput}
                        required />
                    </CInputGroup>


                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                         type="password"
                         name="password"
                         value={user.password}
                         onChange={handleFormInput}
                         required
                      />
                    </CInputGroup>
                    <CRow>
                      
                      <div className="text-center mt-6 ">
                      {error && (
                        <div
                          style={{
                            color: "white",
                            border: "1px solid red",
                            background: "rgb(220,38,38)",
                            borderRadius: "4px",
                            padding: "0.5rem 0",
                            marginBottom: "10px",
                          }}
                          role="alert"
                        >
                          {error}
                        </div>
                      )}
                    </div>
                    <CCol xs={6}>
                        <CButton color="primary" type='submit' className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center mb-3">
                  <div>
                  <img src={logo} alt="Logo" style={{ width: '120px', marginBottom: '20px' }} />
                    <h2>Sign up</h2>                                   
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
