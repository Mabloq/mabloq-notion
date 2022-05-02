import { CreatePageDto } from '../../../dto/page/create-page.dto';
import IPageValidator from '../page-validator-interface';
import { PropertiesInterface } from '../../../interfaces/properties/property.interface';

export default class PageParentValidator implements IPageValidator {
  private createPageDto: CreatePageDto;

  private onlyTitleProperties(properties: PropertiesInterface) {
    const fieldValues = Object.keys(properties);
    return fieldValues.length == 1 && fieldValues[0] == 'title';
  }

  constructor(createPageDto: CreatePageDto) {
    this.createPageDto = createPageDto;
  }

  async validate(): Promise<void> {
    if (!this.onlyTitleProperties(this.createPageDto.properties)) {
      //   console.log(
      //     'Invalid Field Exception: Pages with parents of type page can only use title property',
      //   );
      throw new Error(
        'Invalid Field Exception: Pages with parents of type page can only use title property',
      );
    }
  }
}
