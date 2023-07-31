package com.sap.server.services;
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
    public JCoTable getKpi1(String func,String startDate,String endDate) throws JCoException {
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

        return table;
    }
}
