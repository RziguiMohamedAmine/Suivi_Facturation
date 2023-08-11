import React, { useState } from 'react'
import {
  CTable,
  CPagination,
  CPaginationItem,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
} from '@coreui/react'
import { PropTypes } from 'prop-types'

import { CChartPie } from '@coreui/react-chartjs'
import { Link } from 'react-router-dom'
import { getURL } from 'src/utils/getURL'
import axios from 'axios'

const titles = {
  fields1: [{ title: 'Contrats attendus pour la facturation' }],
  fields2: [{ title: 'Contrats déjà facturés' }],
  fields3: [{ title: 'Contrats facturés avec relèves non cycliques' }],
  fields4: [{ title: 'Contrats avec document de calcul de facturation sans facture' }],
  fields5: [{ title: 'Contrats ayant des factures bloquées' }],
  fields6: [{ title: 'Contrats bloqués pour le calcul facturation' }],
  fields7: [{ title: 'Contrats ayant des OCF avec des relèves déjà saisies ' }],
}

const fieldsConfigurations = {
  fields1: [
    { key: 'VERTRAG', label: 'Contrat', _style: { width: '20%' } },
    { key: 'BUKRS', label: 'Société', _style: { width: '40%' } },
    { key: 'VBEZ', label: 'Contrat : texte', _style: { width: '20%' } },
    { key: 'VBEGINN', label: 'Début du contrat', _style: { width: '20%' } },
    { key: 'VENDE', label: 'Fin du contrat', _style: { width: '20%' } },
    // Add more fields as needed based on your data
  ],

  fields2: [
    { key: 'VERTRAG', label: 'Contrat', _style: { width: '20%' } },
    { key: 'PARTNER', label: 'Numéro de partenaire', _style: { width: '40%' } },
    { key: 'FAEDS', label: 'Date échéance escompte', _style: { width: '20%' } },
    { key: 'OPBEL', label: 'Numéro document d impression', _style: { width: '20%' } },
    { key: 'BUDAT', label: 'Date comptable de la pièce', _style: { width: '20%' } },
    { key: 'FAEDN', label: 'Date échéance nette', _style: { width: '20%' } },
    // Add more fields as needed based on your data
  ],

  fields3: [
    { key: 'VERTRAG', label: 'Contrat', _style: { width: '20%' } },
    { key: 'BUKRS', label: 'Société', _style: { width: '40%' } },
    { key: 'ABLESGR', label: 'Motif de relevé', _style: { width: '20%' } },
    { key: 'ANLAGE', label: 'Installation', _style: { width: '20%' } },
    { key: 'BUDAT', label: 'Date comptable de la pièce', _style: { width: '20%' } },
    // Add more fields as needed based on your data
  ],
  fields4: [
    { key: 'VERTRAG', label: 'Contrat', _style: { width: '20%' } },
    { key: 'BUKRS', label: 'Société', _style: { width: '40%' } },
    {
      key: 'BEGABRPE',
      label: 'Début de la période de calcul de facturation',
      _style: { width: '20%' },
    },
    {
      key: 'ENDABRPE',
      label: 'Fin de la période de calcul de facturation',
      _style: { width: '20%' },
    },
    { key: 'BELNR', label: 'Numéro document de calcul de facturation', _style: { width: '20%' } },
    // Add more fields as needed based on your data
  ],
  fields5: [
    { key: 'VERTRAG', label: 'Contrat', _style: { width: '20%' } },
    { key: 'BUKRS', label: 'Société', _style: { width: '40%' } },
    {
      key: 'OUTCNSO',
      label: 'Numéro de la mise en attente pour vérification',
      _style: { width: '20%' },
    },
    { key: 'OPBEL', label: 'Numéro document d impression', _style: { width: '20%' } },
    { key: 'BUDAT', label: 'Date comptable de la pièce', _style: { width: '20%' } },
    // Add more fields as needed based on your data
  ],
  fields6: [
    { key: 'VERTRAG', label: 'Contrat', _style: { width: '20%' } },
    { key: 'BUKRS', label: 'Société', _style: { width: '40%' } },
    { key: 'TEXT30', label: 'Motif de blocage de calcul de facturation', _style: { width: '20%' } },
    { key: 'EINZDAT_ALT', label: 'Date emménagement d ancien système', _style: { width: '20%' } },
    // Add more fields as needed based on your data
  ],
  fields7: [
    { key: 'VERTRAG', label: 'Contrat', _style: { width: '20%' } },
    { key: 'BUKRS', label: 'Société', _style: { width: '40%' } },
    { key: 'SPARTE', label: 'Secteur activité', _style: { width: '20%' } },
    {
      key: 'ABLBELNR',
      label: 'Numéro identification interne du document de relevé',
      _style: { width: '20%' },
    },
    { key: 'ERDAT', label: 'Date de création de lenregistrement', _style: { width: '20%' } },
    {
      key: 'ABRDATSU',
      label: 'Date calc. de fact. planif. de l ord. de calc. fact. suppr.',
      _style: { width: '20%' },
    },
    { key: 'ERNAM', label: 'Nom de l utilisateur qui a créé l objet', _style: { width: '20%' } },
    // Add more fields as needed based on your data
  ],
}

