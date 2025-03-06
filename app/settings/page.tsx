import {
  Card,
  // CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const SettingsPage = async () => {
  // const user = await currentUser();

  return (
    <div className="h-screen">
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Your settings</CardTitle>
          <CardDescription>at a glance</CardDescription>
        </CardHeader>
        {/* <CardContent></CardContent> */}
      </Card>
    </div>
  );
};

export default SettingsPage;
