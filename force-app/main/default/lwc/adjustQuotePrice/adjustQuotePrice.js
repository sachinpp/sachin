/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement ,api,wire} from "lwc";
import getQuoteDetails from '@salesforce/apex/ManageQuoteController.getQuoteDetails';
import updateQuoteDetails from '@salesforce/apex/ManageQuoteController.updateQuoteDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class AdjustQuotePrice extends LightningElement {
  adjustedAmountLabel = "Adjusted Amount";

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
   const adjustedAmount = event.detail.value ? parseFloat(event.detail.value) : 0;
    this.quoteData.quoteAmount = adjustedAmount;
}


  @wire(getQuoteDetails,{recordId :'$recordId'})
  wiredQuoteData({ error, data }) {
      if (data) {
          this.quoteData = data;
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
    this.updateQuoteDetails();
   
    }
    
    async updateQuoteDetails() {
        try {
            await updateQuoteDetails({
                quoteDetailsJson:JSON.stringify(this.quoteData) 
            })
            this.showToast('Success', 'Quote Amount Updated Successfully', 'success');
            this.hideModalBox();
        } catch (error) {
            this.showToast('Something went wrong', error.body.message, 'error');
            return;
        }
    }

    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }


}