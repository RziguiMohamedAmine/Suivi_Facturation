package com.sap.server.controllers;


import com.sap.conn.jco.JCoException;
import com.sap.conn.jco.JCoTable;
import com.sap.server.auth.AuthenticationService;
import com.sap.server.entities.EmailRequest;
import com.sap.server.entities.JCoTableWrapper;
import com.sap.server.entities.PieChart;
import com.sap.server.services.IKpisService;
import com.sap.server.services.JwtService;
import com.sap.server.shared.Utility;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;


@RestController //ou @Controller
@AllArgsConstructor
@RequestMapping("/Kpis")
public class KpisController {

    Utility util ;
    IKpisService kpisService;
    //@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getKpi1")
    ResponseEntity<List<Map<String, Object>>> getKpi1(@RequestParam String startDate,
                                                      @RequestParam String endDate) throws JCoException {
        JCoTableWrapper jcoTableWrapper = kpisService.getKpi1("ZBAPI_KPI1",startDate, endDate);
        if (jcoTableWrapper.isEmpty()) {
            // Handle empty table case
            return ResponseEntity.ok(Collections.emptyList()); // or return an appropriate response
        } else {
            JCoTable jcoTable = jcoTableWrapper.getTable();
            List<Map<String, Object>> dataList = util.convertJCoTableToMapList(jcoTable);
            return ResponseEntity.ok(dataList);
        }
    }
    private final AuthenticationService authenticationService;
    @GetMapping("/session/{token}")
    public ResponseEntity<UserDetails> getUserFromToken(@PathVariable String token) {
        return authenticationService.getUserFromToken(token);
    }

    @GetMapping("/getKpi2")
    ResponseEntity<List<Map<String, Object>>> getKpi2(@RequestParam String startDate,
                                                      @RequestParam String endDate) throws JCoException {
        JCoTableWrapper jcoTableWrapper = kpisService.getKpi1("ZBAPI_KPI2",startDate, endDate);
        if (jcoTableWrapper.isEmpty()) {
            // Handle empty table case
            System.out.println("pas des donneés dans cette periode ");
            return ResponseEntity.ok(Collections.emptyList()); // or return an appropriate response
        } else {
            JCoTable jcoTable = jcoTableWrapper.getTable();
            List<Map<String, Object>> dataList = util.convertJCoTableToMapList(jcoTable);
            return ResponseEntity.ok(dataList);
        }
    }

