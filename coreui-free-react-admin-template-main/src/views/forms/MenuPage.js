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
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const fetchData = async () => {
        try {
            
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
              <div>
                <h1 style={{ textAlign: 'start' }}>Suivi Facturation</h1>
                <CForm className="row g-3"
                    onSubmit={handleSubmit}>
                    <CCol md={7}>
                        <CFormLabel htmlFor="startdate">Date de Début</CFormLabel>
                        <CFormInput type="date"
                            value={startDate}                
                            id="startdate"
                            onChange={handleStartDateChange}/>
                    </CCol>
                    <CCol md={7}>
                        <CFormLabel htmlFor="enddate">Date de Fin</CFormLabel>
                        <CFormInput type="date" id="enddate"
                            value={endDate}
                            onChange={handleEndDateChange}/>
                    </CCol>
                    <CCol xs={12}>
                        <CFormLabel htmlFor="inputAddress2">Choisir option</CFormLabel>
                        <CFormSelect id="inputGroupSelect04" aria-label="Example select with button addon"
                            value={bapi}
                            onChange={handleBapiChange}>
                            {/* <option>Choose...</option> */}
                            <option value='choose'>Choisir...</option>
                            <option value='fields1'>Contrats attendus pour la facturation </option>
                            <option value='fields2'>Contrats déjà facturés </option>
                            <option value='fields3'>Contrats facturés avec relèves non cycliques </option>
                            <option value='fields4'>Contrats avec document de calcul de facturation sans facture </option>
                            <option value='fields5'>Contrats ayant des factures bloquées</option>
                            <option value='fields6'>Contrats bloqués pour le calcul facturation </option>
                            <option value='fields7'>Contrats ayant des OCF avec des relèves déjà saisies</option>                          
                        </CFormSelect>
                    </CCol>
                    <CCol xs={12}>
                        <CButton type="submit">Submit</CButton>
                    </CCol>
                </CForm>
              </div>
            ) : (
                <DataTable kpiData={kpiData}
                    bapi={bapi} startdate={formattedStartDate} enddate={formattedEndDate} />
            )
        } </div>
    )
}

export default MenuPage
