import { APIRequestContext } from "@playwright/test"

export class RequestHandler {

    private baseUrl: string = ''
    private request: APIRequestContext
    private defaultBaseUrl: string = ''
    private apiPath: string = ''
    private queryParams: object = {}
    private apiHeaders: Record<string, string> = {}
    private apiBody: object = {}


    constructor(request: APIRequestContext, apiBaseUrl: string){
        this.request = request
        this.defaultBaseUrl = apiBaseUrl

    }

    url(url: string){
        this.baseUrl = url
        return this
    }

    path(path: string){
        this.apiPath = path
        return this

    }

    params(params: object){
        this.queryParams = params
        return this

    }

    header(headers: Record<string, string>){
        this.apiHeaders = headers
        console.log('Headers:', this.apiHeaders)
        return this

    }

    body(body: object){
        this.apiBody = body
        console.log('Body:', this.apiBody)
        return this

    }



    async getRequest (){
        const url = this.getUrl();
        const response = await this.request.get(url, {
            headers: this.apiHeaders
        });
        const responseJSON = await response.json();
    }


    
    getUrl(){
        const url = new URL(`${this.baseUrl ?? this.defaultBaseUrl}${this.apiPath}`);
        for (const [key, value] of Object.entries(this.queryParams)) {
            url.searchParams.append(key, value as string);
        }
        console.log('URL:', url.toString());
        return url.toString();
    }
}