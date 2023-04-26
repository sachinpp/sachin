/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api, wire, track } from "lwc";
import getQuoteDetails from '@salesforce/apex/ManageQuoteController.getQuoteDetails';
import updateQuoteDetails from '@salesforce/apex/ManageQuoteController.updateQuoteDetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class EditQuote extends LightningElement {
    @api recordId;

    @track quoteData = {
        name: "Quote Name",
        startDate: 1547250828000,
        endDate: 1547250828000
    };
    error;

    handleStartDateChange(event) {
        const startDate = event.detail.value;
        this.quoteData.startDate = startDate;
    }

    handleEndDateChange(event) {
        const endDate = event.detail.value;
        this.quoteData.endDate = endDate;
    }

    @wire(getQuoteDetails, { recordId: '$recordId' })
    wiredQuoteData({ error, data }) {
        if (data) {
            this.quoteData = JSON.parse(JSON.stringify(data));
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
            this.updateQuoteDetails();

        }
        else {
            this.showToast('Something went wrong', 'Check your input and try again.', 'error');
        }
    } 

    async updateQuoteDetails() {
        try {
            await updateQuoteDetails({
                quoteDetailsJson:JSON.stringify(this.quoteData) 
            })
            this.showToast('Success', 'Quote Details Updated Successfully', 'success');
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