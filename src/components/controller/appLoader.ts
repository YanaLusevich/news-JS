import Loader from './loader';

function getRequiredEnv(name: 'API_URL' | 'API_KEY'): string {
    const value = name === 'API_URL' ? process.env.API_URL : process.env.API_KEY;

    if (!value) {
        throw new Error(`${name} is not defined. Check your .env file.`);
    }

    return value;
}

class AppLoader extends Loader {
    constructor() {
        super(getRequiredEnv('API_URL'), {
            apiKey: getRequiredEnv('API_KEY'),
        });
    }
}

export default AppLoader;
