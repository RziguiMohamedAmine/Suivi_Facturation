package com.sap.server.services;
import com.sap.server.entities.JCoTableWrapper;
import com.sap.server.entities.PieChart;
import com.sap.server.shared.Utility;

import com.sap.conn.jco.JCoDestination;
import com.sap.conn.jco.JCoDestinationManager;
import com.sap.conn.jco.JCoTable;
import com.sap.conn.jco.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@Slf4j
public class KpisService implements IKpisService {


    @Override
    public JCoTableWrapper getKpi1(String func, String startDate, String endDate) throws JCoException {
        Utility u = new Utility();
        JCoDestination destination = JCoDestinationManager.getDestination("ABAP_BACK");
        JCoFunction function = destination.getRepository().getFunction(func);

        if (function == null) {
            throw new RuntimeException("ZBAPI_KPI1 Not Found");
        }

        JCoParameterList importParams = function.getImportParameterList();
        JCoStructure dateStruct = importParams.getStructure("DATE_ST");
        JCoStructure dateStruct2 = importParams.getStructure("DATE_EN");


        Date dateStart = u.ConvertDate(startDate);
        Date dateEnd = u.ConvertDate(endDate);

        dateStruct.setValue("LV_DATE", dateStart);
        dateStruct2.setValue("LV_DATE", dateEnd);

        try {
            function.execute(destination);
        } catch (AbapException e) {
            e.printStackTrace();
        }
        JCoTable table = function.getTableParameterList().getTable("DATATABLE");
        boolean isEmpty = table.isEmpty();
        return new JCoTableWrapper(table, isEmpty);
    }

    @Override
    public boolean sendEmail(String startDate,String endDate,String senderEmail,String recipientEmail) {
        try {
            Utility u = new Utility();
            JCoDestination destination = JCoDestinationManager.getDestination("ABAP_BACK");
            JCoFunction function = destination.getRepository().getFunction("ZBAPI_MAIL"); // Replace "BAPI_NAME" with the name of your BAPI

            if (function == null) {
                throw new RuntimeException("ZBAPI_KPI1 Not Found");
            }

            JCoParameterList importParams = function.getImportParameterList();
            JCoStructure dateStruct = importParams.getStructure("DATE_ST");
            JCoStructure dateStruct2 = importParams.getStructure("DATE_EN");


            Date dateStart = u.ConvertDate(startDate);
            Date dateEnd = u.ConvertDate(endDate);

            dateStruct.setValue("LV_DATE", dateStart);
            dateStruct2.setValue("LV_DATE", dateEnd);
            // Set input parameters for your BAPI
            function.getImportParameterList().setValue("MAIL", recipientEmail);
            function.getImportParameterList().setValue("MAILSEND", senderEmail);

            // Call the BAPI
            function.execute(destination);

            return true;
        } catch (JCoException e) {
            // Handle JCo exceptions
            e.printStackTrace();
            return false;
        }
    }



    @Override
    public PieChart getPie(String func, String startDate, String endDate) throws JCoException {
        Utility u = new Utility();
        JCoDestination destination = JCoDestinationManager.getDestination("ABAP_BACK");
        JCoFunction function = destination.getRepository().getFunction(func);

        if (function == null) {
            throw new RuntimeException("ZBAPI_KPI1 Not Found");
        }

        JCoParameterList importParams = function.getImportParameterList();
        JCoParameterList exportParams = function.getExportParameterList();

        JCoStructure dateStruct = importParams.getStructure("DATE_ST");
        JCoStructure dateStruct2 = importParams.getStructure("DATE_EN");

        JCoStructure cuntStructure = exportParams.getStructure("COUNT1");
        JCoStructure cuntStructure2 = exportParams.getStructure("COUNT2");

        Date dateStart = u.ConvertDate(startDate);
        Date dateEnd = u.ConvertDate(endDate);

        dateStruct.setValue("LV_DATE", dateStart);
        dateStruct2.setValue("LV_DATE", dateEnd);

        try {
            function.execute(destination);
        } catch (AbapException e) {
            e.printStackTrace();
        }
        JCoTable table = function.getTableParameterList().getTable("DATATABLE");
        boolean isEmpty = table.isEmpty();

        PieChart piechart = new PieChart();
        piechart.setCount1(cuntStructure.getInt("COUNT"));
        piechart.setCount2(cuntStructure2.getInt("COUNT"));
        piechart.setCount3(cuntStructure2.getInt("COUNT")-cuntStructure.getInt("COUNT"));

        return piechart;
    }









}
