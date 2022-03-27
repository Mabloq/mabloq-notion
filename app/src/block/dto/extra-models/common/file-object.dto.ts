import { ApiProperty } from '@nestjs/swagger';

export class FileObjectDto {
  @ApiProperty({
    default: 'external',
    required: true,
  })
  type: string;
  @ApiProperty({ required: true })
  url: string;
}
