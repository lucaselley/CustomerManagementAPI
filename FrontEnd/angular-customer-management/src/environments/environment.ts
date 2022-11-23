// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: {
    baseUrl: "https://localhost:7027/",
    businessUrl: "https://localhost:7027/api/business",
    departmentUrl: "https://localhost:7027/api/department"
  },
  azureAd: {
    clientId: "ab9d9fea-982b-4fa4-befa-c496a3462484",
    tenantId: "f0cbff30-0d4b-4401-82a8-50291e792b51",
    redirectUrl: "http://localhost:4200",
    scopeUri: "https://elleyorg.onmicrosoft.com/3c969a20-c0b4-447e-af2a-c14eb2d085ae/user.read"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
