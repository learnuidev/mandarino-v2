import { signUp } from "@/lib/aws-amplify/amplify-auth";
import { useMutation } from "@tanstack/react-query";
import { signUpCredentialsSchema, SignUpCredentials } from "./auth.types";
import { AuthError } from "aws-amplify/auth";

export const useRegisterMutation = () => {
	return useMutation<void, Error, SignUpCredentials>({
		mutationFn: async (credentials: SignUpCredentials) => {
			signUpCredentialsSchema.parse(credentials);

			try {
				await signUp({
					username: credentials.email,
					password: credentials.password,
					options: {
						userAttributes: {
							given_name: credentials.firstName,
							family_name: credentials.lastName,
							email: credentials.email,
						},
					},
				});
			} catch (error) {
				if (error instanceof AuthError) {
					const errorMessage = error.message.toLowerCase();

					if (
						error.name === "UsernameExistsException" ||
						errorMessage.includes(
							"an account with the given email already exists",
						)
					) {
						throw new Error(
							"An account with this email already exists. Please try signing in instead.",
						);
					}

					if (
						error.name === "InvalidPasswordException" ||
						errorMessage.includes("password")
					) {
						throw new Error(
							"Password does not meet the requirements. Please use a stronger password.",
						);
					}

					if (
						error.name === "InvalidParameterException" ||
						errorMessage.includes("invalid email")
					) {
						throw new Error(
							"Invalid email address. Please check and try again.",
						);
					}

					throw new Error(`Registration failed: ${error.message}`);
				}

				throw new Error(
					"An unexpected error occurred during registration. Please try again.",
				);
			}
		},
	});
};
