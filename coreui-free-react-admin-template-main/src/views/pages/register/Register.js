import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
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
import { registerUser } from 'src/api'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [user, setuser] = useState({
    firstname:"",
    lastname: "",
    email: "",
    password: "",
  });

  const [error, seterror] = useState("");
  const [msg, setmsg] = useState("");
  const navigate = useNavigate();
  const handleFormInput = ({ currentTarget: input }) => {
    setuser({
      ...user,
      [input.name]: input.value,
    });
  };

  const addUser = async (e) => {
    e.preventDefault();
    registerUser(user)
      .then((res) => {
        setmsg("You have successfully registered");
        setTimeout(() => {
          setmsg("");
          navigate("/login");
        }, 2000);
        seterror("");
      })
      .catch((e) => seterror(e.response.message));
  };








  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={addUser}>
                  <h1>Inscription</h1>
                  <p className="text-medium-emphasis">Créez votre compte</p>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Nom" type='text' 
                    name="firstname"
                    value={user.firstname}
                    onChange={handleFormInput} 
                    required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Prénom" autoComplete="lastname" type='text' name="lastname"
                    value={user.lastname}
                    onChange={handleFormInput}
                    required
                    />
                  </CInputGroup>




                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" type="email"
                      name="email"
                      value={user.email}
                      onChange={handleFormInput}
                      required />
                  </CInputGroup>


                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Mot de passe"
                      autoComplete="new-password"
                      name="password"
                      value={user.password}
                      onChange={handleFormInput}
                      required
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Confirmer mot de passe"
                      autoComplete="new-password"
                      name="confirmPassword"
                    />
                  </CInputGroup>

                  <div className="text-center mt-6">
                    {error && (
                      <div
                        style={{
                          color: "white",
                          border: "1px solid red",
                          background: "rgb(220,38,38)",
                          borderRadius: "4px",
                          padding: "0.5rem 0",
                        }}
                        role="alert"
                      >
                        {error}
                      </div>
                    )}
                  </div>
                  <div className="text-center mt-6">
                    {msg && (
                      <div
                        style={{
                          marginBottom: '10px',
                          color: "white",
                          border: "0px solid green",
                          background: "rgb(50,205,50)",
                          borderRadius: "4px",
                          padding: "0.5rem 0",
                        }}
                        role="alert"
                      >
                        {msg}
                      </div>
                    )}
                  </div>
                  <div className="d-grid">
                    <CButton type='submit' color="primary">S’inscrire</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
