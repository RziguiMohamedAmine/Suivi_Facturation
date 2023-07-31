package com.sap.server.services;

import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoTable;

public interface IKpisService {

    JCoTable getKpi1(String func,String startDate,String endDate)throws JCoException;
}
