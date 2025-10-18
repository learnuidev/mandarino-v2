import { useState, useId } from "react";
import { useRegisterMutation } from "@/modules/auth/use-register-mutation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";

export const RegisterForm = ({
	isLogin,
	setIsLogin,
}: {
	isLogin: boolean;
	setIsLogin: (value: boolean) => void;
}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [registerError, setRegisterError] = useState<string | null>(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const firstNameId = useId();
	const lastNameId = useId();
	const emailId = useId();
	const passwordId = useId();

	const registerMutation = useRegisterMutation();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setRegisterError(null);

		try {
			await registerMutation.mutateAsync({
				email,
				password,
				firstName,
				lastName,
			});
			setIsSuccess(true);
		} catch (error) {
			setRegisterError((error as Error).message);
		}
	};

	if (isSuccess) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-background p-4">
				<Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
					<CardHeader className="space-y-1 text-center">
						<div className="flex items-center justify-center gap-2 mb-2">
							<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
								<div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
							</div>
							<CardTitle className="text-2xl font-semibold">
								Mandarino
							</CardTitle>
						</div>
						<CardDescription className="text-muted-foreground">
							Check your email for confirmation
						</CardDescription>
					</CardHeader>
					<CardContent className="text-center space-y-4">
						<p className="text-sm text-muted-foreground">
							We've sent a confirmation code to <strong>{email}</strong>. Please
							check your email and click the confirmation link to complete your
							registration.
						</p>
						<Button
							variant="outline"
							className="w-full"
							onClick={() => setIsLogin(true)}
						>
							Back to Sign In
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-4">
			<Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
				<CardHeader className="space-y-1 text-center">
					<div className="flex items-center justify-center gap-2 mb-2">
						<div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
							<div className="w-4 h-4 bg-primary-foreground rounded-sm"></div>
						</div>
						<CardTitle className="text-2xl font-semibold">Mandarino</CardTitle>
					</div>
					<CardDescription className="text-muted-foreground">
						Create your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						{registerError && (
							<div className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-md flex items-center gap-2">
								<AlertCircle className="h-4 w-4 flex-shrink-0" />
								<span className="text-sm">{registerError}</span>
							</div>
						)}

						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-2">
								<Label htmlFor={firstNameId}>First Name</Label>
								<Input
									id={firstNameId}
									type="text"
									placeholder="First name"
									value={firstName}
									onChange={(e) => {
										setFirstName(e.target.value);
										setRegisterError(null);
									}}
									required
									disabled={registerMutation.isPending}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor={lastNameId}>Last Name</Label>
								<Input
									id={lastNameId}
									type="text"
									placeholder="Last name"
									value={lastName}
									onChange={(e) => {
										setLastName(e.target.value);
										setRegisterError(null);
									}}
									required
									disabled={registerMutation.isPending}
								/>
							</div>
						</div>

						<div className="space-y-2">
							<Label htmlFor={emailId}>Email</Label>
							<Input
								id={emailId}
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
									setRegisterError(null);
								}}
								required
								disabled={registerMutation.isPending}
								className={registerError ? "border-destructive" : ""}
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor={passwordId}>Password</Label>
							<div className="relative">
								<Input
									id={passwordId}
									type={showPassword ? "text" : "password"}
									placeholder="Enter your password (min. 6 characters)"
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
										setRegisterError(null);
									}}
									required
									disabled={registerMutation.isPending}
									className={
										registerError ? "border-destructive pr-10" : "pr-10"
									}
								/>
								<Button
									type="button"
									variant="ghost"
									size="sm"
									className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
									onClick={() => setShowPassword(!showPassword)}
									disabled={registerMutation.isPending}
									tabIndex={-1}
								>
									{showPassword ? (
										<EyeOff className="h-4 w-4 text-muted-foreground" />
									) : (
										<Eye className="h-4 w-4 text-muted-foreground" />
									)}
								</Button>
							</div>
						</div>

						<Button
							type="submit"
							className="w-full"
							disabled={registerMutation.isPending}
						>
							{registerMutation.isPending && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							Create Account
						</Button>
					</form>

					<Button
						variant="ghost"
						className="w-full mt-4"
						onClick={() => setIsLogin(!isLogin)}
					>
						{isLogin
							? "Don't have an account? Sign Up"
							: "Already have an account? Sign In"}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
};
