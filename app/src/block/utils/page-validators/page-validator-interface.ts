export default interface IPageValidator {
  validate(data?: any): Promise<void>;
}
