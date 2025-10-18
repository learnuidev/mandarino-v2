import { Amplify } from "aws-amplify";
import { env } from "../../env";

console.log("ENV", env);

const awsExports = {
	Auth: {
		Cognito: {
			userPoolId: env.VITE_AWS_COGNITO_USERPOOL_ID,
			userPoolClientId: env.VITE_AWS_COGNITO_WEBCLIENT_ID,
		},
	},
} as const;

Amplify.configure(awsExports);

export default awsExports;
