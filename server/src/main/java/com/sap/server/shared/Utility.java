package com.sap.server.shared;

import com.sap.conn.jco.JCoField;
import com.sap.conn.jco.JCoRecord;
import com.sap.conn.jco.JCoTable;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Slf4j
@Service
public class Utility {

public Date ConvertDate(String dateString){

    String pattern = "dd.MM.yyyy";

    SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
    Date date = null;
    try {
        date = dateFormat.parse(dateString);

    } catch (ParseException e) {
        e.printStackTrace();
    }
    return date;
}

    public List<Map<String, Object>> convertJCoTableToMapList(JCoTable jcoTable) {
        List<Map<String, Object>> dataList = new ArrayList<>();
        jcoTable.firstRow();

        do {
            Map<String, Object> rowData = new HashMap<>();
            JCoRecord record = jcoTable;
            for (JCoField field : record) {
                rowData.put(field.getName(), field.getValue());
            }
            dataList.add(rowData);
        } while (jcoTable.nextRow());

       // System.out.println(dataList);
        return dataList;
    }


//    private ADR6_SMTP_ADDR toSAPSmtpAddress(String email) {
//        ADR6_SMTP_ADDR sapAddress = new ADR6_SMTP_ADDR();
//        String[] parts = email.split("@");
//        sapAddress.setSMTP_ADDR(parts[0]);
//        sapAddress.setDOMAIN(parts[1]);
//        // Set other fields if needed
//        return sapAddress;
//    }



}
