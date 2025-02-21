import { login, signUp } from '@/actions/actions'
import AuthFormBtn from './auth-form-btn'
import { Input } from './ui/input'
import { Label } from './ui/label'

type AuthFormProps = {
  type: 'logIn' | 'signUp'
}

export default function AuthForm({ type }: AuthFormProps) {
  return (
    <form action={type === 'logIn' ? login : signUp}>
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required maxLength={100} />
      </div>
      <div className="mt-2 space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          maxLength={100}
        />
      </div>
      <AuthFormBtn type={type} />
    </form>
  )
}
