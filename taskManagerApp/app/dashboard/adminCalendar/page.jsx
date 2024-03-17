"use client";

import React, { useEffect, useState } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Inject,
  ResourcesDirective,
  ResourceDirective,
  TimelineMonth,
  Month,
} from "@syncfusion/ej2-react-schedule";
import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";
import { registerLicense } from "@syncfusion/ej2-base";
import generateResourceData from "./helper";


registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjW31dcXBWR2NUVkV/Ww=="
);

const AdminCalendarPage = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchAndDisplayNonAdminUsers = async () => {
      try {
        const response = await fetch("../../api/students", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }


        const data = await response.json();
        const resourceData = generateResourceData(data);
        setResources(resourceData); // Assuming the API returns the data in the correct format
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };
        fetchAndDisplayNonAdminUsers();
      }, []);

  const dataManager = new DataManager({
    url: "https://services.syncfusion.com/react/production/api/VirtualEventData",
    adaptor: new WebApiAdaptor(),
    crossDomain: true,
  });

  return (
    <div className="schedule-control-section">
      <div className="col-lg-12 control-section">
        <div className="control-wrapper">
          <ScheduleComponent
            width="100%"
            height="650px"
            selectedDate={new Date(2023, 3, 1)}
            readonly={true}
            group={{ resources: ["Resources"] }}
            eventSettings={{ dataSource: dataManager }}
          >
            <ResourcesDirective>
              <ResourceDirective
                field="ResourceId"
                title="Resource"
                name="Resources"
                dataSource={resources}
                textField="Text"
                idField="Id"
                colorField="Color"
              />
            </ResourcesDirective>
            <ViewsDirective>
              <ViewDirective
                option="TimelineMonth"
                isSelected={true}
                enableLazyLoading={true}
              />
              <ViewDirective option="Month" enableLazyLoading={true} />
            </ViewsDirective>
            <Inject services={[TimelineMonth, Month]} />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  );
};

export default AdminCalendarPage;
