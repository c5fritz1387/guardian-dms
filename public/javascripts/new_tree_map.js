var config = {
    geojson: 'pg/plots', //birchplot.js needs to be saved to birchplot.geojson
    title: "Guardian DMS",
    layerName: "Plots",
    hoverProperty: "plotstatus", //add new property
    sortProperty: "tap_stem", //
    sortOrder: "desc"
};

var properties = [{
    value: "site_plot",
    label: "Plot Unique ID",
    table: {
        visible: true,
        sortable: true
    },
    filter: {
        type: "string"
    },
    info: false
}, {
    value: "site_id",
    label: "Site Identifier",
    table: {
        visible: true,
        sortable: true
    },
    filter: {
        type: "integer"
    }
}, {
    value: "plot_id",
    label: "Plot Identifier",
    table: {
        visible: true,
        sortable: true
    },
    filter: {
        type: "integer",
        input: "checkbox",
        vertical: true,
        multiple: true,
        operators: ["in", "not_in", "equal", "not_equal"],
        values: []
    }
}, {
    value: "daterecord",
    label: "Date Recorded",
    table: {
        visible: true,
        sortable: true
    },
    filter: {
        type: "string",
        input: "checkbox",
        vertical: true,
        multiple: true,
        operators: ["in", "not_in", "equal", "not_equal"],
        values: []
    }
}, {
    value: "sitestatus",
    label: "Site Status",
    table: {
        visible: true,
        sortable: true
    },
    filter: {
        type: "string",
        input: "checkbox",
        vertical: true,
        multiple: true,
        operators: ["in", "not_in", "equal", "not_equal"],
        values: []
    }
}, {
    value: "plotstatus",
    label: "Plot Status",
    table: {
        visible: true,
        sortable: true
    },
    filter: {
        type: "string",
        input: "checkbox",
        vertical: true,
        multiple: true,
        operators: ["in", "not_in", "equal", "not_equal"],
        values: []
    }
}, {
    value: "forest_nam",
    label: "Forest Name",
    table: {
        visible: true,
        sortable: true
    },
    filter: {
        type: "string",
        input: "checkbox",
        vertical: true,
        multiple: true,
        operators: ["in", "not_in", "equal", "not_equal"],
        values: []
    }
}, {
    value: "forest_num",
    label: "Forest Code",
    table: {
        visible: true,
        sortable: true
    },
    filter: {
        type: "integer",
        input: "checkbox",
        vertical: true,
        multiple: true,
        operators: ["in", "not_in", "equal", "not_equal"],
        values: []
    }
}, {
    value: "tap_stem",
    label: "Stem Density (Trees/Ha) - Tap",
    table: {
        visible: true,
        sortable: true
    },
    filter: {
        type: "integer"
    }
}, {
    value: "tap_dbh",
    label: "DBH Average (cm) - Tap",
    table: {
        visible: true,
        sortable: true
    },
    filter: {
        type: "integer"
    }
}, {
    value: "ha",
    label: "Site Size (Ha)",
    table: {
        visible: true,
        sortable: true
    },
    filter: {
        type: "integer"
    }
}, {
    value: "access1km",
    label: "Site Accessibility within 1 km",
    table: {
        visible: true,
        sortable: true
    },
    filter: {
        type: "string",
        input: "radio",
        operators: ["equal"],
        values: {
            "y": "Yes",
            "null": "No"
        }
    }
}, {
    value: "tap_class",
    label: "Tappable",
    table: {
        visible: true,
        sortable: true
    },
    filter: {
        type: "string",
        input: "radio",
        operators: ["equal"],
        values: {
            "Tap": "Yes",
            "No Tap": "No"
        }
    }
}, {
    value: "prem_class",
    label: "Monitor for Growth 1-5 years",
    table: {
        visible: true,
        sortable: true
    },
    filter: {
        type: "string",
        input: "radio",
        operators: ["equal"],
        values: {
            "Monitor": "Yes",
            "No Monitor": "No"
        }
    }
}, {
    value: "dis_chap",
    label: "Distance to Chapleau, ON",
    table: {
        visible: false,
        sortable: true
    }
}, {
    value: "dis_tl",
    label: "Distance to Trout Lake, ON",
    table: {
        visible: false,
        sortable: true
    }
}, {
    value: "spcomp",
    label: "Species Composition",
    table: {
        visible: false,
        sortable: true
    }
}, {
    value: "gps_codeg",
    label: "Team",
    table: {
        visible: false,
        sortable: true
    }
}, {
    value: "siteaccess",
    label: "Access Type",
    table: {
        visible: false,
        sortable: true
    }
}, {
    value: "x_plot",
    label: "DD Longitude Center",
    table: {
        visible: true
   }
}, {
    value: "y_plot",
    label: "DD Latitude Center",
    table: {
        visible: true
   }
}, {
    value: "bw_dbh",
    label: "BH Average (cm) - BW",
    table: {
        visible: false,
        sortable: true
    }
}];