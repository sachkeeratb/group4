import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const businessTools = [
  {
    id: "swot",
    name: "SWOT Analysis",
    description: "Analyze Strengths, Weaknesses, Opportunities, and Threats",
  },
  {
    id: "pestle",
    name: "PESTLE Analysis",
    description:
      "Examine Political, Economic, Social, Technological, Legal, and Environmental factors",
  },
  {
    id: "porter-five",
    name: "Porter's Five Forces",
    description: "Analyze competitive intensity and market attractiveness",
  },
  {
    id: "ansoff",
    name: "Ansoff Matrix",
    description: "Identify growth strategies for a business",
  },
  {
    id: "bcg",
    name: "BCG Matrix",
    description:
      "Analyze product portfolio based on market growth and market share",
  },
  {
    id: "marketing-mix",
    name: "Marketing Mix (4Ps)",
    description: "Analyze Product, Price, Place, and Promotion strategies",
  },
];

type ToolSelectorProps = {
  selectedTool: string;
  onSelectTool: (toolId: string) => void;
};

export function ToolSelector({
  selectedTool,
  onSelectTool,
}: ToolSelectorProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Select a Business Tool</CardTitle>
        <CardDescription>
          Choose a business management tool to apply to your scenario
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedTool}
          onValueChange={onSelectTool}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {businessTools.map((tool) => (
            <div key={tool.id} className="flex items-start space-x-2">
              <RadioGroupItem value={tool.id} id={tool.id} className="mt-1" />
              <div className="grid gap-1.5">
                <Label htmlFor={tool.id} className="font-medium">
                  {tool.name}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
