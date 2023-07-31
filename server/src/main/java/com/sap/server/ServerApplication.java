package com.sap.server;

import com.sap.conn.jco.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) throws JCoException {
		SpringApplication.run(ServerApplication.class, args);

//		JCoDestination destination = JCoDestinationManager.getDestination("ABAP_BACK");
//		//destination.ping();
//		JCoFunction function = destination.getRepository().getFunction("ZBAPI_KPI1");
//		if (function == null) {
//			throw new RuntimeException("ZBAPI_KPI1 Not Found");
//		}
//
//		JCoParameterList importParams = function.getImportParameterList();
//		JCoStructure dateStruct = importParams.getStructure("DATE_ST");
//		JCoStructure dateStruct2 = importParams.getStructure("DATE_EN");
//
//
//		String dateString = "12.05.2012";
//		String dateString2 = "12.05.2017";
//		String pattern = "dd.MM.yyyy";
//
//		SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
//		Date date = null;
//		Date date2 = null;
//		try {
//			date = dateFormat.parse(dateString);
//			date2 = dateFormat.parse(dateString2);
//
//		} catch (ParseException e) {
//			e.printStackTrace();
//		}
//
//		dateStruct.setValue("LV_DATE", date); // Replace "FIELD_NAME" with the actual field name in your ZBAPI_EVER_STRUCT structure
//		dateStruct2.setValue("LV_DATE", date2); // Replace "FIELD_NAME" with the actual field name in your ZBAPI_EVER_STRUCT structure
//
//		try {
//			function.execute(destination);
//		} catch (AbapException e) {
//			e.printStackTrace();
//			return;
//		}
//
//		// System.out.println("Attributes:");
//		// System.out.println(destination.getAttributes());
//		JCoTable table = function.getTableParameterList().getTable("EVERDATA");
//		int numRows = table.getNumRows();
//		System.out.println(numRows);
//		List<Map<String, Object>> dataList = new ArrayList<>();
//		table.firstRow();
//		do {
//			Map<String, Object> rowData = new HashMap<>();
//			JCoRecord record = table;
//			for (JCoField field : record) {
//				rowData.put(field.getName(), field.getValue());
//			}
//			dataList.add(rowData);
//		} while (table.nextRow());
//
//		System.out.println(dataList);
//      /*  for (int i = 0; i < 10; i++) {
//            table.setRow(numRows);
//            System.out.println("VERTRAG: " + table.getString("VERTRAG"));
//            System.out.println("BUKRS: " + table.getString("BUKRS"));
//            *//*System.out.println("VBEZ: " + table.getString("VBEZ"));
//            System.out.println("VBEGINN: " + table.getString("VBEGINN"));
//            System.out.println("VENDE: " + table.getString("VENDE"));
//            System.out.println("SALESPARTNER: " + table.getString("SALESPARTNER"));*//*
//        }*/
	}

}
