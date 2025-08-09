import { AlertCircle } from "lucide-react"
import { Button } from "../ui/button"

interface ErrorProps {
    message?: string
    retry?: () => void
}

export default function Error({ message = "Something went wrong!", retry }: ErrorProps) {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] p-8">
            <div className="flex flex-col items-center space-y-4">
                <AlertCircle className="h-12 w-12 text-destructive" />
                <div className="text-center space-y-2">
                    <h3 className="text-lg font-semibold">{message}</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                        We encountered an error while processing your request.
                    </p>
                </div>
                {retry && (
                    <Button onClick={retry} variant="outline" className="mt-4 cursor-pointer">
                        Try Again
                    </Button>
                )}
            </div>
        </div>
    )
}
