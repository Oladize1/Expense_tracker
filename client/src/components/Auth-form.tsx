import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"


interface AuthFormProps extends React.ComponentProps<"div"> {
  type?: "login" | "signup"
}

export function AuthForm({
  className,
  type = "login",
  ...props
}: AuthFormProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{type === 'signup'? 'Create an account' : 'Login to your account'}</CardTitle>
          <CardDescription>
            {type === 'signup'? 'Enter your details below to create your account': 'Enter your username below to login to your account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="text">Username</Label>
                <Input
                  id="text"
                  placeholder="username"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full cursor-pointer">
                  {type === 'signup' ? 'Register' : 'Login'}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
            {type === "signup" ? (
                <>
                  Already have an account?{" "}
                  <Link to="/login" className="underline underline-offset-4">
                    Log in
                  </Link>
                </>
              ) : (
                <>
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
