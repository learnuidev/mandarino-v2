import type { ReactNode } from "react";
import { useIsAuthenticatedQuery } from "@/modules/auth/use-is-authenticated.query";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
	children: ReactNode;
	fallback?: ReactNode;
}

export const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
	const { data: isAuthenticated, isLoading } = useIsAuthenticatedQuery();

	if (isLoading) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="flex items-center gap-2">
					<Loader2 className="h-6 w-6 animate-spin" />
					<span className="text-muted-foreground">Loading...</span>
				</div>
			</div>
		);
	}

	if (!isAuthenticated) {
		return fallback || null;
	}

	return <>{children}</>;
};
