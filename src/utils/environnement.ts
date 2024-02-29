// Function to get environment variable
export const getEnvVariable = (variableName: string): string | undefined => {
    return process.env[variableName];
};