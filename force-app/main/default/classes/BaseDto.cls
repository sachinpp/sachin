public with sharing abstract class BaseDto {
  public static final String OPERATION_TYPE_INSERT = 'insert';
  public static final String OPERATION_TYPE_UPDATE = 'update';
  public static final String OPERATION_TYPE_DELETE = 'delete';

  public SObject sObj;

  public BaseDto() {
  }

  protected BaseDto(SObject sObj) {
    this.sObj = sObj;
    this.id = sObj.Id;
  }

  @AuraEnabled
  public String operationType { get; set; }

  @AuraEnabled
  public Id id { get; set; }
  @AuraEnabled
  public String name { get; set; }

  public Boolean isInsert() {
    return operationType == OPERATION_TYPE_INSERT;
  }

  public Boolean isUpdate() {
    return operationType == OPERATION_TYPE_UPDATE;
  }

  public Boolean isDelete() {
    return operationType == OPERATION_TYPE_DELETE;
  }

  abstract public SObject refreshSo();
}