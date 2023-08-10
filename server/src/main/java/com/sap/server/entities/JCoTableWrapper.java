package com.sap.server.entities;

import com.sap.conn.jco.JCoTable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JCoTableWrapper {
    private JCoTable table;
    private boolean isEmpty;


    public JCoTableWrapper(JCoTable table, boolean isEmpty) {
        this.table = table;
        this.isEmpty = isEmpty;
    }

    public JCoTable getTable() {
        return table;
    }

    public boolean isEmpty() {
        return isEmpty;
    }
}
