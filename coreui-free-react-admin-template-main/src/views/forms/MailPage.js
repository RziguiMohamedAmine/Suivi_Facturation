import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CToast,
    CToastBody,
    CToastHeader,
    CToaster,
} from '@coreui/react'
import axios from 'axios';
import React, {useRef, useState} from 'react'
import {getURL} from "src/utils/getURL";
import { UserContext } from 'src';
import { useNavigate, useParams } from 'react-router-dom';



const MailPage = () => { 

    const { user } = React.useContext(UserContext);
    const [recipientEmail, setRecipientEmail] = useState('');
    const [senderEmail, setsenderEmail] = useState('');
    const url = getURL()
    const [dataFetched, setDataFetched] = useState(false);
    const param = useParams();



    const [toast, addToast] = useState(0)
    const toaster = useRef()
   

  

    const handleMailChange = (event) => {
        setRecipientEmail(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData();
    };
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const fetchData = async () => {
        try {
            const data = {
                senderEmail: user.username,
                recipientEmail,
            };
            let response;
            // Fetch Kpi1 data
                response = await axios.post(`${url}/Kpis/sendmail?startDate=${param.startdate}&endDate=${param.enddate}`,data, {
                  headers: {
                    authorization: "Bearer " + token,
                  },
                }).then((res) => {
                   
                      if (res.status === 200) {
                         addToast(<CToast>
                            <CToastHeader closeButton>
                               <svg
                                className="rounded me-2"
                                width="20"
                                height="20"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="xMidYMid slice"
                                focusable="false"
                                role="img"
                                
                              > 
                            
                                <rect width="100%" height="100%" fill="#007aff"></rect>
                              </svg>
                              <div className="fw-bold me-auto">ILIADE</div>
                              <small>7 min ago</small>
                            </CToastHeader>
                            <CToastBody>{res.data} </CToastBody>
                          </CToast>)
                      } else {
                        addToast(<CToast>
                            <CToastHeader closeButton>
                              <svg
                                className="rounded me-2"
                                width="20"
                                height="20"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="xMidYMid slice"
                                focusable="false"
                                role="img"
                              >
                                <rect width="100%" height="100%" fill="#007aff"></rect>
                              </svg>
                              <div className="fw-bold me-auto">ILIADE</div>
                              <small>7 min ago</small>
                            </CToastHeader>
                            <CToastBody>{res.data} </CToastBody>
                          </CToast>)
                        
                        setTimeout(() => {
                          navigate("/forms/MenuPage");
                        }, 4000);
                      }
                  });
        
            setDataFetched(true);
        } catch (error) {
            console.error('Error Sending Email:', error);
        }
    };


    return ( 
        <div>
             <CForm className="row g-3"
                    onSubmit={handleSubmit}>
                    <CCol md={7}>
                        <CFormLabel htmlFor="startdate">Email</CFormLabel>
                        <CFormInput type="email"
                        required
                            value={recipientEmail}                
                            id="recipientEmail"
                            onChange={handleMailChange}/>
                    </CCol>               
                    <CCol xs={12}>
                        <CButton type="submit" >Submit</CButton> 
                        <CToaster ref={toaster} push={toast} placement="top-end" />                      
                    </CCol>
                </CForm>
        </div>
    )
}

export default MailPage
