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
} from '@coreui/react'
import { PropTypes } from 'prop-types';

const fieldsConfigurations = {
  fields1 : [
   { key: 'BUKRS', label: 'Class', _style: { width: '40%' } },
   { key: 'VERTRAG', label: 'Contract', _style: { width: '20%' } },
   { key: 'VBEZ', label: 'Heading1', _style: { width: '20%' } },
   { key: 'VBEGINN', label: 'Heading2', _style: { width: '20%' } },
   { key: 'VENDE', label: 'Heading3', _style: { width: '20%' } },
   // Add more fields as needed based on your data
 ],

  fields2 : [
   { key: 'PARTNER', label: 'PARTNER', _style: { width: '40%' } },
   { key: 'FAEDS', label: 'FAEDS', _style: { width: '20%' } },
   { key: 'VERTRAG', label: 'VERTRAG', _style: { width: '20%' } },
   { key: 'OPBEL', label: 'OPBEL', _style: { width: '20%' } },
   { key: 'BUDAT', label: 'BUDAT', _style: { width: '20%' } },
   { key: 'FAEDN', label: 'FAEDN', _style: { width: '20%' } },
   // Add more fields as needed based on your data
 ],

 fields3 : [
  { key: 'BUKRS', label: 'Class', _style: { width: '40%' } },
  { key: 'ABLESGR', label: 'ABLESGR', _style: { width: '20%' } },
  { key: 'VERTRAG', label: 'VERTRAG', _style: { width: '20%' } },
  { key: 'ANLAGE', label: 'ANLAGE', _style: { width: '20%' } },
  { key: 'BUDAT', label: 'BUDAT', _style: { width: '20%' } },
  // Add more fields as needed based on your data
],
fields4 : [
  { key: 'BUKRS', label: 'Class', _style: { width: '40%' } },
  { key: 'BEGABRPE', label: 'BEGABRPE', _style: { width: '20%' } },
  { key: 'VERTRAG', label: 'VERTRAG', _style: { width: '20%' } },
  { key: 'ENDABRPE', label: 'ENDABRPE', _style: { width: '20%' } },
  { key: 'BELNR', label: 'BELNR', _style: { width: '20%' } },
  // Add more fields as needed based on your data
],
fields5 : [
  { key: 'BUKRS', label: 'Class', _style: { width: '40%' } },
  { key: 'OUTCNSO', label: 'OUTCNSO', _style: { width: '20%' } },
  { key: 'VERTRAG', label: 'VERTRAG', _style: { width: '20%' } },
  { key: 'OPBEL', label: 'OPBEL', _style: { width: '20%' } },
  { key: 'BUDAT', label: 'BUDAT', _style: { width: '20%' } },
  // Add more fields as needed based on your data
],
fields6 : [
  { key: 'BUKRS', label: 'Class', _style: { width: '40%' } },
  { key: 'VERTRAG', label: 'VERTRAG', _style: { width: '20%' } },
  { key: 'TEXT30', label: 'TEXT30', _style: { width: '20%' } },
  { key: 'EINZDAT_ALT', label: 'EINZDAT_ALT', _style: { width: '20%' } },
  // Add more fields as needed based on your data
],
fields7 : [
  { key: 'BUKRS', label: 'Class', _style: { width: '40%' } },
  { key: 'VERTRAG', label: 'VERTRAG', _style: { width: '20%' } },
  { key: 'SPARTE', label: 'SPARTE', _style: { width: '20%' } },
  { key: 'ABLBELNR', label: 'ABLBELNR', _style: { width: '20%' } },
  { key: 'ERDAT', label: 'ERDAT', _style: { width: '20%' } },
  { key: 'ABRDATSU', label: 'ABRDATSU', _style: { width: '20%' } },
  { key: 'ERNAM', label: 'ERNAM', _style: { width: '20%' } },
  // Add more fields as needed based on your data
],
};

const DataTable = ( { kpiData, bapi }  ) =>{

  const itemsPerPage = 50; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(kpiData.length / itemsPerPage);

  // Paginate the data based on the current page
  const paginatedData = kpiData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


const selectedFields = fieldsConfigurations[bapi] || [];


  return (
  <div>
    <h1 style={{ textAlign: 'center' }}>Your Big Title</h1>
      <CTable hover style={selectedFields ==='fields1' ? {marginLeft : '100px'} :{marginLeft : '25px'} }
          columnFilter tableFilter itemsPerPageSelect itemsPerPage={5} pagination
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
              {selectedFields ? selectedFields.map((field, fieldIndex) => (
                <CTableDataCell key={fieldIndex}>{row[field.key]}</CTableDataCell>
              )) :"No data Found in This period !!"}
            </CTableRow>
          ))}
        </CTableBody>

      </CTable>
              <CPagination align="center" aria-label="Page navigation example" >
              <CPaginationItem disabled>Previous</CPaginationItem>
              <CPaginationItem>1</CPaginationItem>
              <CPaginationItem>2</CPaginationItem>
              <CPaginationItem>3</CPaginationItem>
              <CPaginationItem>Next</CPaginationItem>
            </CPagination>
</div>
  );
};

DataTable.propTypes = {
  kpiData: PropTypes.arrayOf(
    PropTypes.shape({
      BUKRS: PropTypes.string.isRequired,
      VERTRAG: PropTypes.string.isRequired,
      VBEZ: PropTypes.string.isRequired,
      VBEGINN: PropTypes.string.isRequired,
      VENDE: PropTypes.string.isRequired,
    })
  ).isRequired,
  bapi: PropTypes.oneOf(Object.keys(fieldsConfigurations)).isRequired,
};

export default DataTable;
