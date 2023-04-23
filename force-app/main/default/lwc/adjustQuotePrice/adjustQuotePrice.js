/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement ,api,wire} from "lwc";
import getQuoteDetails from '@salesforce/apex/QuoteDto.getQuoteDetails';
import { updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import Amount_FIELD from '@salesforce/schema/Quote__c.TotalQuotedAmount__c';
import ID_FIELD from '@salesforce/schema/Quote__c.Id';
import LightningModal from 'lightning/modal';
export default class AdjustQuotePrice extends LightningModal {
  adjustedAmountLabel = "Adjusted Amount";
adjustedAmount =0;

  @api recordId;

  quoteData = {quoteAmount:0 };
  error;
  isShowModal = false;

  @api
  showModalBox() {  
      this.isShowModal = true;
  }

  hideModalBox() {  
      this.isShowModal = false;
  }

  handleAmountChange(event){
    this.adjustedAmount =parseFloat(event.detail.value);
}


  @wire(getQuoteDetails,{recordId :'$recordId'})
  wiredQuoteData({ error, data }) {
      if (data) {
          this.quoteData = data;
          this.adjustedAmount = this.quoteData.quoteAmount;
          this.error = undefined;
      } else if (error) {
          this.error = error;
          console.log(error);
      }
  }

  closeModal() {
    this.close('success');
  }

  handleSave() {

    const fields = {};
    fields[ID_FIELD.fieldApiName] = this.quoteData.id;
    fields[Amount_FIELD.fieldApiName] = this.adjustedAmount;

    const recordInput = { fields };

    updateRecord(recordInput)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Quote amount adjusted successfully',
                    variant: 'success'
                })
            );
            this.hideModalBox();
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


}