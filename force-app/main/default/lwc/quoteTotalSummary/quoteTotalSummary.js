/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement,api } from "lwc";

export default class QuoteTotalSummary extends LightningElement {
@api recordId;
handleAdjustQuote() {
    this.template.querySelector('c-adjust-quote-price').showModalBox();
}

}