import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect
} from '@coreui/react'
import axios from 'axios';
import React, {useState} from 'react'
import {getURL} from "src/utils/getURL";
import DataTable from '../base/tables/DataTable';


const MenuPage = () => { // const url = "https://nextec-back.vercel.app/";
    const url = getURL()
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [bapi, setBapi] = useState('');
    const [kpiData, setKpiData] = useState([]);
    const [dataFetched, setDataFetched] = useState(false);

    const formatDate = (dateString) => {
        const dateObject = new Date(dateString);
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const day = dateObject.getDate().toString().padStart(2, '0');
        return `${day}.${month}.${year}`;
    };
    const token = localStorage.getItem("token");
    const fetchData = async () => {
        try {
            const formattedStartDate = formatDate(startDate);
            const formattedEndDate = formatDate(endDate);
            console.log(formattedStartDate)
            let response1;
            let response2;
            let response3;
            let response4;
            let response5;
            let response6;
            let response7;
            // Fetch Kpi1 data
            if (bapi === 'fields1') {
                response1 = await axios.get(`${url}/Kpis/getKpi1?startDate=${formattedStartDate}&endDate=${formattedEndDate}`, {
                  headers: {
                    authorization: "Bearer " + token,
                  }
                });
                setKpiData(response1.data);
            } else if (bapi === 'fields2') {
                response2 = await axios.get(`${url}/Kpis/getKpi2?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,  {
                  headers: {
                    authorization: "Bearer " + token,
                  }
                });
                setKpiData(response2.data);
            } else if (bapi === 'fields3') {
                response3 = await axios.get(`${url}/Kpis/getKpi3?startDate=${formattedStartDate}&endDate=${formattedEndDate}`, {
                  headers: {
                    authorization: "Bearer " + token,
                  }
                });
                setKpiData(response3.data);
            } else if (bapi === 'fields4') {
                response4 = await axios.get(`${url}/Kpis/getKpi4?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,  {
                  headers: {
                    authorization: "Bearer " + token,
                  }
                });
                setKpiData(response4.data);
            } else if (bapi === 'fields5') {
                response5 = await axios.get(`${url}/Kpis/getKpi5?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,  {
                  headers: {
                    authorization: "Bearer " + token,
                  }
                });
                setKpiData(response5.data);
            } else if (bapi === 'fields6') {
                response6 = await axios.get(`${url}/Kpis/getKpi6?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,  {
                  headers: {
                    authorization: "Bearer " + token,
                  }
                });
                setKpiData(response6.data);
            } else if (bapi === 'fields7') {
                response7 = await axios.get(`${url}/Kpis/getKpi7?startDate=${formattedStartDate}&endDate=${formattedEndDate}`,  {
                  headers: {
                    authorization: "Bearer " + token,
                  }
                });
                setKpiData(response7.data);
            }

            // console.log(response1.data)
            setDataFetched(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleBapiChange = (event) => {
        setBapi(event.target.value);
    };


    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchData();
    };

    return (
        <div> {
            !dataFetched ? (
                <CForm className="row g-3"
                    onSubmit={handleSubmit}>
                    <CCol md={7}>
                        <CFormLabel htmlFor="startdate">Start Date</CFormLabel>
                        <CFormInput type="date"
                            value={startDate}
                            id="startdate"
                            onChange={handleStartDateChange}/>
                    </CCol>
                    <CCol md={7}>
                        <CFormLabel htmlFor="enddate">end Date</CFormLabel>
                        <CFormInput type="date" id="enddate"
                            value={endDate}
                            onChange={handleEndDateChange}/>
                    </CCol>
                    <CCol xs={12}>
                        <CFormLabel htmlFor="inputAddress2">Choose option</CFormLabel>
                        <CFormSelect id="inputGroupSelect04" aria-label="Example select with button addon"
                            value={bapi}
                            onChange={handleBapiChange}>
                            {/* <option>Choose...</option> */}
                            <option value='choose'>Choose..</option>
                            <option value='fields1'>fields1</option>
                            <option value='fields2'>fields2</option>
                            <option value='fields3'>fields3</option>
                            <option value='fields4'>fields4</option>
                            <option value='fields5'>fields5</option>
                            <option value='fields6'>fields6</option>
                            <option value='fields7'>fields7</option>                          
                        </CFormSelect>
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Submit</CButton>
                    </CCol>
                </CForm>
            ) : (
                <DataTable kpiData={kpiData}
                    bapi={bapi}/>
            )
        } </div>
    )
}

export default MenuPage
