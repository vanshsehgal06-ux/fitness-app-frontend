import { useState } from "react";

import Sidebar from "../../components/dashboard/Sidebar";

import AccountCard from "../../components/settings/AccountCard";
import SecurityCard from "../../components/settings/SecurityCard";
import PreferenceCard from "../../components/settings/PreferenceCard";
import NotificationCard from "../../components/settings/NotificationCard";
import DangerZone from "../../components/settings/DangerZone";

export default function Settings() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <main
        className={`transition-all duration-300 ${
          collapsed ? "ml-24" : "ml-72"
        }`}
      >
        <div className="mx-auto max-w-5xl p-10">

          <h1 className="text-5xl font-bold text-foreground">
            Settings
          </h1>

          <p className="mt-3 text-muted-foreground">
            Manage your account and application preferences.
          </p>

          <div className="mt-10 space-y-6">

            <AccountCard />

            <SecurityCard />

            <PreferenceCard />

            <NotificationCard />

            <DangerZone />

          </div>

        </div>
      </main>
    </div>
  );
}