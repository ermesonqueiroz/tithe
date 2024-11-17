interface PixInput {
  key: string;
  amount: number;
  merchantName: string;
  merchantCity: string;
  referenceLabel: string;
}

export class Pix {
  ID_PAYLOAD_FORMAT_INDICATOR = '00';
  ID_POINT_OF_INITIATION_METHOD = '01';
  ID_MERCHANT_ACCOUNT_INFORMATION = '26';
  ID_MERCHANT_ACCOUNT_INFORMATION_GUI = '00';
  ID_MERCHANT_ACCOUNT_INFORMATION_KEY = '01';
  ID_MERCHANT_CATEGORY_CODE = '52';
  ID_TRANSACTION_CURRENCY = '53';
  ID_TRANSACTION_AMOUNT = '54';
  ID_COUNTRY_CODE = '58';
  ID_MERCHANT_NAME = '59';
  ID_MERCHANT_CITY = '60';
  ID_ADDITIONAL_DATA_FIELD_TEMPLATE = '62';
  ID_ADDITIONAL_DATA_FIELD_TEMPLATE_REFERENCE_LABEL = '05';
  ID_CRC16 = '63';

  private readonly key: string;
  private readonly amount: number;
  private readonly merchantName: string;
  private readonly merchantCity: string;
  private readonly referenceLabel: string;

  constructor({
    key,
    amount,
    merchantName,
    merchantCity,
    referenceLabel
  }: PixInput) {
    this.key = key;
    this.amount = amount;
    this.merchantName = merchantName;
    this.merchantCity = merchantCity;
    this.referenceLabel = referenceLabel;
  }

  _retrieveItemValue(id: string, value: string) {
    const size = String(value.length).padStart(2, '0');
    return id + size + value;
  }

  _getMerchantAccountInformation() {
    const gui = this._retrieveItemValue(this.ID_MERCHANT_ACCOUNT_INFORMATION_GUI, 'br.gov.bcb.pix');
    const key = this._retrieveItemValue(this.ID_MERCHANT_ACCOUNT_INFORMATION_KEY, this.key);
    const merchantAccountInformation = gui + key;

    return this._retrieveItemValue(
      this.ID_MERCHANT_ACCOUNT_INFORMATION,
      merchantAccountInformation
    );
  }

  _getAdditionalDataFieldTemplate() {
    const referenceLabel = this._retrieveItemValue(this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE_REFERENCE_LABEL, this.referenceLabel);
    return this._retrieveItemValue(this.ID_ADDITIONAL_DATA_FIELD_TEMPLATE, referenceLabel);
  }

  _getCRC16(payload: string) {
    payload += this.ID_CRC16 + '04';

    const polynomial = 0x1021;
    let crc = 0xFFFF;

    for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;

      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = (crc << 1) ^ polynomial;
        } else {
          crc = crc << 1;
        }
      }
    }

    crc &= 0xFFFF;

    return this.ID_CRC16 + '04' + crc.toString(16).toUpperCase().padStart(4, '0');
  }

  getPayload() {
    const payload =
      this._retrieveItemValue(this.ID_PAYLOAD_FORMAT_INDICATOR, '01') +
      this._retrieveItemValue(this.ID_POINT_OF_INITIATION_METHOD, '12') +
      this._getMerchantAccountInformation() +
      this._retrieveItemValue(this.ID_MERCHANT_CATEGORY_CODE, '0000') +
      this._retrieveItemValue(this.ID_TRANSACTION_CURRENCY, '986') +
      this._retrieveItemValue(this.ID_TRANSACTION_AMOUNT, this.amount.toFixed(2)) +
      this._retrieveItemValue(this.ID_COUNTRY_CODE, 'BR') +
      this._retrieveItemValue(this.ID_MERCHANT_NAME, this.merchantName) +
      this._retrieveItemValue(this.ID_MERCHANT_CITY, this.merchantCity) +
      this._getAdditionalDataFieldTemplate();

    return payload + this._getCRC16(payload);
  }
}