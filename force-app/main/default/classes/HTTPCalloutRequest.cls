public with sharing class HTTPCalloutRequest {
    
    @AuraEnabled(cacheable = true)
    public static Map<String, Object> getExchangeRates(){

        string URL = 'http://data.fixer.io/api/latest?access_key=042d90be4b873062c3430cfbb837c154';
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint(URL);
        request.setMethod('GET');

        HTTPResponse httpRes = http.send(request);
        System.debug('Response: ' + httpRes.getBody());

        Map<String, Object> mapResponse = (Map<String, Object>) JSON.deserializeUntyped(httpRes.getBody());
        Map<String, Object> rates = (Map<String, Object>) mapResponse.get('rates');

        return rates;


       
    }
}
