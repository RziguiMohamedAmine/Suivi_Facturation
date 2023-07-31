package com.sap.server.controllers;


import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoTable;
import com.sap.server.services.IKpisService;
import com.sap.server.shared.Utility;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController //ou @Controller
@AllArgsConstructor
@RequestMapping("/Kpis")
public class KpisController {

    Utility util ;
    IKpisService kpisService;
    @GetMapping("/getKpi1")
    ResponseEntity<List<Map<String, Object>>> getKpi1(@RequestParam String startDate,
                                                      @RequestParam String endDate) throws JCoException {
        JCoTable jcoTable = kpisService.getKpi1("ZBAPI_KPI1",startDate, endDate);
        List<Map<String, Object>> dataList = util.convertJCoTableToMapList(jcoTable);

        return ResponseEntity.ok(dataList);
        //return kpi1Service.getKpi1(startDate,endDate);
    }

}
