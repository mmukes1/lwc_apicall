import { LightningElement, track, wire } from "lwc";
import { getRecord } from "lightning/uiRecordApi";

import getAllExchangeRates from "@salesforce/apex/HTTPCalloutRequest.getExchangeRates";

export default class ExhangeRates extends LightningElement {
  @track mapOfValues = [];
  @track filteredList = [];
  currencyCode;

  @wire(getAllExchangeRates)
  getAllExchangeRates({ data, error }) {
    if (data) {
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          this.mapOfValues.push({ value: data[key], key: key });
        }
      }
    } else if (error) {
      window.console.log(error);
    }
  }

  inputCurrencyCode(event) {
    this.currencyCode = event.detail.value;
    this.filteredList = [];
    this.mapOfValues
      .filter((item) => item.key.startsWith(this.currencyCode.toUpperCase()))
      .forEach((item) =>
        this.filteredList.push({ value: item.value, key: item.key })
      );
  }

  getAllRates() {
    this.filteredList = this.mapOfValues;
  }
}
