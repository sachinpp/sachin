public with sharing class QuoteDto extends BaseDto {
  @AuraEnabled
  public String name;
  @AuraEnabled
  public Date endDate;
  @AuraEnabled
  public Date startDate;
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

  public static Quote__c mapToQuote(QuoteDto quoteDto) {
    Quote__c quote= new Quote__c();
    quote.Id = quoteDto.id;
    quote.StartDate__c = quoteDto.startDate;
    quote.EndDate__c = quoteDto.endDate;
    quote.TotalQuotedAmount__c = quoteDto.quoteAmount;
    return quote;
  }

  public override SObject refreshSo() {
    return null;
  }

}