import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AboutPage() {
  return (
    <div className="container py-10 max-w-4xl mx-auto px-4 md:px-0">
      <h1 className="text-4xl font-bold mb-8 text-center">About BizIntel</h1>

      <div className="prose prose-lg dark:prose-invert mb-12">
        <p>
          BizIntel is an AI-powered business management assistant designed to
          help students, educators, and business professionals understand and
          apply concepts from Paul Hoang's Business Management 5th Edition
          textbook.
        </p>
        <p>
          This project was developed as part of the International Baccalaureate
          Group 4 project, focusing on how artificial intelligence can enhance
          business management education and practice.
        </p>
      </div>

      <Tabs defaultValue="project">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="project">The Project</TabsTrigger>
          <TabsTrigger value="tools">Business Tools</TabsTrigger>
          <TabsTrigger value="technology">Technology</TabsTrigger>
        </TabsList>

        <TabsContent value="project">
          <Card>
            <CardHeader>
              <CardTitle>IB Group 4 Project</CardTitle>
              <CardDescription>
                Exploring AI's impact on business management education
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                This project explores how artificial intelligence can transform
                business management education by providing instant access to
                textbook knowledge and automated application of business tools.
              </p>
              <p>
                The IB Group 4 project challenged us to investigate the
                intersection of technology and traditional educational
                resources, resulting in this interactive platform that allows
                students to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Ask questions about business management concepts and receive
                  answers based on Paul Hoang's textbook
                </li>
                <li>Apply business analysis tools to real-world scenarios</li>
                <li>
                  Save and review their learning journey through the personal
                  dashboard
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools">
          <Card>
            <CardHeader>
              <CardTitle>Business Management Tools</CardTitle>
              <CardDescription>
                Apply theoretical frameworks to business scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">SWOT Analysis</h3>
                <p>
                  Evaluate a business's Strengths, Weaknesses, Opportunities,
                  and Threats to understand its internal and external position.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">PESTLE Analysis</h3>
                <p>
                  Examine the Political, Economic, Social, Technological, Legal,
                  and Environmental factors affecting a business.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">
                  Porter's Five Forces
                </h3>
                <p>
                  Analyze competitive intensity and market attractiveness
                  through supplier power, buyer power, competitive rivalry,
                  threat of substitution, and threat of new entry.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Ansoff Matrix</h3>
                <p>
                  Identify growth strategies through market penetration, market
                  development, product development, and diversification.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technology">
          <Card>
            <CardHeader>
              <CardTitle>Technology Stack</CardTitle>
              <CardDescription>
                Modern web technologies powering BizIntel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Frontend</h3>
                  <ul className="space-y-2">
                    <li>
                      <span className="font-medium">Next.js:</span> React
                      framework for server-rendered applications
                    </li>
                    <li>
                      <span className="font-medium">Shadcn UI:</span> Modern UI
                      component library
                    </li>
                    <li>
                      <span className="font-medium">Aceternity UI:</span>{" "}
                      Advanced animated UI components
                    </li>
                    <li>
                      <span className="font-medium">NextAuth.js:</span>{" "}
                      Authentication system
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Backend</h3>
                  <ul className="space-y-2">
                    <li>
                      <span className="font-medium">Express.js:</span> Node.js
                      web application framework
                    </li>
                    <li>
                      <span className="font-medium">MongoDB:</span> NoSQL
                      database for storing user data and chat history
                    </li>
                    <li>
                      <span className="font-medium">AI Integration:</span>{" "}
                      Natural language processing for business management
                      concepts
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
