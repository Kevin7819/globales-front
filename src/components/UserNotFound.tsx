import { Link } from "react-router-dom"
import { Button } from "./ui/Button"

export default function UserNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-lg mb-4">Usuario no encontrado</div>
        <Button asChild>
          <Link to="/login">Volver al Login</Link>
        </Button>
      </div>
    </div>
  )
}