const DataTable = ({ kpiData, bapi, startdate, enddate }) => {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const [count3, setCount3] = useState(0)
  const [label, setLabel] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const url = getURL()
  const token = localStorage.getItem('token')

  const fetchData = async () => {
    try {
      let response1
      let response2

      // Fetch Kpi1 data

      if (bapi === 'fields2') {
        response1 = await axios.get(
          `${url}/Kpis/PieChart?startDate=${startdate}&endDate=${enddate}`,
          {
            headers: {
              authorization: 'Bearer ' + token,
            },
          },
        )
        setCount1(response1.data.count1)
        setCount2(response1.data.count2)
        setCount3(response1.data.count3)
        setLabel(['Contrat Non Facturés', 'Contrat Facturés'])
      } else if (bapi === 'fields3') {
        response2 = await axios.get(
          `${url}/Kpis/PieChart3?startDate=${startdate}&endDate=${enddate}`,
          {
            headers: {
              authorization: 'Bearer ' + token,
            },
          },
        )
        setCount1(response2.data.count1)
        setCount3(response2.data.count2)
        setLabel(['Contrats', 'Contrat avec des relèves non cycliques '])
      }
      console.log(response1.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const itemsPerPage = 50 // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(kpiData.length / itemsPerPage)

  // Paginate the data based on the current page
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, kpiData.length)

  const filteredData = kpiData.filter((row) =>
  row.VERTRAG.includes(searchTerm)
  );

const paginatedData = filteredData.slice(startIndex, endIndex);

//  const paginatedData = kpiData.slice(startIndex, endIndex)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const selectedFields = fieldsConfigurations[bapi] || []

  const VerticallyCentered = () => {
    const [visible, setVisible] = useState(false)
    return (
      <>
        {/* <div className='d-flex align-items-between justify-content-between'>
          <div className="mt-4 mb-4 d-flex justify-content-start">
            <CButton color="success">Envoyer Données</CButton>
          </div>
          <div className="mt-4 mb-4 d-flex justify-content-end"> */}
        <CButton
          onClick={() => {
            setVisible(!visible)
            fetchData()
          }}
        >
          Pie Chart
        </CButton>
        {/* </div>
        </div> */}

        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Graphe de distrubition des contrats</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CChartPie
              data={{
                labels: label,
                datasets: [
                  {
                    data: [count3, count1],
                    backgroundColor: ['#FF6384', '#36A2EB'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                  },
                ],
              }}
            />
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            {/* <CButton color="primary">Save changes</CButton> */}
          </CModalFooter>
        </CModal>
      </>
    )
  }

  return (
    <div className="text-center">
      {kpiData.length === 0 ? (
        <>
          {' '}
          <h1 className="mt-5" style={{ textAlign: 'center' }}>
            pas des donneés pour {titles[bapi][0].title} entre {startdate} et {enddate}
          </h1>
        </>
      ) : (
        //////////////////////////////

        <>
          {' '}
          <h1 style={{ textAlign: 'center' }}>{titles[bapi][0].title}</h1>
          <CFormInput
                className="mt-4 mb-4 d-flex justify-content-start"
                style={{ width: '200px', marginRight: '10px' }}
                type="text"
                placeholder="Contrat"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
          <div className="mt-4 mb-4 d-flex align-items-between justify-content-between">
            <div className=" d-flex justify-content-start">
              <Link to={`/forms/MailPage/${startdate}/${enddate}`}>
                <CButton color="success">Envoyer Données</CButton>
              </Link>
              
            </div>
            {VerticallyCentered()}
          </div>
          <CTable
            hover
            style={selectedFields === 'fields1' ? { marginLeft: '100px' } : { marginLeft: '25px' }}
            columnFilter
            tableFilter
            itemsPerPageSelect
            itemsPerPage={5}
            pagination
          >
            <CTableHead>
              <CTableRow>
                {selectedFields.map((field, index) => (
                  <CTableHeaderCell key={index} scope="col">
                    {field.label}
                  </CTableHeaderCell>
                ))}
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {paginatedData.map((row, rowIndex) => (
                <CTableRow key={rowIndex}>
                  {selectedFields
                    ? selectedFields.map((field, fieldIndex) => (
                        <CTableDataCell key={fieldIndex}>{row[field.key]}</CTableDataCell>
                      ))
                    : 'No data Found in This period !!'}
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <CPagination align="center" aria-label="Page navigation example">
            <CPaginationItem
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </CPaginationItem>
            {Array.from({ length: totalPages }).map((_, index) => (
              <CPaginationItem
                key={index}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </CPaginationItem>
            ))}
            <CPaginationItem
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </CPaginationItem>
          </CPagination>
        </>
      )}
    </div>
  )
}

DataTable.propTypes = {
  kpiData: PropTypes.arrayOf(
    PropTypes.shape({
      BUKRS: PropTypes.string.isRequired,
      VERTRAG: PropTypes.string.isRequired,
      VBEZ: PropTypes.string.isRequired,
      VBEGINN: PropTypes.string.isRequired,
      VENDE: PropTypes.string.isRequired,
    }),
  ).isRequired,
  bapi: PropTypes.oneOf(Object.keys(fieldsConfigurations)).isRequired,
  startdate: PropTypes.string.isRequired, // Add prop type validation for startDate
  enddate: PropTypes.string.isRequired,
}

export default DataTable
