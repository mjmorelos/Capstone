"use client";
import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Inject,
  Toolbar,
  ExcelExport,
  PdfExport,
  Group,
} from "@syncfusion/ej2-react-grids";
import { employeeDetails } from "./data";
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from "./property-pane";
import styles from "@/app/ui/dashborad/reportlist/master.module.css";
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjW31dcXBWR2NUVkV/Ww=="
);

function MasterReport() {
  const toolbarOptions = ["ExcelExport", "PdfExport", "CsvExport"];
  let gridInstance;
  let checkboxObj;
  let flag = true;
  function dataBound() {
    if (flag) {
      gridInstance.toolbarModule.toolbar.hideItem(2, true);
      flag = false;
    }
  }

  function exportQueryCellInfo(args) {
    if (args.column.headerText === "Employee Image") {
      if (args.name === "excelQueryCellInfo") {
        args.image = {
          height: 75,
          base64: args.data["EmployeeImage"],
          width: 75,
        };
      } else {
        args.image = { base64: args.data["EmployeeImage"] };
      }
    }
    if (args.column.headerText === "Email ID") {
      args.hyperLink = {
        target: "mailto:" + args.data["EmailID"],
        displayText: args.data["EmailID"],
      };
    }
  }

  function onChanged(args) {
    let fields = ["Employee Image", "Email ID"];
    if (args.checked) {
      gridInstance.showColumns(fields, "headerText");
      gridInstance.toolbarModule.toolbar.hideItem(2, true);
    } else {
      gridInstance.hideColumns(fields, "headerText");
      gridInstance.toolbarModule.toolbar.hideItem(2, false);
    }
  }

  function gridImageTemplate(props) {
    var src =
      "https://ej2.syncfusion.com/react/demos/src/grid/images/" +
      props.EmployeeID +
      ".png";

    const imageStyle = {
      width: "80px", // Set image width
      height: "80px", // Set image height
      borderRadius: "50%", // Make the image circular
    };
    return (
      <div className="image">
        <img src={src} alt={props.EmployeeID} style={imageStyle} />
      </div>
    );
  }
  function gridUrlTemplate(props) {
    var src = "mailto:${EmailID}" + props.EmailID;
    return (
      <div className="url">
        <a href={src}>{props.EmailID}</a>
      </div>
    );
  }
  const template1 = gridImageTemplate;
  const template2 = gridUrlTemplate;

  function toolbarClick(args) {
    switch (args.item.id) {
      case "DefaultExport_pdfexport":
        gridInstance.pdfExport();
        break;
      case "DefaultExport_excelexport":
        gridInstance.excelExport();
        break;
      case "DefaultExport_csvexport":
        gridInstance.csvExport();
        break;
    }
  }

  return (
    <div className="control-pane">
      <div
        className="col-lg-9 control-section"
        style={{
          backgroundColor: "#ffffff",
          border: "20px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        <GridComponent
          id="DefaultExport"
          dataSource={employeeDetails}
          ref={(grid) => (gridInstance = grid)}
          toolbar={toolbarOptions}
          allowExcelExport={true}
          allowPdfExport={true}
          allowSorting={true}
          allowGrouping={true}
          toolbarClick={toolbarClick.bind(this)}
          dataBound={dataBound.bind(this)}
          excelQueryCellInfo={exportQueryCellInfo.bind(this)}
          pdfQueryCellInfo={exportQueryCellInfo.bind(this)}
          height="600"
          className={styles.gridMargin}
        >
          <ColumnsDirective>
            <ColumnDirective
              headerText="Employee Image"
              width="150"
              template={template1}
              textAlign="Center"
            ></ColumnDirective>
            <ColumnDirective
              field="FirstName"
              headerText="Name"
              width="130"
            ></ColumnDirective>
            <ColumnDirective
              field="Title"
              headerText="Designation"
              width="180"
            ></ColumnDirective>
            <ColumnDirective
              headerText="Email ID"
              width="180"
              template={template2}
            ></ColumnDirective>
            <ColumnDirective
              field="HireDate"
              headerText="Hire Date"
              width="120"
              format="yMd"
              textAlign="Right"
            ></ColumnDirective>
            <ColumnDirective
              field="Address"
              width="180"
              allowGrouping={false}
            ></ColumnDirective>
          </ColumnsDirective>
          <Inject services={[Toolbar, ExcelExport, PdfExport, Group]} />
        </GridComponent>
      </div>
      <div className="col-lg-3 property-section">
        <PropertyPane title="Properties">
          <table
            id="property"
            title="Properties"
            className="property-panel-table"
            style={{ width: "100%" }}
          >
            <tbody>
              <tr>
                <td style={{ width: "70%" }}>
                  <div>Export template column </div>
                </td>
                <td style={{ width: "30%", padding: "10px 10px 10px 0px" }}>
                  <CheckBoxComponent
                    ref={(scope) => {
                      checkboxObj = scope;
                    }}
                    checked={true}
                    change={onChanged.bind(this)}
                  ></CheckBoxComponent>
                </td>
              </tr>
            </tbody>
          </table>
        </PropertyPane>
      </div>
    </div>
  );
}
export default MasterReport;
