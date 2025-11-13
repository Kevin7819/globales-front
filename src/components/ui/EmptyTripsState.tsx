import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { Plane } from "lucide-react";

export const EmptyTripsState = () => (
  <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 transition-colors">
    <CardContent className="p-12 text-center">
      <Plane className="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
        No tienes viajes programados
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        Comienza a planificar tu próxima aventura
      </p>
      <Button asChild>
        <Link to="/trips">Explorar Destinos</Link>
      </Button>
    </CardContent>
  </Card>
);