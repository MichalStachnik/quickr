import {
  Card,
  // CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const AboutPage = async () => {
  // const user = await currentUser();

  return (
    <div className="h-screen">
      <Card className="p-4">
        <CardHeader>
          <CardTitle>About Quickr</CardTitle>
          <CardDescription>
            quickr is a minimalistic expense tracker
          </CardDescription>
        </CardHeader>
        {/* <CardContent></CardContent> */}
      </Card>
    </div>
  );
};

export default AboutPage;
