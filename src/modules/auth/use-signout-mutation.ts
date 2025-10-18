import { signOut } from "@/lib/aws-amplify/amplify-auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAuthenticatedQueryKey } from "./use-is-authenticated.query";
import { authUserQueryKey } from "./use-get-auth-user.query";

export const useSignoutMutation = () => {
	const queryClient = useQueryClient();

	return useMutation<void, Error>({
		mutationFn: async () => {
			try {
				await signOut();
			} catch (error) {
				console.error("Error during sign out:", error);
				throw new Error("Failed to sign out");
			}
		},
		onSuccess: () => {
			// Clear all auth-related queries
			queryClient.invalidateQueries({ queryKey: [isAuthenticatedQueryKey] });
			queryClient.invalidateQueries({ queryKey: [authUserQueryKey] });

			// Optionally clear the cache completely
			queryClient.clear();
		},
	});
};
