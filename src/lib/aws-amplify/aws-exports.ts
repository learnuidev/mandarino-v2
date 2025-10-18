import { Amplify } from "aws-amplify";
import { env } from "../../env";

console.log("ENV", env);

const awsExports = {
	Auth: {
		region: env.VITE_AWS_REGION,
		Cognito: {
			userPoolId: env.VITE_AWS_COGNITO_USERPOOL_ID,
			userPoolClientId: env.VITE_AWS_COGNITO_WEBCLIENT_ID,
		},
		authenticationFlowType: env.VITE_AWS_AMPLIFY_AUTH_TYPE,
	},
} as const;

Amplify.configure(awsExports);

export default awsExports;
