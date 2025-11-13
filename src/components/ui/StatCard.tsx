import { Card, CardContent, CardDescription } from "./Card";

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  gradient: string;
}

export const StatCard = ({ title, value, description, icon, gradient }: StatCardProps) => (
  <Card className={`bg-gradient-to-r ${gradient} text-white p-4 shadow-lg min-h-[120px]`}>
    <CardContent className="flex items-center justify-between">
      <div>
        <CardDescription className="!text-white text-opacity-80 mb-1">{title}</CardDescription>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-opacity-80 text-xs mt-1">{description}</p>
      </div>
      {icon}
    </CardContent>
  </Card>
);