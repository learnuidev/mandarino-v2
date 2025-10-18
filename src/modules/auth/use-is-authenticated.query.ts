import { useQuery } from "@tanstack/react-query";
import { getAmplifyIsAuthenticated } from "@/lib/aws-amplify/amplify-auth";

export const isAuthenticatedQueryKey = "isAuthenticated";

export const useIsAuthenticatedQuery = () => {
	return useQuery({
		queryKey: [isAuthenticatedQueryKey],
		queryFn: async () => {
			return await getAmplifyIsAuthenticated();
		},
		retry: 1,
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};
