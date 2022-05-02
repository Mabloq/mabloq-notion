import { ApiProperty } from '@nestjs/swagger';

export class FileObjectDto {
  @ApiProperty({
    default: 'external',
    required: true,
  })
  type: 'external';
  @ApiProperty({ required: true })
  url: string;
}
