import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@aws-amplify/auth";
import { userProfileSchema, UserProfile } from "./auth.types";

export const authUserQueryKey = "authUser";

export const useGetAuthUserQuery = () => {
	return useQuery<UserProfile | null>({
		queryKey: [authUserQueryKey],
		queryFn: async () => {
			try {
				const authUser = await getCurrentUser();

				if (!authUser) {
					return null;
				}

				// Transform the Cognito user attributes to match our UserProfile schema
				const userAttributes = authUser.signInDetails?.loginId || "";
				const email = userAttributes.includes("@") ? userAttributes : "";

				// Note: In a real implementation, you might want to fetch additional user details
				// from your backend or parse more attributes from Cognito
				const userProfile = {
					sub: authUser.userId,
					email: email || authUser.username,
					email_verified: true, // You may want to verify this from user attributes
				};

				// Validate against our schema
				return userProfileSchema.parse(userProfile);
			} catch (error) {
				console.error("Error fetching auth user:", error);
				return null;
			}
		},
		retry: 1,
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};
