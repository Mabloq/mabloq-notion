import { ApiProperty } from '@nestjs/swagger';

export class AnnotationDto {
  @ApiProperty({
    type: 'boolean',
    default: false,
  })
  bold: boolean;
  @ApiProperty({
    type: 'boolean',
    default: false,
  })
  italic: boolean;
  @ApiProperty({
    type: 'boolean',
    default: false,
  })
  strikethrough: boolean;
  @ApiProperty({
    type: 'boolean',
    default: false,
  })
  underline: boolean;
  @ApiProperty({
    type: 'boolean',
    default: false,
  })
  code: boolean;
}
