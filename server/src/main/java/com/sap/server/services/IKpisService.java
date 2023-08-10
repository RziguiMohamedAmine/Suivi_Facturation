package com.sap.server.services;

import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoTable;
import com.sap.server.entities.JCoTableWrapper;
import com.sap.server.entities.PieChart;

public interface IKpisService {

    JCoTableWrapper getKpi1(String func, String startDate, String endDate)throws JCoException;
    boolean sendEmail(String startDate,String endDate,String senderEmail,String recipientEmail) throws JCoException;
    public PieChart getPie(String func, String startDate, String endDate) throws JCoException;
}
