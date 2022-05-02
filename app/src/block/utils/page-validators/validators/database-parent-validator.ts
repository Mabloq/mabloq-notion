import { CreatePageDto } from '../../../dto/page/create-page.dto';
import IPageValidator from '../page-validator-interface';
import {
  PropertiesInterface,
  PropertiesConfigInterface,
} from '../../../interfaces/properties/property.interface';
import { isDatabaseParent } from '../../type-guards/parent-types';
import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from '../../../services/database.service';

@Injectable()
export default class DatabaseParentValidator implements IPageValidator {
  private createPageDto: CreatePageDto;
  @Inject(DatabaseService)
  private databaseService: DatabaseService;

  private onlyDatabaseProperties(
    pageProperites: PropertiesInterface,
    DatabaseProperties: PropertiesConfigInterface,
  ) {
    const pagePropertyeKeys = Object.keys(pageProperites);
    const databasePropertyKeys = Object.keys(DatabaseProperties);

    return pagePropertyeKeys.every((key) => databasePropertyKeys.includes(key));
  }

  constructor(createPageDto: CreatePageDto) {
    this.createPageDto = createPageDto;
  }

  async validate(databaseProperties: PropertiesConfigInterface): Promise<void> {
    if (isDatabaseParent(this.createPageDto.parent)) {
      if (
        !this.onlyDatabaseProperties(
          this.createPageDto.properties,
          databaseProperties,
        )
      ) {
        const databaseFields = Object.keys(databaseProperties);
        const notIncludedInDatabaseConfig = Object.keys(
          this.createPageDto.properties,
        ).filter((pageField) => !databaseFields.includes(pageField));
        throw new Error(
          `Invalid Field exception: {${notIncludedInDatabaseConfig.join(
            ', ',
          )}} not valid field(s) on database: {${databaseFields.join(', ')}}`,
        );
      }
    }
  }
}
