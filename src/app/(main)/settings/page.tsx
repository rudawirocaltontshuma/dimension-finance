import { PageHeader } from "@/components/finance/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AppearanceSettingsForm } from "./_components/appearance-settings-form";
import { CompanySettingsForm } from "./_components/company-settings-form";
import { NotificationSettingsForm } from "./_components/notification-settings-form";
import { NumberingSettingsForm } from "./_components/numbering-settings-form";
import { SettingsNav } from "./_components/settings-nav";

export const metadata = { title: "Company Settings | Financial Management System" };

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader
        title="Administration"
        description="Manage company profile, numbering, notifications and appearance."
      />
      <SettingsNav />

      <Tabs defaultValue="company" className="flex flex-col gap-4">
        <TabsList variant="line">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="numbering">Numbering</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardContent className="pt-2">
              <CompanySettingsForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="numbering">
          <Card>
            <CardContent className="pt-2">
              <NumberingSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardContent className="pt-2">
              <NotificationSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card>
            <CardContent className="pt-2">
              <AppearanceSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
