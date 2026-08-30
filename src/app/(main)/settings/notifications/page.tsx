import { PageHeader } from "@/components/finance/page-header";
import { Card, CardContent } from "@/components/ui/card";

import { NotificationSettingsForm } from "../_components/notification-settings-form";
import { SettingsNav } from "../_components/settings-nav";

export const metadata = { title: "Notification Preferences | Financial Management System" };

export default function NotificationPreferencesPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="Notification Preferences" description="Choose which financial events notify you." />
      <SettingsNav />
      <Card>
        <CardContent className="pt-2">
          <NotificationSettingsForm />
        </CardContent>
      </Card>
    </div>
  );
}
