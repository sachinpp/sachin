/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api,wire,track } from "lwc";
import getQuoteDetails from '@salesforce/apex/QuoteDto.getQuoteDetails';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import STARTDATE_FIELD from '@salesforce/schema/Quote__c.StartDate__c';
import ENDDATE_FIELD from '@salesforce/schema/Quote__c.EndDate__c';
import ID_FIELD from '@salesforce/schema/Quote__c.Id';

export default class EditQuote extends LightningElement {
  @api recordId;
  _startDate= 1547250828000;
  _endDate= 1547250828000;
  @track quoteData = {
    name: "Quote Name",
    startDate: 1547250828000,
    endDate: 1547250828000
  };
  error;

  handleStartDateChange(event){
  this._startDate= event.detail.value;
}

handleEndDateChange(event){
    this._endDate = event.detail.value;
  }

  @wire(getQuoteDetails,{recordId :'$recordId'})
  wiredQuoteData({ error, data }) {
      if (data) {
          this.quoteData =JSON.parse(JSON.stringify( data)) ;
          this.error = undefined;
      } else if (error) {
          this.error = error;
          console.log(error);
      }
  }
  handleSave() {

    const allValid = [...this.template.querySelectorAll('lightning-input')]
    .reduce((validSoFar, inputFields) => {
        inputFields.reportValidity();
        return validSoFar && inputFields.checkValidity();
    }, true);

if (allValid) {
    // Create the recordInput object
    const fields = {};
    fields[ID_FIELD.fieldApiName] = this.quoteData.id;
    fields[STARTDATE_FIELD.fieldApiName] = this._startDate;
    fields[ENDDATE_FIELD.fieldApiName] = this._endDate;

    const recordInput = { fields };

    updateRecord(recordInput)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Quote Details Updated Successfully',
                    variant: 'success'
                })
            );
        })
        .catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error updating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });
    }
else {
    // The form is not valid
    this.dispatchEvent(
        new ShowToastEvent({
            title: 'Something is wrong',
            message: 'Check your input and try again.',
            variant: 'error'
        })
     );
}
}
}