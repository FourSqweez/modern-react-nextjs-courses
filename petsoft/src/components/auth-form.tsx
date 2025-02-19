import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

type AuthFormProps = {}

export default function AuthForm({}: AuthFormProps) {
  return (
    <form>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" />
      </div>
      <div className="mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" />
      </div>

      <Button className="mt-4">Log In</Button>
    </form>
  )
}
