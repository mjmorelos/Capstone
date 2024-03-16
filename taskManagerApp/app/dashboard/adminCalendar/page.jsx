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
import { getUserColor } from "../../utility/userColorMapping";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NAaF1cXmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjW31dcXBWR2NUVkV/Ww=="
);

const AdminCalendarPage = () => {
  const [studentUsers, setStudentUsers] = useState([]);
  
  useEffect(() => {
    async function fetchUsersAndSetResources() {
      try {
        const response = await fetch("/taskManagerApp/app/api/students");
        if (!response.ok) {
          console.error("Response error:", response.statusText);
          const text = await response.text();
          console.error("Raw response:", text);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const users = await response.json();
        const resources = users.map((user) => ({
          Id: user.id,
          Text: user.name,
          Color: getUserColor(user.id),
        }));
        setStudentUsers(resources);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsersAndSetResources();
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
                dataSource={studentUsers}
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
