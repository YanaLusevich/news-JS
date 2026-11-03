type RequestOptions = Record<string, string | number | boolean>;
type RequestParams = {
    endpoint: string;
    options?: RequestOptions;
};

enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
}

class Loader {
    private baseLink: string;
    private options: RequestOptions;

    constructor(baseLink: string, options: RequestOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<T = unknown>(
        { endpoint, options = {} }: RequestParams,
        callback: (data: T) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<T>(RequestMethod.GET, endpoint, callback, options);
    }

    public errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            }

            throw Error(res.statusText);
        }

        return res;
    }

    public makeUrl(options: RequestOptions, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    public load<T>(method: string, endpoint: string, callback: (data: T) => void, options: RequestOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