    @GetMapping("/getKpi3")
    ResponseEntity<List<Map<String, Object>>> getKpi3(@RequestParam String startDate,
                                                      @RequestParam String endDate) throws JCoException {
        JCoTableWrapper jcoTableWrapper = kpisService.getKpi1("ZBAPI_KPI3",startDate, endDate);
        if (jcoTableWrapper.isEmpty()) {
            // Handle empty table case
            return ResponseEntity.ok(Collections.emptyList()); // or return an appropriate response
        } else {
            JCoTable jcoTable = jcoTableWrapper.getTable();
            List<Map<String, Object>> dataList = util.convertJCoTableToMapList(jcoTable);
            return ResponseEntity.ok(dataList);
        }
    }
    @GetMapping("/getKpi4")
    ResponseEntity<List<Map<String, Object>>> getKpi4(@RequestParam String startDate,
                                                      @RequestParam String endDate) throws JCoException {
        JCoTableWrapper jcoTableWrapper = kpisService.getKpi1("ZBAPI_KPI4",startDate, endDate);
        if (jcoTableWrapper.isEmpty()) {
            // Handle empty table case
            return ResponseEntity.ok(Collections.emptyList()); // or return an appropriate response
        } else {
            JCoTable jcoTable = jcoTableWrapper.getTable();
            List<Map<String, Object>> dataList = util.convertJCoTableToMapList(jcoTable);
            return ResponseEntity.ok(dataList);
        }
    }
    @GetMapping("/getKpi5")
    ResponseEntity<List<Map<String, Object>>> getKpi5(@RequestParam String startDate,
                                                      @RequestParam String endDate) throws JCoException {
        JCoTableWrapper jcoTableWrapper = kpisService.getKpi1("ZBAPI_KPI5",startDate, endDate);
        if (jcoTableWrapper.isEmpty()) {
            // Handle empty table case
            return ResponseEntity.ok(Collections.emptyList()); // or return an appropriate response
        } else {
            JCoTable jcoTable = jcoTableWrapper.getTable();
            List<Map<String, Object>> dataList = util.convertJCoTableToMapList(jcoTable);
            return ResponseEntity.ok(dataList);
        }
    }
    @GetMapping("/getKpi6")
    ResponseEntity<List<Map<String, Object>>> getKpi6(@RequestParam String startDate,
                                                      @RequestParam String endDate) throws JCoException {
        JCoTableWrapper jcoTableWrapper = kpisService.getKpi1("ZBAPI_KPI6",startDate, endDate);
        if (jcoTableWrapper.isEmpty()) {
            // Handle empty table case
            return ResponseEntity.ok(Collections.emptyList()); // or return an appropriate response
        } else {
            JCoTable jcoTable = jcoTableWrapper.getTable();
            List<Map<String, Object>> dataList = util.convertJCoTableToMapList(jcoTable);
            return ResponseEntity.ok(dataList);
        }
    }
    @GetMapping("/getKpi7")
    ResponseEntity<List<Map<String, Object>>> getKpi7(@RequestParam String startDate,
                                                      @RequestParam String endDate) throws JCoException {
        JCoTableWrapper jcoTableWrapper = kpisService.getKpi1("ZBAPI_KPI7",startDate, endDate);
        if (jcoTableWrapper.isEmpty()) {
            // Handle empty table case
            return ResponseEntity.ok(Collections.emptyList()); // or return an appropriate response
        } else {
            JCoTable jcoTable = jcoTableWrapper.getTable();
            List<Map<String, Object>> dataList = util.convertJCoTableToMapList(jcoTable);
            return ResponseEntity.ok(dataList);
        }
    }

    @GetMapping("/getKpi8")
    ResponseEntity<List<Map<String, Object>>> getKpi8(@RequestParam String startDate,
                                                      @RequestParam String endDate) throws JCoException {
        JCoTableWrapper jcoTableWrapper = kpisService.getKpi1("ZBAPI_KPI8",startDate, endDate);
        if (jcoTableWrapper.isEmpty()) {
            // Handle empty table case
            return ResponseEntity.ok(Collections.emptyList()); // or return an appropriate response
        } else {
            JCoTable jcoTable = jcoTableWrapper.getTable();
            List<Map<String, Object>> dataList = util.convertJCoTableToMapList(jcoTable);
            return ResponseEntity.ok(dataList);
        }
    }

    @PostMapping("/sendmail")
    ResponseEntity<String> sendMail(@RequestParam String startDate,
                                                      @RequestParam String endDate,
                                                       @RequestBody EmailRequest emailRequest) throws JCoException {
        String recipientEmail = emailRequest.getRecipientEmail();
        String senderEmail = emailRequest.getSenderEmail();

        // Call the EmailService to send the email using the BAPI
        if(kpisService.sendEmail(startDate,endDate, senderEmail,recipientEmail)){
            return ResponseEntity.ok("Email sent successfully");
    } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to send email");
    }

    }


    @GetMapping("/PieChart")
    public ResponseEntity<PieChart> callBapi(@RequestParam String startDate, @RequestParam String endDate) {
        try {
            PieChart result = kpisService.getPie("ZBAPI_KPI2",startDate, endDate);
            return ResponseEntity.ok(result);
        } catch (JCoException e) {
            // Handle exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/PieChart3")
    public ResponseEntity<PieChart> callBapi3(@RequestParam String startDate, @RequestParam String endDate) {
        try {
            PieChart result = kpisService.getPie("ZBAPI_KPI3",startDate, endDate);
            return ResponseEntity.ok(result);
        } catch (JCoException e) {
            // Handle exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }




}
