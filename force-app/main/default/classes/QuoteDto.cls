public with sharing class QuoteDto extends BaseDto {
  @AuraEnabled
  public String name;
  @AuraEnabled
  public Date endDate;
  @AuraEnabled
  public date startDate;
  @AuraEnabled
  public Decimal quoteAmount;

  public QuoteDto() {
  }

  public QuoteDto(Quote__c quote) {
    super(quote);
    this.name = quote.Name;
    this.startDate = quote.StartDate__c;
    this.endDate = quote.EndDate__c;
    this.quoteAmount = quote.TotalQuotedAmount__c;
  }

  @AuraEnabled(cacheable=true)
  public static QuoteDto getQuoteDetails( Id recordId) {
    return new QuoteDto([Select Id, Name,StartDate__c,EndDate__c,TotalQuotedAmount__c from Quote__c where Id =:recordId ]);
  }


  public override SObject refreshSo() {
    return null;
  }

}