import { BrowserCacheLocation, Configuration, LogLevel } from "@azure/msal-browser";
import { environment } from "src/environments/environment";

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;


export const msalConfig: Configuration = {
    auth: {
        clientId: environment.azureAd.clientId,
        authority: "https://login.microsoftonline.com/" + environment.azureAd.tenantId,
        redirectUri: environment.azureAd.redirectUrl,
        postLogoutRedirectUri: "http://localhost:4200/",
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: isIE //Will be true if user uses browser Internet Explorer
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel: LogLevel, message: string) {
                console.log(message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false
        }
    }
}

export const protectedResources = {
    backend: {
        endpoints: "https://localhost:7027/",
        scopes: [
            'https://elleyorg.onmicrosoft.com/3c969a20-c0b4-447e-af2a-c14eb2d085ae/read-access',
        ],
    }
}

export const loginRequest = {
    scopes: ['api://https://elleyorg.onmicrosoft.com/3c969a20-c0b4-447e-af2a-c14eb2d085ae/read-access']
}