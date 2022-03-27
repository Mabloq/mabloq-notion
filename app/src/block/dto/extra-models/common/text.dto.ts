import { ApiProperty } from '@nestjs/swagger';

export class TextDto {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  text: string;
  @ApiProperty({
    type: 'string',
    required: false,
  })
  link?: string;
}
